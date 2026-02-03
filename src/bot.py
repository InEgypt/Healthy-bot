import json
import logging
import os
import sqlite3
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, Tuple

from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
)
LOGGER = logging.getLogger("healthy-bot")

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = Path(os.getenv("DATA_DIR", BASE_DIR / "data"))
FOODS_PATH = Path(os.getenv("FOODS_PATH", DATA_DIR / "foods.json"))
DB_PATH = Path(os.getenv("DB_PATH", DATA_DIR / "healthy_bot.db"))


def load_foods() -> Dict[str, Dict[str, float]]:
    with FOODS_PATH.open("r", encoding="utf-8") as handle:
        data = json.load(handle)
    return {key.lower(): value for key, value in data.items()}


def ensure_db() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS food_log (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                food TEXT NOT NULL,
                grams REAL NOT NULL,
                calories REAL NOT NULL,
                protein REAL NOT NULL,
                carbs REAL NOT NULL,
                fat REAL NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )
        conn.commit()


def scale_nutrition(item: Dict[str, float], grams: float) -> Dict[str, float]:
    multiplier = grams / 100.0
    return {
        "calories": item["calories"] * multiplier,
        "protein": item["protein"] * multiplier,
        "carbs": item["carbs"] * multiplier,
        "fat": item["fat"] * multiplier,
    }


def format_nutrition(nutrition: Dict[str, float]) -> str:
    return (
        f"السعرات: {nutrition['calories']:.1f} kcal\n"
        f"البروتين: {nutrition['protein']:.1f} g\n"
        f"الكربوهيدرات: {nutrition['carbs']:.1f} g\n"
        f"الدهون: {nutrition['fat']:.1f} g"
    )


def insert_log(user_id: int, food: str, grams: float, nutrition: Dict[str, float]) -> None:
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            """
            INSERT INTO food_log (user_id, food, grams, calories, protein, carbs, fat, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                user_id,
                food,
                grams,
                nutrition["calories"],
                nutrition["protein"],
                nutrition["carbs"],
                nutrition["fat"],
                datetime.now(timezone.utc).isoformat(),
            ),
        )
        conn.commit()


def today_summary(user_id: int) -> Tuple[float, float, float, float]:
    today_start = datetime.now(timezone.utc).date().isoformat()
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.execute(
            """
            SELECT
                COALESCE(SUM(calories), 0),
                COALESCE(SUM(protein), 0),
                COALESCE(SUM(carbs), 0),
                COALESCE(SUM(fat), 0)
            FROM food_log
            WHERE user_id = ? AND created_at >= ?
            """,
            (user_id, today_start),
        )
        return cursor.fetchone()


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    message = (
        "مرحباً! أنا بوت التغذية Healthy Bot.\n\n"
        "الأوامر السريعة:\n"
        "/foods - قائمة الأطعمة المتوفرة\n"
        "/food <اسم> <جرام> - حساب القيم الغذائية\n"
        "/log <اسم> <جرام> - تسجيل الوجبة في يومك\n"
        "/summary - ملخص اليوم\n"
        "/meal - اقتراح وجبة متوازنة\n"
        "/help - شرح الاستخدام\n"
    )
    await update.message.reply_text(message)


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    message = (
        "طريقة الاستخدام:\n"
        "1) اختر الطعام من /foods\n"
        "2) احسب القيم الغذائية: /food oats 80\n"
        "3) سجل وجبتك: /log oats 80\n"
        "4) راقب مجموعك اليومي: /summary\n\n"
        "مثال وجبة: /meal"
    )
    await update.message.reply_text(message)


async def foods(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    foods_data = context.bot_data["foods"]
    foods_list = "\n".join(f"- {name}" for name in sorted(foods_data.keys()))
    await update.message.reply_text(f"الأطعمة المتوفرة:\n{foods_list}")


async def food(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not context.args or len(context.args) < 2:
        await update.message.reply_text("يرجى إدخال الاسم والجرامات: /food banana 120")
        return

    food_name = context.args[0].lower()
    try:
        grams = float(context.args[1])
    except ValueError:
        await update.message.reply_text("الجرامات يجب أن تكون رقماً.")
        return

    foods_data = context.bot_data["foods"]
    item = foods_data.get(food_name)
    if not item:
        await update.message.reply_text("هذا الطعام غير موجود. استخدم /foods لعرض القائمة.")
        return

    nutrition = scale_nutrition(item, grams)
    message = (
        f"القيم الغذائية لـ {food_name} ({grams:.0f} جم):\n"
        f"{format_nutrition(nutrition)}"
    )
    await update.message.reply_text(message)


async def log_food(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not context.args or len(context.args) < 2:
        await update.message.reply_text("يرجى إدخال الاسم والجرامات: /log yogurt 200")
        return

    food_name = context.args[0].lower()
    try:
        grams = float(context.args[1])
    except ValueError:
        await update.message.reply_text("الجرامات يجب أن تكون رقماً.")
        return

    foods_data = context.bot_data["foods"]
    item = foods_data.get(food_name)
    if not item:
        await update.message.reply_text("هذا الطعام غير موجود. استخدم /foods لعرض القائمة.")
        return

    nutrition = scale_nutrition(item, grams)
    insert_log(update.effective_user.id, food_name, grams, nutrition)
    message = (
        f"تم تسجيل {food_name} ({grams:.0f} جم).\n"
        f"{format_nutrition(nutrition)}"
    )
    await update.message.reply_text(message)


async def summary(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    calories, protein, carbs, fat = today_summary(update.effective_user.id)
    message = (
        "ملخص اليوم حتى الآن:\n"
        f"السعرات: {calories:.1f} kcal\n"
        f"البروتين: {protein:.1f} g\n"
        f"الكربوهيدرات: {carbs:.1f} g\n"
        f"الدهون: {fat:.1f} g"
    )
    await update.message.reply_text(message)


async def meal(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    foods_data = context.bot_data["foods"]
    plan = [
        ("oats", 60),
        ("yogurt", 200),
        ("banana", 100),
        ("almonds", 20),
    ]

    available_plan = []
    for name, grams in plan:
        item = foods_data.get(name)
        if item:
            available_plan.append((name, grams, scale_nutrition(item, grams)))

    if not available_plan:
        await update.message.reply_text("لا تتوفر مكونات كافية لاقتراح وجبة حالياً.")
        return

    total = {"calories": 0.0, "protein": 0.0, "carbs": 0.0, "fat": 0.0}
    lines = []
    for name, grams, nutrition in available_plan:
        lines.append(f"- {name} ({grams} جم)")
        for key in total:
            total[key] += nutrition[key]

    message = (
        "اقتراح وجبة متوازنة:\n"
        + "\n".join(lines)
        + "\n\nالإجمالي التقريبي:\n"
        + format_nutrition(total)
    )
    await update.message.reply_text(message)


async def unknown(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text("لم أفهم الأمر. استخدم /help للمساعدة.")


def main() -> None:
    token = os.getenv("BOT_TOKEN")
    if not token:
        raise RuntimeError("Missing BOT_TOKEN environment variable")

    foods_data = load_foods()
    ensure_db()

    app = ApplicationBuilder().token(token).build()
    app.bot_data["foods"] = foods_data

    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("help", help_command))
    app.add_handler(CommandHandler("foods", foods))
    app.add_handler(CommandHandler("food", food))
    app.add_handler(CommandHandler("log", log_food))
    app.add_handler(CommandHandler("summary", summary))
    app.add_handler(CommandHandler("meal", meal))
    app.add_handler(CommandHandler(None, unknown))

    LOGGER.info("Healthy Bot is running...")
    app.run_polling()


if __name__ == "__main__":
    main()

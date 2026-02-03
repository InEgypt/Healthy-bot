# 🌿 Healthy Bot - بوت الصحة الغذائية

<div dir="rtl">

بوت تلجرام للحصول على معلومات غذائية ونصائح صحية باللغة العربية.

</div>

## 📋 Features | المميزات

- 🔍 **Food Search** - البحث عن معلومات غذائية لأي طعام
- 📊 **Calorie Counter** - حساب السعرات الحرارية
- 🥗 **Diet Plans** - أنظمة غذائية متنوعة (إنقاص الوزن، زيادة الوزن، السكري، القلب، نباتي)
- 📏 **BMI Calculator** - حساب مؤشر كتلة الجسم
- 💡 **Health Tips** - نصائح غذائية يومية
- 🎲 **Fun Facts** - حقائق غذائية ممتعة

## 🚀 Quick Start | البدء السريع

### Prerequisites | المتطلبات

- Node.js 16.0.0 or higher
- npm or yarn
- Telegram Bot Token (from [@BotFather](https://t.me/BotFather))

### Installation | التثبيت

1. **Clone the repository | استنساخ المستودع:**
```bash
git clone https://github.com/InEgypt/Healthy-bot.git
cd Healthy-bot
```

2. **Install dependencies | تثبيت التبعيات:**
```bash
npm install
```

3. **Configure environment | إعداد البيئة:**
```bash
cp .env.example .env
```

4. **Add your bot token | أضف توكن البوت:**
Edit `.env` file and add your Telegram bot token:
```
TELEGRAM_BOT_TOKEN=your_actual_bot_token_here
```

5. **Run the bot | تشغيل البوت:**
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## 📱 Bot Commands | أوامر البوت

<div dir="rtl">

| الأمر | الوصف | مثال |
|-------|-------|------|
| `/start` | بدء البوت | `/start` |
| `/help` | عرض المساعدة | `/help` |
| `/food [اسم]` | البحث عن طعام | `/food تفاح` |
| `/calories [اسم]` | السعرات الحرارية | `/calories موز` |
| `/categories` | فئات الأطعمة | `/categories` |
| `/list [فئة]` | قائمة أطعمة فئة | `/list فواكه` |
| `/diet` | الأنظمة الغذائية | `/diet` |
| `/diet [نوع]` | نظام غذائي محدد | `/diet weight_loss` |
| `/tip` | نصيحة عشوائية | `/tip` |
| `/fact` | حقيقة غذائية | `/fact` |
| `/bmi [وزن] [طول]` | مؤشر كتلة الجسم | `/bmi 70 170` |

</div>

## 🥗 Available Diet Plans | الأنظمة الغذائية

- **Weight Loss** (`weight_loss`) - نظام إنقاص الوزن
- **Weight Gain** (`weight_gain`) - نظام زيادة الوزن
- **Diabetic** (`diabetic`) - نظام مرضى السكري
- **Heart Healthy** (`heart`) - نظام صحة القلب
- **Vegetarian** (`vegetarian`) - نظام نباتي

## 📁 Project Structure | هيكل المشروع

```
healthy-bot/
├── src/
│   ├── index.js          # Entry point
│   ├── data/
│   │   ├── foods.js      # Food database
│   │   └── diets.js      # Diet plans
│   ├── handlers/
│   │   └── commands.js   # Bot commands
│   └── utils/
│       └── messages.js   # Messages & formatting
├── .env.example          # Environment template
├── .gitignore
├── package.json
└── README.md
```

## 🍎 Food Categories | فئات الأطعمة

<div dir="rtl">

- 🍎 **فواكه** - تفاح، موز، برتقال، عنب، فراولة، مانجو، بطيخ
- 🥬 **خضروات** - خيار، طماطم، جزر، بروكلي، سبانخ، بصل، ثوم، بطاطس
- 🍗 **بروتينات** - دجاج، سمك، بيض، لحم
- 🫘 **بقوليات** - عدس، حمص، فول
- 🍚 **حبوب** - أرز، خبز، شوفان
- 🥛 **ألبان** - حليب، زبادي، جبنة
- 🥜 **مكسرات** - لوز، جوز، فول سوداني
- ☕ **مشروبات** - شاي، قهوة، عصير برتقال

</div>

## 🔧 Development | التطوير

```bash
# Run in development mode with auto-reload
npm run dev

# Run tests
npm test
```

## 📝 Environment Variables | متغيرات البيئة

| Variable | Description | Required |
|----------|-------------|----------|
| `TELEGRAM_BOT_TOKEN` | Your Telegram bot token | ✅ Yes |
| `DEBUG` | Enable debug mode | ❌ No |

## 🤝 Contributing | المساهمة

<div dir="rtl">

نرحب بمساهماتكم! يمكنكم:

1. Fork المستودع
2. إنشاء branch جديد (`git checkout -b feature/AmazingFeature`)
3. عمل Commit للتغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push إلى الـ branch (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

</div>

## 📄 License | الرخصة

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Contact | التواصل

For questions or suggestions, please open an issue in this repository.

---

<div align="center">

**Made with ❤️ for healthy living**

🌿 ابدأ رحلتك نحو حياة صحية أفضل! 🌿

</div>

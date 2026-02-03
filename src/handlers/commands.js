/**
 * معالجات أوامر البوت
 * Bot command handlers
 */

const { searchFood, getFoodsByCategory, getCategories, getAllFoodNames } = require('../data/foods');
const { getDietPlan, getAllDietPlans, getRandomTip, getRandomFact } = require('../data/diets');
const {
  messages,
  formatFoodInfo,
  formatCaloriesInfo,
  formatDietPlan,
  formatFoodList,
  calculateAndFormatBMI
} = require('../utils/messages');

/**
 * إعداد معالجات الأوامر
 * @param {TelegramBot} bot - كائن البوت
 */
function setupHandlers(bot) {
  // أمر البدء
  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, messages.welcome, { parse_mode: 'Markdown' });
  });

  // أمر المساعدة
  bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, messages.help, { parse_mode: 'Markdown' });
  });

  // البحث عن طعام
  bot.onText(/\/food(?:\s+(.+))?/, (msg, match) => {
    const foodName = match[1];
    
    if (!foodName) {
      bot.sendMessage(msg.chat.id, '🔍 اكتب اسم الطعام بعد الأمر\nمثال: /food تفاح');
      return;
    }
    
    const food = searchFood(foodName.trim());
    
    if (food) {
      bot.sendMessage(msg.chat.id, formatFoodInfo(food), { parse_mode: 'Markdown' });
    } else {
      bot.sendMessage(msg.chat.id, messages.foodNotFound, { parse_mode: 'Markdown' });
    }
  });

  // حساب السعرات الحرارية
  bot.onText(/\/calories(?:\s+(.+))?/, (msg, match) => {
    const foodName = match[1];
    
    if (!foodName) {
      bot.sendMessage(msg.chat.id, '🔥 اكتب اسم الطعام بعد الأمر\nمثال: /calories موز');
      return;
    }
    
    const food = searchFood(foodName.trim());
    
    if (food) {
      bot.sendMessage(msg.chat.id, formatCaloriesInfo(food), { parse_mode: 'Markdown' });
    } else {
      bot.sendMessage(msg.chat.id, messages.foodNotFound, { parse_mode: 'Markdown' });
    }
  });

  // عرض الفئات
  bot.onText(/\/categories/, (msg) => {
    bot.sendMessage(msg.chat.id, messages.categories, { parse_mode: 'Markdown' });
  });

  // عرض قائمة أطعمة فئة
  bot.onText(/\/list(?:\s+(.+))?/, (msg, match) => {
    const category = match[1];
    
    if (!category) {
      const categories = getCategories();
      const categoriesList = categories.map(c => `• ${c}`).join('\n');
      bot.sendMessage(msg.chat.id, `📋 *الفئات المتاحة:*\n\n${categoriesList}\n\nاستخدم: /list [اسم الفئة]`, { parse_mode: 'Markdown' });
      return;
    }
    
    const foods = getFoodsByCategory(category.trim());
    
    if (foods.length > 0) {
      bot.sendMessage(msg.chat.id, formatFoodList(category, foods), { parse_mode: 'Markdown' });
    } else {
      bot.sendMessage(msg.chat.id, `❌ لم أجد فئة "${category}"\n\nاستخدم /categories لعرض الفئات المتاحة`);
    }
  });

  // عرض الأنظمة الغذائية
  bot.onText(/\/diet(?:\s+(.+))?/, (msg, match) => {
    const dietType = match[1];
    
    if (!dietType) {
      bot.sendMessage(msg.chat.id, messages.dietPlans, { parse_mode: 'Markdown' });
      return;
    }
    
    // تحويل الاسم للمفتاح الصحيح
    const dietMap = {
      'weight_loss': 'weightLoss',
      'weightloss': 'weightLoss',
      'weight_gain': 'weightGain',
      'weightgain': 'weightGain',
      'diabetic': 'diabetic',
      'diabetes': 'diabetic',
      'سكري': 'diabetic',
      'heart': 'heartHealthy',
      'heart_healthy': 'heartHealthy',
      'قلب': 'heartHealthy',
      'vegetarian': 'vegetarian',
      'veg': 'vegetarian',
      'نباتي': 'vegetarian'
    };
    
    const planKey = dietMap[dietType.toLowerCase().trim()] || dietType;
    const plan = getDietPlan(planKey);
    
    if (plan) {
      bot.sendMessage(msg.chat.id, formatDietPlan(plan), { parse_mode: 'Markdown' });
    } else {
      bot.sendMessage(msg.chat.id, messages.dietPlans, { parse_mode: 'Markdown' });
    }
  });

  // نصيحة عشوائية
  bot.onText(/\/tip/, (msg) => {
    const tip = getRandomTip();
    bot.sendMessage(msg.chat.id, `💡 *نصيحة اليوم:*\n\n${tip}`, { parse_mode: 'Markdown' });
  });

  // حقيقة عشوائية
  bot.onText(/\/fact/, (msg) => {
    const fact = getRandomFact();
    bot.sendMessage(msg.chat.id, `🎲 *هل تعلم؟*\n\n${fact}`, { parse_mode: 'Markdown' });
  });

  // حساب مؤشر كتلة الجسم
  bot.onText(/\/bmi(?:\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?))?/, (msg, match) => {
    const weight = parseFloat(match[1]);
    const height = parseFloat(match[2]);
    
    if (!weight || !height || weight <= 0 || height <= 0) {
      bot.sendMessage(msg.chat.id, messages.invalidBMI, { parse_mode: 'Markdown' });
      return;
    }
    
    // التحقق من القيم المنطقية
    if (weight < 20 || weight > 300 || height < 100 || height > 250) {
      bot.sendMessage(msg.chat.id, '⚠️ يرجى إدخال قيم منطقية:\n• الوزن: 20-300 كيلو\n• الطول: 100-250 سم');
      return;
    }
    
    const result = calculateAndFormatBMI(weight, height);
    bot.sendMessage(msg.chat.id, result, { parse_mode: 'Markdown' });
  });

  // معالجة الرسائل النصية العادية (البحث المباشر)
  bot.on('message', (msg) => {
    // تجاهل الأوامر
    if (!msg.text || msg.text.startsWith('/')) return;
    
    const text = msg.text.trim();
    
    // البحث عن الطعام
    const food = searchFood(text);
    
    if (food) {
      bot.sendMessage(msg.chat.id, formatFoodInfo(food), { parse_mode: 'Markdown' });
    } else {
      // اقتراح أطعمة مشابهة
      const allFoods = getAllFoodNames();
      const suggestions = allFoods
        .filter(name => name.includes(text) || text.includes(name))
        .slice(0, 3);
      
      if (suggestions.length > 0) {
        const suggestionList = suggestions.map(s => `• ${s}`).join('\n');
        bot.sendMessage(
          msg.chat.id,
          `🔍 لم أجد "${text}"\n\nربما تقصد:\n${suggestionList}\n\nاكتب الاسم أو استخدم /food [الاسم]`
        );
      } else {
        bot.sendMessage(
          msg.chat.id,
          `🔍 لم أجد "${text}"\n\n💡 جرب:\n• /categories لعرض الفئات\n• /help للمساعدة`
        );
      }
    }
  });

  // معالجة الأخطاء
  bot.on('polling_error', (error) => {
    console.error('Polling error:', error.message);
  });

  console.log('✅ Bot handlers setup complete');
}

module.exports = { setupHandlers };

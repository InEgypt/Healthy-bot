/**
 * رسائل البوت بالعربية والإنجليزية
 * Bot messages in Arabic and English
 */

const messages = {
  // رسائل الترحيب
  welcome: `🌿 *مرحباً بك في بوت الصحة الغذائية!* 🌿

أنا مساعدك الشخصي للحصول على معلومات غذائية دقيقة ونصائح صحية.

*ماذا يمكنني أن أفعل لك؟*

🔍 */food [اسم الطعام]* - البحث عن معلومات غذائية
📊 */calories [اسم الطعام]* - حساب السعرات الحرارية
📋 */categories* - عرض فئات الأطعمة
🥗 */diet* - أنظمة غذائية مختلفة
💡 */tip* - نصيحة غذائية
🎲 */fact* - حقيقة غذائية ممتعة
📖 */help* - عرض جميع الأوامر

ابدأ بكتابة اسم أي طعام أو اختر أمراً من القائمة! 🍎`,

  help: `📖 *دليل استخدام البوت* 📖

*الأوامر الأساسية:*
━━━━━━━━━━━━━━━━━
🔍 */food [اسم]* - البحث عن طعام
   مثال: /food تفاح

📊 */calories [اسم]* - السعرات الحرارية
   مثال: /calories موز

📋 */categories* - فئات الأطعمة المتاحة

📝 */list [فئة]* - عرض أطعمة الفئة
   مثال: /list فواكه

*الأنظمة الغذائية:*
━━━━━━━━━━━━━━━━━
🥗 */diet* - عرض الأنظمة الغذائية
🏋️ */diet weight_loss* - نظام إنقاص الوزن
💪 */diet weight_gain* - نظام زيادة الوزن
🩺 */diet diabetic* - نظام مرضى السكري
❤️ */diet heart* - نظام صحة القلب
🌱 */diet vegetarian* - نظام نباتي

*نصائح ومعلومات:*
━━━━━━━━━━━━━━━━━
💡 */tip* - نصيحة غذائية عشوائية
🎲 */fact* - حقيقة غذائية ممتعة
📊 */bmi [الوزن] [الطول]* - حساب مؤشر كتلة الجسم
   مثال: /bmi 70 170

💬 يمكنك أيضاً كتابة اسم أي طعام مباشرة!`,

  categories: `📋 *فئات الأطعمة المتاحة* 📋

🍎 *فواكه* - الفواكه الطازجة
🥬 *خضروات* - الخضروات المتنوعة
🍗 *بروتينات* - اللحوم والدواجن والأسماك
🫘 *بقوليات* - العدس والفول والحمص
🍚 *حبوب* - الأرز والخبز والشوفان
🥛 *ألبان* - الحليب والزبادي والجبن
🥜 *مكسرات* - اللوز والجوز والفول السوداني
☕ *مشروبات* - الشاي والقهوة والعصائر

للحصول على قائمة أطعمة فئة معينة:
استخدم الأمر */list [اسم الفئة]*
مثال: /list فواكه`,

  dietPlans: `🥗 *الأنظمة الغذائية المتاحة* 🥗

اختر النظام الغذائي المناسب لك:

⚖️ *نظام إنقاص الوزن*
/diet weight_loss

💪 *نظام زيادة الوزن*
/diet weight_gain

🩺 *نظام مرضى السكري*
/diet diabetic

❤️ *نظام صحة القلب*
/diet heart

🌱 *نظام نباتي*
/diet vegetarian

اضغط على الأمر للحصول على تفاصيل النظام!`,

  foodNotFound: `❌ *لم أجد هذا الطعام*

جرب:
• التأكد من كتابة الاسم بشكل صحيح
• استخدام اسم آخر للطعام
• كتابة جزء من الاسم

💡 اكتب */categories* لعرض الفئات المتاحة`,

  invalidBMI: `⚠️ *خطأ في حساب مؤشر كتلة الجسم*

الاستخدام الصحيح:
/bmi [الوزن بالكيلو] [الطول بالسنتيمتر]

مثال: /bmi 70 170
(الوزن 70 كيلو، الطول 170 سم)`,

  error: `❌ حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.`
};

/**
 * تنسيق معلومات الطعام
 */
function formatFoodInfo(food) {
  const benefitsList = food.benefits.map(b => `  • ${b}`).join('\n');
  
  return `${food.emoji} *${food.name}* ${food.emoji}
_(${food.nameEn})_

📊 *القيم الغذائية لكل ${food.servingSize}:*
━━━━━━━━━━━━━━━━━━━
🔥 السعرات الحرارية: *${food.calories}* سعرة
🥩 البروتين: *${food.protein}* جرام
🍞 الكربوهيدرات: *${food.carbs}* جرام
🧈 الدهون: *${food.fat}* جرام
🌾 الألياف: *${food.fiber}* جرام

📁 الفئة: *${food.category}*

✨ *الفوائد الصحية:*
${benefitsList}`;
}

/**
 * تنسيق معلومات السعرات فقط
 */
function formatCaloriesInfo(food) {
  return `${food.emoji} *${food.name}*

🔥 *السعرات الحرارية:* ${food.calories} سعرة

📏 الحصة: ${food.servingSize}`;
}

/**
 * تنسيق نظام غذائي
 */
function formatDietPlan(plan) {
  const tips = plan.tips.join('\n');
  
  let mealsText = '';
  if (plan.meals) {
    mealsText = `
🍳 *الإفطار:*
${plan.meals.breakfast.map(m => `  • ${m}`).join('\n')}

🍽️ *الغداء:*
${plan.meals.lunch.map(m => `  • ${m}`).join('\n')}

🌙 *العشاء:*
${plan.meals.dinner.map(m => `  • ${m}`).join('\n')}

🍎 *وجبات خفيفة:*
${plan.meals.snacks.map(m => `  • ${m}`).join('\n')}`;
  }

  return `${plan.emoji} *${plan.name}* ${plan.emoji}
_(${plan.nameEn})_

📝 ${plan.description}

🔥 السعرات اليومية: *${plan.dailyCalories}*

📋 *نصائح النظام:*
${tips}
${mealsText}`;
}

/**
 * تنسيق قائمة أطعمة الفئة
 */
function formatFoodList(category, foods) {
  const list = foods.map(f => `  ${f.emoji} ${f.name} - ${f.calories} سعرة`).join('\n');
  
  return `📋 *أطعمة فئة: ${category}*

${list}

💡 اضغط على */food [الاسم]* للمزيد من المعلومات`;
}

/**
 * حساب وتنسيق مؤشر كتلة الجسم
 */
function calculateAndFormatBMI(weight, heightCm) {
  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);
  const bmiRounded = bmi.toFixed(1);
  
  let category, emoji, advice;
  
  if (bmi < 18.5) {
    category = 'نقص في الوزن';
    emoji = '⚠️';
    advice = 'ننصحك بزيادة السعرات الحرارية تدريجياً والتركيز على البروتينات والكربوهيدرات الصحية.';
  } else if (bmi < 25) {
    category = 'وزن طبيعي';
    emoji = '✅';
    advice = 'أنت في نطاق الوزن الصحي! حافظ على نظامك الغذائي المتوازن.';
  } else if (bmi < 30) {
    category = 'زيادة في الوزن';
    emoji = '⚠️';
    advice = 'ننصحك بتقليل السعرات الحرارية وزيادة النشاط البدني.';
  } else {
    category = 'سمنة';
    emoji = '🔴';
    advice = 'ننصحك باستشارة أخصائي تغذية ووضع خطة لإنقاص الوزن.';
  }
  
  return `📊 *مؤشر كتلة الجسم (BMI)* 📊

📏 الوزن: *${weight}* كيلو
📐 الطول: *${heightCm}* سم

━━━━━━━━━━━━━━━━━
🔢 مؤشر كتلة الجسم: *${bmiRounded}*
${emoji} الحالة: *${category}*
━━━━━━━━━━━━━━━━━

💡 *النصيحة:*
${advice}

📈 *تصنيف مؤشر كتلة الجسم:*
• أقل من 18.5: نقص في الوزن
• 18.5 - 24.9: وزن طبيعي
• 25 - 29.9: زيادة في الوزن
• 30 فأكثر: سمنة

⚠️ ملاحظة: هذا المؤشر تقريبي ولا يغني عن استشارة الطبيب.`;
}

module.exports = {
  messages,
  formatFoodInfo,
  formatCaloriesInfo,
  formatDietPlan,
  formatFoodList,
  calculateAndFormatBMI
};

/**
 * قاعدة بيانات الأطعمة والمعلومات الغذائية
 * Food database with nutritional information
 */

const foods = {
  // الفواكه - Fruits
  'تفاح': {
    name: 'تفاح',
    nameEn: 'Apple',
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fat: 0.2,
    fiber: 2.4,
    servingSize: '100 جرام',
    category: 'فواكه',
    benefits: ['غني بالألياف', 'يساعد على الهضم', 'مصدر جيد لفيتامين C'],
    emoji: '🍎'
  },
  'موز': {
    name: 'موز',
    nameEn: 'Banana',
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fat: 0.3,
    fiber: 2.6,
    servingSize: '100 جرام',
    category: 'فواكه',
    benefits: ['مصدر ممتاز للبوتاسيوم', 'يمد الجسم بالطاقة', 'يحسن المزاج'],
    emoji: '🍌'
  },
  'برتقال': {
    name: 'برتقال',
    nameEn: 'Orange',
    calories: 47,
    protein: 0.9,
    carbs: 12,
    fat: 0.1,
    fiber: 2.4,
    servingSize: '100 جرام',
    category: 'فواكه',
    benefits: ['غني بفيتامين C', 'يقوي المناعة', 'مضاد للأكسدة'],
    emoji: '🍊'
  },
  'عنب': {
    name: 'عنب',
    nameEn: 'Grapes',
    calories: 69,
    protein: 0.7,
    carbs: 18,
    fat: 0.2,
    fiber: 0.9,
    servingSize: '100 جرام',
    category: 'فواكه',
    benefits: ['مضاد للأكسدة', 'يحسن صحة القلب', 'غني بفيتامين K'],
    emoji: '🍇'
  },
  'فراولة': {
    name: 'فراولة',
    nameEn: 'Strawberry',
    calories: 33,
    protein: 0.7,
    carbs: 8,
    fat: 0.3,
    fiber: 2,
    servingSize: '100 جرام',
    category: 'فواكه',
    benefits: ['منخفض السعرات', 'غني بفيتامين C', 'مضاد للالتهابات'],
    emoji: '🍓'
  },
  'مانجو': {
    name: 'مانجو',
    nameEn: 'Mango',
    calories: 60,
    protein: 0.8,
    carbs: 15,
    fat: 0.4,
    fiber: 1.6,
    servingSize: '100 جرام',
    category: 'فواكه',
    benefits: ['غني بفيتامين A', 'يدعم صحة العين', 'يعزز المناعة'],
    emoji: '🥭'
  },
  'بطيخ': {
    name: 'بطيخ',
    nameEn: 'Watermelon',
    calories: 30,
    protein: 0.6,
    carbs: 8,
    fat: 0.2,
    fiber: 0.4,
    servingSize: '100 جرام',
    category: 'فواكه',
    benefits: ['يرطب الجسم', 'منخفض السعرات', 'غني بالليكوبين'],
    emoji: '🍉'
  },

  // الخضروات - Vegetables
  'خيار': {
    name: 'خيار',
    nameEn: 'Cucumber',
    calories: 15,
    protein: 0.7,
    carbs: 3.6,
    fat: 0.1,
    fiber: 0.5,
    servingSize: '100 جرام',
    category: 'خضروات',
    benefits: ['يرطب الجسم', 'منخفض السعرات جداً', 'يساعد على إنقاص الوزن'],
    emoji: '🥒'
  },
  'طماطم': {
    name: 'طماطم',
    nameEn: 'Tomato',
    calories: 18,
    protein: 0.9,
    carbs: 3.9,
    fat: 0.2,
    fiber: 1.2,
    servingSize: '100 جرام',
    category: 'خضروات',
    benefits: ['غني بالليكوبين', 'مضاد للأكسدة', 'يدعم صحة القلب'],
    emoji: '🍅'
  },
  'جزر': {
    name: 'جزر',
    nameEn: 'Carrot',
    calories: 41,
    protein: 0.9,
    carbs: 10,
    fat: 0.2,
    fiber: 2.8,
    servingSize: '100 جرام',
    category: 'خضروات',
    benefits: ['غني بفيتامين A', 'يحسن صحة العين', 'يدعم صحة البشرة'],
    emoji: '🥕'
  },
  'بروكلي': {
    name: 'بروكلي',
    nameEn: 'Broccoli',
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fat: 0.4,
    fiber: 2.6,
    servingSize: '100 جرام',
    category: 'خضروات',
    benefits: ['غني بفيتامين C و K', 'يقي من السرطان', 'يدعم صحة العظام'],
    emoji: '🥦'
  },
  'سبانخ': {
    name: 'سبانخ',
    nameEn: 'Spinach',
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    fiber: 2.2,
    servingSize: '100 جرام',
    category: 'خضروات',
    benefits: ['غني بالحديد', 'يقوي العظام', 'يحسن صحة الدم'],
    emoji: '🥬'
  },
  'بصل': {
    name: 'بصل',
    nameEn: 'Onion',
    calories: 40,
    protein: 1.1,
    carbs: 9,
    fat: 0.1,
    fiber: 1.7,
    servingSize: '100 جرام',
    category: 'خضروات',
    benefits: ['مضاد للبكتيريا', 'يخفض الكولسترول', 'يدعم صحة القلب'],
    emoji: '🧅'
  },
  'ثوم': {
    name: 'ثوم',
    nameEn: 'Garlic',
    calories: 149,
    protein: 6.4,
    carbs: 33,
    fat: 0.5,
    fiber: 2.1,
    servingSize: '100 جرام',
    category: 'خضروات',
    benefits: ['يقوي المناعة', 'مضاد للفيروسات', 'يخفض ضغط الدم'],
    emoji: '🧄'
  },
  'بطاطس': {
    name: 'بطاطس',
    nameEn: 'Potato',
    calories: 77,
    protein: 2,
    carbs: 17,
    fat: 0.1,
    fiber: 2.2,
    servingSize: '100 جرام',
    category: 'خضروات',
    benefits: ['مصدر للطاقة', 'غني بالبوتاسيوم', 'يحتوي على فيتامين B6'],
    emoji: '🥔'
  },

  // البروتينات - Proteins
  'دجاج': {
    name: 'صدر دجاج مشوي',
    nameEn: 'Grilled Chicken Breast',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    servingSize: '100 جرام',
    category: 'بروتينات',
    benefits: ['مصدر ممتاز للبروتين', 'قليل الدهون', 'يبني العضلات'],
    emoji: '🍗'
  },
  'سمك': {
    name: 'سمك مشوي',
    nameEn: 'Grilled Fish',
    calories: 136,
    protein: 26,
    carbs: 0,
    fat: 3,
    fiber: 0,
    servingSize: '100 جرام',
    category: 'بروتينات',
    benefits: ['غني بأوميجا 3', 'يدعم صحة القلب', 'يحسن وظائف المخ'],
    emoji: '🐟'
  },
  'بيض': {
    name: 'بيض مسلوق',
    nameEn: 'Boiled Egg',
    calories: 155,
    protein: 13,
    carbs: 1.1,
    fat: 11,
    fiber: 0,
    servingSize: '100 جرام (بيضتان)',
    category: 'بروتينات',
    benefits: ['مصدر كامل للبروتين', 'غني بالكولين', 'يدعم صحة المخ'],
    emoji: '🥚'
  },
  'لحم': {
    name: 'لحم بقري مشوي',
    nameEn: 'Grilled Beef',
    calories: 250,
    protein: 26,
    carbs: 0,
    fat: 15,
    fiber: 0,
    servingSize: '100 جرام',
    category: 'بروتينات',
    benefits: ['غني بالحديد', 'مصدر لفيتامين B12', 'يبني العضلات'],
    emoji: '🥩'
  },
  'عدس': {
    name: 'عدس مطبوخ',
    nameEn: 'Cooked Lentils',
    calories: 116,
    protein: 9,
    carbs: 20,
    fat: 0.4,
    fiber: 8,
    servingSize: '100 جرام',
    category: 'بقوليات',
    benefits: ['غني بالألياف', 'مصدر نباتي للبروتين', 'يخفض الكولسترول'],
    emoji: '🫘'
  },
  'حمص': {
    name: 'حمص مطبوخ',
    nameEn: 'Cooked Chickpeas',
    calories: 164,
    protein: 9,
    carbs: 27,
    fat: 2.6,
    fiber: 8,
    servingSize: '100 جرام',
    category: 'بقوليات',
    benefits: ['غني بالبروتين النباتي', 'يضبط السكر', 'يحسن الهضم'],
    emoji: '🫘'
  },
  'فول': {
    name: 'فول مدمس',
    nameEn: 'Fava Beans',
    calories: 110,
    protein: 8,
    carbs: 19,
    fat: 0.4,
    fiber: 5,
    servingSize: '100 جرام',
    category: 'بقوليات',
    benefits: ['مصدر للطاقة', 'غني بالحديد', 'يدعم صحة القلب'],
    emoji: '🫘'
  },

  // الحبوب والنشويات - Grains
  'أرز': {
    name: 'أرز أبيض مطبوخ',
    nameEn: 'Cooked White Rice',
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fat: 0.3,
    fiber: 0.4,
    servingSize: '100 جرام',
    category: 'حبوب',
    benefits: ['مصدر للطاقة', 'سهل الهضم', 'خالي من الغلوتين'],
    emoji: '🍚'
  },
  'خبز': {
    name: 'خبز أبيض',
    nameEn: 'White Bread',
    calories: 265,
    protein: 9,
    carbs: 49,
    fat: 3.2,
    fiber: 2.7,
    servingSize: '100 جرام',
    category: 'حبوب',
    benefits: ['مصدر للكربوهيدرات', 'يمد بالطاقة السريعة'],
    emoji: '🍞'
  },
  'شوفان': {
    name: 'شوفان',
    nameEn: 'Oats',
    calories: 389,
    protein: 17,
    carbs: 66,
    fat: 7,
    fiber: 11,
    servingSize: '100 جرام',
    category: 'حبوب',
    benefits: ['غني بالألياف', 'يخفض الكولسترول', 'يضبط السكر'],
    emoji: '🥣'
  },

  // منتجات الألبان - Dairy
  'حليب': {
    name: 'حليب كامل الدسم',
    nameEn: 'Whole Milk',
    calories: 61,
    protein: 3.2,
    carbs: 4.8,
    fat: 3.3,
    fiber: 0,
    servingSize: '100 مل',
    category: 'ألبان',
    benefits: ['غني بالكالسيوم', 'يقوي العظام', 'مصدر لفيتامين D'],
    emoji: '🥛'
  },
  'زبادي': {
    name: 'زبادي طبيعي',
    nameEn: 'Plain Yogurt',
    calories: 59,
    protein: 3.5,
    carbs: 4.7,
    fat: 3.3,
    fiber: 0,
    servingSize: '100 جرام',
    category: 'ألبان',
    benefits: ['غني بالبروبيوتيك', 'يحسن الهضم', 'يقوي المناعة'],
    emoji: '🥛'
  },
  'جبنة': {
    name: 'جبنة بيضاء',
    nameEn: 'White Cheese',
    calories: 264,
    protein: 17,
    carbs: 2,
    fat: 21,
    fiber: 0,
    servingSize: '100 جرام',
    category: 'ألبان',
    benefits: ['غني بالكالسيوم', 'مصدر للبروتين', 'يقوي العظام'],
    emoji: '🧀'
  },

  // المكسرات - Nuts
  'لوز': {
    name: 'لوز',
    nameEn: 'Almonds',
    calories: 579,
    protein: 21,
    carbs: 22,
    fat: 50,
    fiber: 12,
    servingSize: '100 جرام',
    category: 'مكسرات',
    benefits: ['غني بفيتامين E', 'يدعم صحة القلب', 'يحسن وظائف المخ'],
    emoji: '🥜'
  },
  'جوز': {
    name: 'جوز',
    nameEn: 'Walnuts',
    calories: 654,
    protein: 15,
    carbs: 14,
    fat: 65,
    fiber: 7,
    servingSize: '100 جرام',
    category: 'مكسرات',
    benefits: ['غني بأوميجا 3', 'يحسن الذاكرة', 'مضاد للأكسدة'],
    emoji: '🥜'
  },
  'فول سوداني': {
    name: 'فول سوداني',
    nameEn: 'Peanuts',
    calories: 567,
    protein: 26,
    carbs: 16,
    fat: 49,
    fiber: 9,
    servingSize: '100 جرام',
    category: 'مكسرات',
    benefits: ['غني بالبروتين', 'مصدر للطاقة', 'يحتوي على دهون صحية'],
    emoji: '🥜'
  },

  // المشروبات - Beverages
  'شاي': {
    name: 'شاي بدون سكر',
    nameEn: 'Tea without sugar',
    calories: 1,
    protein: 0,
    carbs: 0.3,
    fat: 0,
    fiber: 0,
    servingSize: '240 مل',
    category: 'مشروبات',
    benefits: ['مضاد للأكسدة', 'يحسن التركيز', 'خالي من السعرات تقريباً'],
    emoji: '🍵'
  },
  'قهوة': {
    name: 'قهوة سوداء بدون سكر',
    nameEn: 'Black Coffee without sugar',
    calories: 2,
    protein: 0.3,
    carbs: 0,
    fat: 0,
    fiber: 0,
    servingSize: '240 مل',
    category: 'مشروبات',
    benefits: ['يزيد التركيز', 'يحفز الأيض', 'مضاد للأكسدة'],
    emoji: '☕'
  },
  'عصير برتقال': {
    name: 'عصير برتقال طبيعي',
    nameEn: 'Fresh Orange Juice',
    calories: 45,
    protein: 0.7,
    carbs: 10,
    fat: 0.2,
    fiber: 0.2,
    servingSize: '100 مل',
    category: 'مشروبات',
    benefits: ['غني بفيتامين C', 'يقوي المناعة', 'منعش'],
    emoji: '🍊'
  }
};

/**
 * البحث عن طعام في قاعدة البيانات
 * @param {string} query - اسم الطعام للبحث عنه
 * @returns {Object|null} - معلومات الطعام أو null
 */
function searchFood(query) {
  const normalizedQuery = query.trim().toLowerCase();
  
  // البحث المباشر
  if (foods[query]) {
    return foods[query];
  }
  
  // البحث الجزئي
  for (const [key, value] of Object.entries(foods)) {
    if (key.includes(normalizedQuery) || 
        value.name.toLowerCase().includes(normalizedQuery) ||
        value.nameEn.toLowerCase().includes(normalizedQuery)) {
      return value;
    }
  }
  
  return null;
}

/**
 * الحصول على جميع الأطعمة في فئة معينة
 * @param {string} category - اسم الفئة
 * @returns {Array} - قائمة الأطعمة
 */
function getFoodsByCategory(category) {
  return Object.values(foods).filter(food => food.category === category);
}

/**
 * الحصول على جميع الفئات المتاحة
 * @returns {Array} - قائمة الفئات
 */
function getCategories() {
  const categories = new Set();
  Object.values(foods).forEach(food => categories.add(food.category));
  return Array.from(categories);
}

/**
 * الحصول على جميع أسماء الأطعمة
 * @returns {Array} - قائمة أسماء الأطعمة
 */
function getAllFoodNames() {
  return Object.keys(foods);
}

module.exports = {
  foods,
  searchFood,
  getFoodsByCategory,
  getCategories,
  getAllFoodNames
};

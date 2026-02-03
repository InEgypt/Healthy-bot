/**
 * اختبارات الرسائل والتنسيق
 * Tests for messages and formatting
 */

const {
  messages,
  formatFoodInfo,
  formatCaloriesInfo,
  formatDietPlan,
  formatFoodList,
  calculateAndFormatBMI
} = require('../src/utils/messages');

describe('Messages Module', () => {
  describe('messages object', () => {
    test('should have welcome message', () => {
      expect(messages.welcome).toBeDefined();
      expect(messages.welcome).toContain('مرحباً');
    });

    test('should have help message', () => {
      expect(messages.help).toBeDefined();
      expect(messages.help).toContain('/food');
    });

    test('should have categories message', () => {
      expect(messages.categories).toBeDefined();
    });

    test('should have food not found message', () => {
      expect(messages.foodNotFound).toBeDefined();
    });
  });

  describe('formatFoodInfo', () => {
    const testFood = {
      name: 'تفاح',
      nameEn: 'Apple',
      calories: 52,
      protein: 0.3,
      carbs: 14,
      fat: 0.2,
      fiber: 2.4,
      servingSize: '100 جرام',
      category: 'فواكه',
      benefits: ['غني بالألياف', 'يساعد على الهضم'],
      emoji: '🍎'
    };

    test('should format food info correctly', () => {
      const formatted = formatFoodInfo(testFood);
      expect(formatted).toContain('تفاح');
      expect(formatted).toContain('Apple');
      expect(formatted).toContain('52');
      expect(formatted).toContain('غني بالألياف');
    });

    test('should include all nutritional values', () => {
      const formatted = formatFoodInfo(testFood);
      expect(formatted).toContain('السعرات الحرارية');
      expect(formatted).toContain('البروتين');
      expect(formatted).toContain('الكربوهيدرات');
      expect(formatted).toContain('الدهون');
      expect(formatted).toContain('الألياف');
    });
  });

  describe('formatCaloriesInfo', () => {
    const testFood = {
      name: 'موز',
      calories: 89,
      servingSize: '100 جرام',
      emoji: '🍌'
    };

    test('should format calories info correctly', () => {
      const formatted = formatCaloriesInfo(testFood);
      expect(formatted).toContain('موز');
      expect(formatted).toContain('89');
      expect(formatted).toContain('السعرات الحرارية');
    });
  });

  describe('calculateAndFormatBMI', () => {
    test('should calculate normal weight BMI correctly', () => {
      const result = calculateAndFormatBMI(70, 175);
      expect(result).toContain('22.9');
      expect(result).toContain('وزن طبيعي');
    });

    test('should identify underweight', () => {
      const result = calculateAndFormatBMI(45, 170);
      expect(result).toContain('نقص في الوزن');
    });

    test('should identify overweight', () => {
      const result = calculateAndFormatBMI(85, 170);
      expect(result).toContain('زيادة في الوزن');
    });

    test('should identify obesity', () => {
      const result = calculateAndFormatBMI(110, 170);
      expect(result).toContain('سمنة');
    });
  });

  describe('formatDietPlan', () => {
    const testPlan = {
      name: 'نظام اختباري',
      nameEn: 'Test Diet',
      emoji: '🥗',
      description: 'وصف النظام',
      dailyCalories: '2000 سعرة',
      tips: ['نصيحة 1', 'نصيحة 2'],
      meals: {
        breakfast: ['وجبة إفطار'],
        lunch: ['وجبة غداء'],
        dinner: ['وجبة عشاء'],
        snacks: ['وجبة خفيفة']
      }
    };

    test('should format diet plan correctly', () => {
      const formatted = formatDietPlan(testPlan);
      expect(formatted).toContain('نظام اختباري');
      expect(formatted).toContain('Test Diet');
      expect(formatted).toContain('2000 سعرة');
      expect(formatted).toContain('نصيحة 1');
    });
  });

  describe('formatFoodList', () => {
    const testFoods = [
      { name: 'تفاح', emoji: '🍎', calories: 52 },
      { name: 'موز', emoji: '🍌', calories: 89 }
    ];

    test('should format food list correctly', () => {
      const formatted = formatFoodList('فواكه', testFoods);
      expect(formatted).toContain('فواكه');
      expect(formatted).toContain('تفاح');
      expect(formatted).toContain('موز');
      expect(formatted).toContain('52');
      expect(formatted).toContain('89');
    });
  });
});

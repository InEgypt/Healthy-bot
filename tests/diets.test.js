/**
 * اختبارات الأنظمة الغذائية
 * Tests for diet plans
 */

const { 
  dietPlans, 
  generalTips, 
  funFacts, 
  getDietPlan, 
  getAllDietPlans, 
  getRandomTip, 
  getRandomFact 
} = require('../src/data/diets');

describe('Diet Plans', () => {
  describe('getDietPlan', () => {
    test('should return weight loss plan', () => {
      const plan = getDietPlan('weightLoss');
      expect(plan).toBeDefined();
      expect(plan.name).toBe('نظام إنقاص الوزن');
    });

    test('should return weight gain plan', () => {
      const plan = getDietPlan('weightGain');
      expect(plan).toBeDefined();
      expect(plan.name).toBe('نظام زيادة الوزن');
    });

    test('should return diabetic plan', () => {
      const plan = getDietPlan('diabetic');
      expect(plan).toBeDefined();
      expect(plan.name).toBe('نظام مرضى السكري');
    });

    test('should return null for non-existent plan', () => {
      const plan = getDietPlan('nonExistentPlan');
      expect(plan).toBeNull();
    });
  });

  describe('getAllDietPlans', () => {
    test('should return all diet plans', () => {
      const plans = getAllDietPlans();
      expect(Object.keys(plans).length).toBeGreaterThan(0);
      expect(plans).toHaveProperty('weightLoss');
      expect(plans).toHaveProperty('weightGain');
      expect(plans).toHaveProperty('diabetic');
      expect(plans).toHaveProperty('heartHealthy');
      expect(plans).toHaveProperty('vegetarian');
    });
  });

  describe('getRandomTip', () => {
    test('should return a random tip', () => {
      const tip = getRandomTip();
      expect(tip).toBeDefined();
      expect(typeof tip).toBe('string');
      expect(generalTips).toContain(tip);
    });
  });

  describe('getRandomFact', () => {
    test('should return a random fact', () => {
      const fact = getRandomFact();
      expect(fact).toBeDefined();
      expect(typeof fact).toBe('string');
      expect(funFacts).toContain(fact);
    });
  });

  describe('Diet plan structure', () => {
    test('all plans should have required fields', () => {
      Object.values(dietPlans).forEach(plan => {
        expect(plan).toHaveProperty('name');
        expect(plan).toHaveProperty('nameEn');
        expect(plan).toHaveProperty('emoji');
        expect(plan).toHaveProperty('description');
        expect(plan).toHaveProperty('dailyCalories');
        expect(plan).toHaveProperty('tips');
        expect(plan).toHaveProperty('meals');
        expect(Array.isArray(plan.tips)).toBe(true);
      });
    });

    test('all plans should have meal suggestions', () => {
      Object.values(dietPlans).forEach(plan => {
        expect(plan.meals).toHaveProperty('breakfast');
        expect(plan.meals).toHaveProperty('lunch');
        expect(plan.meals).toHaveProperty('dinner');
        expect(plan.meals).toHaveProperty('snacks');
      });
    });
  });
});

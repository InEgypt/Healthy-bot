/**
 * اختبارات قاعدة بيانات الأطعمة
 * Tests for food database
 */

const { searchFood, getFoodsByCategory, getCategories, getAllFoodNames, foods } = require('../src/data/foods');

describe('Food Database', () => {
  describe('searchFood', () => {
    test('should find food by exact Arabic name', () => {
      const food = searchFood('تفاح');
      expect(food).toBeDefined();
      expect(food.name).toBe('تفاح');
      expect(food.calories).toBe(52);
    });

    test('should find food by partial name', () => {
      const food = searchFood('بروك');
      expect(food).toBeDefined();
      expect(food.name).toBe('بروكلي');
    });

    test('should return null for non-existent food', () => {
      const food = searchFood('طعام غير موجود');
      expect(food).toBeNull();
    });

    test('should handle whitespace in search query', () => {
      const food = searchFood('  تفاح  ');
      expect(food).toBeDefined();
    });
  });

  describe('getFoodsByCategory', () => {
    test('should return foods in a specific category', () => {
      const fruits = getFoodsByCategory('فواكه');
      expect(fruits.length).toBeGreaterThan(0);
      expect(fruits.every(f => f.category === 'فواكه')).toBe(true);
    });

    test('should return empty array for non-existent category', () => {
      const foods = getFoodsByCategory('فئة غير موجودة');
      expect(foods).toEqual([]);
    });
  });

  describe('getCategories', () => {
    test('should return all unique categories', () => {
      const categories = getCategories();
      expect(categories).toContain('فواكه');
      expect(categories).toContain('خضروات');
      expect(categories).toContain('بروتينات');
      expect(categories).toContain('ألبان');
    });
  });

  describe('getAllFoodNames', () => {
    test('should return all food names', () => {
      const names = getAllFoodNames();
      expect(names.length).toBeGreaterThan(0);
      expect(names).toContain('تفاح');
      expect(names).toContain('موز');
    });
  });

  describe('Food data structure', () => {
    test('all foods should have required fields', () => {
      Object.values(foods).forEach(food => {
        expect(food).toHaveProperty('name');
        expect(food).toHaveProperty('nameEn');
        expect(food).toHaveProperty('calories');
        expect(food).toHaveProperty('protein');
        expect(food).toHaveProperty('carbs');
        expect(food).toHaveProperty('fat');
        expect(food).toHaveProperty('fiber');
        expect(food).toHaveProperty('servingSize');
        expect(food).toHaveProperty('category');
        expect(food).toHaveProperty('benefits');
        expect(food).toHaveProperty('emoji');
      });
    });

    test('all foods should have valid nutritional values', () => {
      Object.values(foods).forEach(food => {
        expect(food.calories).toBeGreaterThanOrEqual(0);
        expect(food.protein).toBeGreaterThanOrEqual(0);
        expect(food.carbs).toBeGreaterThanOrEqual(0);
        expect(food.fat).toBeGreaterThanOrEqual(0);
        expect(food.fiber).toBeGreaterThanOrEqual(0);
      });
    });
  });
});

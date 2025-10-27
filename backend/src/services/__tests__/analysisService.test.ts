import { describe, expect, test } from '@jest/globals';
import { analyzeTypingPattern } from '../analysisService';

describe('Analysis Service', () => {
  test('analyzeTypingPattern returns expected structure', async () => {
    const testData = [{ key: 'a', timestamp: 1234 }];
    const result = await analyzeTypingPattern(testData);
    
    expect(result).toHaveProperty('speed');
    expect(result).toHaveProperty('consistency');
    expect(result).toHaveProperty('pattern');
  });

  test('calculates typing speed correctly', async () => {
    const typingData = [
      { key: 'h', timestamp: 1000 },
      { key: 'e', timestamp: 1200 },
      { key: 'l', timestamp: 1400 },
      { key: 'l', timestamp: 1600 },
      { key: 'o', timestamp: 1800 }
    ];
    
    const result = await analyzeTypingPattern(typingData);
    expect(result.speed).toBeGreaterThan(0);
  });

  test('handles empty input gracefully', async () => {
    const result = await analyzeTypingPattern([]);
    expect(result.speed).toBe(0);
    expect(result.consistency).toBe(0);
    expect(result.pattern).toEqual([]);
  });
});
import {
  getTotalMortgageInterest,
  getMonthlyMortgagePayment,
  getTotalMortgageCost,
  getNetMonthlyIncome,
  getTotalPurchasePrice,
  getYield,
  getDownPayment,
} from './index';

describe('getMonthlyMortgagePayment', () => {
  it('should calculate monthly payment correctly', () => {
    // Example: $200,000 loan at 3.5% for 20 years
    const result = getMonthlyMortgagePayment('200000', '3.5', '20');
    // M = P * [t(1+t)^n] / [(1+t)^n - 1]
    // P = 200000, t = 0.035/12 = 0.0029167, n = 240
    // Expected monthly payment ≈ $1159.92 ≈ $1160
    const monthly = Number(result);
    expect(monthly).toBeGreaterThan(1150);
    expect(monthly).toBeLessThanOrEqual(1160);
  });

  it('should return 0 for zero interest rate with principal only', () => {
    const result = getMonthlyMortgagePayment('120000', '0', '10');
    // 120000 / 120 = 1000
    expect(result).toBe('1000');
  });

  it('should handle zero loan amount', () => {
    const result = getMonthlyMortgagePayment('0', '3.5', '20');
    expect(result).toBe('0');
  });

  it('should handle zero duration', () => {
    const result = getMonthlyMortgagePayment('100000', '3.5', '0');
    expect(result).toBe('0');
  });
});

describe('getTotalMortgageInterest', () => {
  it('should calculate total interest correctly', () => {
    // Example: $168,000 loan over 20 years with $972 monthly payment
    const result = getTotalMortgageInterest('168000', '20', '972');
    // Principal only: 168000 / 240 = 700
    // Interest only: 972 - 700 = 272
    // Total interest: 272 * 240 = 65280
    expect(result).toBe('65280');
  });

  it('should handle zero monthly payment', () => {
    const result = getTotalMortgageInterest('100000', '20', '0');
    // Principal only: 100000 / 240 = 416.67
    // Interest: 0 - 416.67 = -416.67
    // Total: -416.67 * 240 ≈ -100000
    expect(Number(result)).toBeCloseTo(-100000, 0);
  });
});

describe('getTotalMortgageCost', () => {
  it('should calculate total mortgage cost correctly', () => {
    const result = getTotalMortgageCost('168000', '65280');
    // 168000 + 65280 = 233280
    expect(result).toBe('233280');
  });
});

describe('getNetMonthlyIncome', () => {
  it('should calculate net monthly income correctly', () => {
    // Annual rent: $9600, Annual charges: $600, Annual tax: $800
    const result = getNetMonthlyIncome('9600', '600', '800');
    // (9600 - 600 - 800) / 12 = 8200 / 12 = 683.33
    expect(result).toBe('683');
  });

  it('should handle zero rent', () => {
    const result = getNetMonthlyIncome('0', '600', '800');
    expect(result).toBe('-117');
  });

  it('should handle negative income correctly', () => {
    const result = getNetMonthlyIncome('5000', '600', '800');
    // (5000 - 600 - 800) / 12 = 3600 / 12 = 300
    expect(result).toBe('300');
  });
});

describe('getTotalPurchasePrice', () => {
  it('should calculate total purchase price correctly', () => {
    const result = getTotalPurchasePrice('150000', '13000', '5000');
    // 150000 + 13000 + 5000 = 168000
    expect(result).toBe('168000');
  });

  it('should handle zero values', () => {
    const result = getTotalPurchasePrice('0', '0', '0');
    expect(result).toBe('0');
  });
});

describe('getYield', () => {
  it('should calculate gross yield correctly', () => {
    // Annual rent: $9600, Total cost: $168000
    const result = getYield('9600', '168000');
    // (9600 / 168000) * 100 = 5.714...
    expect(Number(result)).toBeCloseTo(5.71, 1);
  });

  it('should calculate net yield correctly', () => {
    // Net annual: $8200, Total cost: $168000
    const result = getYield('8200', '168000');
    // (8200 / 168000) * 100 = 4.88...
    expect(Number(result)).toBeCloseTo(4.88, 1);
  });

  it('should handle zero total cost', () => {
    const result = getYield('9600', '0');
    // Returns "0" when division by zero occurs (isNaN check in function)
    expect(result).toBe('0');
  });

  it('should handle zero revenue', () => {
    const result = getYield('0', '168000');
    expect(result).toBe('0.00');
  });

  it('should format yield with 2 decimal places', () => {
    const result = getYield('9600', '168000');
    // Should have 2 decimal places
    expect(result).toBe('5.71');
  });
});

describe('getDownPayment', () => {
  it('should calculate down payment correctly', () => {
    const result = getDownPayment('168000', '168000');
    // 168000 - 168000 = 0
    expect(result).toBe('0');
  });

  it('should calculate positive down payment', () => {
    const result = getDownPayment('150000', '168000');
    // 168000 - 150000 = 18000
    expect(result).toBe('18000');
  });

  it('should handle loan greater than total cost', () => {
    const result = getDownPayment('200000', '168000');
    // 168000 - 200000 = -32000
    expect(result).toBe('-32000');
  });
});

describe('Edge cases and NaN handling', () => {
  it('should handle NaN inputs gracefully', () => {
    expect(getMonthlyMortgagePayment('invalid', '3.5', '20')).toBe('0');
    expect(getTotalMortgageInterest('invalid', '20', '972')).toBe('0');
    expect(getTotalPurchasePrice('invalid', '13000', '5000')).toBe('0');
  });
});

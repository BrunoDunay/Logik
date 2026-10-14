import { clampBudget, estimateMessages, formatMoney } from './estimate';

const range = { minCost: 7, maxCost: 14, minBudget: 1000, maxBudget: 15000, step: 500 };

describe('estimateMessages', () => {
  it('calcula el rango de conversaciones con el costo real', () => {
    expect(estimateMessages(3000, range)).toEqual({ low: 214, high: 428 });
  });

  it('nunca devuelve números negativos ni infinitos', () => {
    expect(estimateMessages(0, range)).toEqual({ low: 0, high: 0 });
    expect(estimateMessages(3000, { minCost: 0, maxCost: 0 })).toEqual({ low: 0, high: 0 });
  });
});

describe('clampBudget', () => {
  it('redondea al paso y respeta los límites', () => {
    expect(clampBudget(3240, range)).toBe(3000);
    expect(clampBudget(3260, range)).toBe(3500);
    expect(clampBudget(200, range)).toBe(1000);
    expect(clampBudget(99000, range)).toBe(15000);
    expect(clampBudget(Number.NaN, range)).toBe(1000);
  });
});

describe('formatMoney', () => {
  it('usa pesos sin decimales', () => {
    expect(formatMoney(2499)).toBe('$2,499');
  });
});

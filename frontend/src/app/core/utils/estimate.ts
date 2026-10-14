import { Estimator } from '../types/settings.model';

export interface MessageEstimate {
  /** Conversaciones con el costo por conversación más alto (escenario conservador). */
  low: number;
  /** Conversaciones con el costo más bajo que han logrado. */
  high: number;
}

/** Cuántas conversaciones daría un presupuesto, con el rango de costo de campañas reales. */
export function estimateMessages(budget: number, { minCost, maxCost }: Pick<Estimator, 'minCost' | 'maxCost'>): MessageEstimate {
  if (!(budget > 0) || !(minCost > 0) || !(maxCost > 0)) return { low: 0, high: 0 };
  return { low: Math.floor(budget / maxCost), high: Math.floor(budget / minCost) };
}

/** Ajusta un valor del deslizador al rango y al paso configurados. */
export function clampBudget(value: number, { minBudget, maxBudget, step }: Pick<Estimator, 'minBudget' | 'maxBudget' | 'step'>): number {
  if (!Number.isFinite(value)) return minBudget;
  const stepped = Math.round((value - minBudget) / step) * step + minBudget;
  return Math.min(maxBudget, Math.max(minBudget, stepped));
}

const MXN = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
const INT = new Intl.NumberFormat('es-MX', { maximumFractionDigits: 0 });

/** $3,000 */
export const formatMoney = (value: number) => MXN.format(value).replace(/\s?MXN$/, '');
/** 1,250 */
export const formatInt = (value: number) => INT.format(value);

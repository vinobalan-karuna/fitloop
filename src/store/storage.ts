import type { AppState } from '../types';

const KEY = 'fitloop-v1';

export const defaultState = (): AppState => ({
  onboarded: false,
  onboardingStep: 0,
  healthProvider: null,
  goalType: 'lose',
  calorieGoal: 1800,
  proteinGoal: 120,
  shareMealsTip: false,
  logs: [],
  burnedKcal: 420,
  steps: 6842,
  coins: 0,
  streak: 0,
  lastRewardDate: null,
  coupons: [
    { id: 'c1', title: '₹50 off demo — Swiggy-style', cost: 20, claimed: false },
    { id: 'c2', title: '₹75 off demo — Zomato-style', cost: 35, claimed: false },
  ],
});

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState();
    return { ...defaultState(), ...JSON.parse(raw) };
  } catch {
    return defaultState();
  }
}

export function saveState(state: AppState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

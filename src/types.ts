export type Confidence = 'platform estimate' | 'user adjusted' | 'user weighed' | 'user entry' | 'demo';

export type GoalType = 'lose' | 'protein' | 'maintain';

export type HealthProvider = 'apple' | 'health_connect' | 'samsung' | 'demo' | null;

export type Screen =
  | 'onboarding'
  | 'today'
  | 'log-delivery'
  | 'log-home'
  | 'activity'
  | 'goals'
  | 'still-order'
  | 'rewards'
  | 'settings'
  | 'portion'
  | 'confirm-delivery'
  | 'log-picker';

export interface Macros {
  kcal: number;
  protein: number;
  carbs?: number;
  fat?: number;
}

export interface FoodLog {
  id: string;
  name: string;
  source: 'delivery' | 'home';
  platform?: string;
  macros: Macros;
  confidence: Confidence;
  portionLabel?: string;
  timestamp: number;
}

export interface Dish {
  id: string;
  name: string;
  restaurant: string;
  platform: 'Swiggy' | 'Zomato';
  macros: Macros;
  emoji: string;
}

export interface HomeFood {
  id: string;
  name: string;
  emoji: string;
  unit: string;
  macros: Macros; // per unit
}

export interface AppState {
  onboarded: boolean;
  onboardingStep: number;
  healthProvider: HealthProvider;
  goalType: GoalType;
  calorieGoal: number;
  proteinGoal: number;
  shareMealsTip: boolean;
  logs: FoodLog[];
  burnedKcal: number;
  steps: number;
  coins: number;
  streak: number;
  lastRewardDate: string | null;
  coupons: { id: string; title: string; cost: number; claimed: boolean }[];
}

export interface PendingDelivery {
  dish: Dish;
  fraction: number;
  portionLabel: string;
  adjusted: boolean;
}

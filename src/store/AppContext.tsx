import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { AppState, FoodLog, PendingDelivery, Screen } from '../types';
import { defaultState, loadState, saveState, todayKey } from './storage';

interface Ctx {
  state: AppState;
  screen: Screen;
  setScreen: (s: Screen) => void;
  pending: PendingDelivery | null;
  setPending: (p: PendingDelivery | null) => void;
  update: (patch: Partial<AppState>) => void;
  addLog: (log: Omit<FoodLog, 'id' | 'timestamp'>) => void;
  resetAll: () => void;
  simulateEndOfDay: () => { awarded: boolean; coins: number; reason: string };
  consumed: { kcal: number; protein: number };
  remaining: number;
}

const AppCtx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(() => loadState());
  const [screen, setScreen] = useState<Screen>(() =>
    loadState().onboarded ? 'today' : 'onboarding'
  );
  const [pending, setPending] = useState<PendingDelivery | null>(null);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const update = useCallback((patch: Partial<AppState>) => {
    setState((s) => ({ ...s, ...patch }));
  }, []);

  const addLog = useCallback((log: Omit<FoodLog, 'id' | 'timestamp'>) => {
    const entry: FoodLog = {
      ...log,
      id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      timestamp: Date.now(),
    };
    setState((s) => ({ ...s, logs: [...s.logs, entry] }));
  }, []);

  const resetAll = useCallback(() => {
    const fresh = defaultState();
    setState(fresh);
    setScreen('onboarding');
    setPending(null);
  }, []);

  const consumed = useMemo(() => {
    return state.logs.reduce(
      (acc, l) => ({
        kcal: acc.kcal + l.macros.kcal,
        protein: acc.protein + l.macros.protein,
      }),
      { kcal: 0, protein: 0 }
    );
  }, [state.logs]);

  const remaining = Math.max(0, state.calorieGoal - consumed.kcal);

  const simulateEndOfDay = useCallback(() => {
    const goal = state.calorieGoal;
    const band = goal * 0.1;
    const within = Math.abs(consumed.kcal - goal) <= band;
    const hasLog = state.logs.length >= 1;
    const proteinBonus = consumed.protein >= state.proteinGoal;
    const key = todayKey();

    if (state.lastRewardDate === key) {
      return { awarded: false, coins: 0, reason: 'Already simulated for today.' };
    }
    if (!hasLog) {
      return { awarded: false, coins: 0, reason: 'Need at least 1 food log.' };
    }
    if (!within) {
      return {
        awarded: false,
        coins: 0,
        reason: `Consumed ${Math.round(consumed.kcal)} kcal is outside ±10% of ${goal}.`,
      };
    }
    let coins = 10;
    if (proteinBonus) coins += 5;
    const streak = state.streak + 1;
    if (streak >= 3) coins += 5;
    setState((s) => ({
      ...s,
      coins: s.coins + coins,
      streak,
      lastRewardDate: key,
    }));
    return {
      awarded: true,
      coins,
      reason: proteinBonus
        ? `On-track + protein bonus! +${coins} coins`
        : `On-track day! +${coins} coins`,
    };
  }, [state, consumed]);

  const value: Ctx = {
    state,
    screen,
    setScreen,
    pending,
    setPending,
    update,
    addLog,
    resetAll,
    simulateEndOfDay,
    consumed,
    remaining,
  };

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useApp outside provider');
  return ctx;
}

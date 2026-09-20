import type { HomeFood } from '../types';

export const HOME_FOODS: HomeFood[] = [
  { id: 'h1', name: 'Roti / Chapati', emoji: '🫓', unit: 'piece', macros: { kcal: 120, protein: 3, carbs: 20, fat: 3 } },
  { id: 'h2', name: 'Rice (cooked)', emoji: '🍚', unit: 'bowl', macros: { kcal: 200, protein: 4, carbs: 44, fat: 0.5 } },
  { id: 'h3', name: 'Dal', emoji: '🥣', unit: 'katori', macros: { kcal: 150, protein: 9, carbs: 20, fat: 4 } },
  { id: 'h4', name: 'Sabzi', emoji: '🥬', unit: 'katori', macros: { kcal: 120, protein: 3, carbs: 12, fat: 7 } },
  { id: 'h5', name: 'Egg (boiled)', emoji: '🥚', unit: 'egg', macros: { kcal: 78, protein: 6, carbs: 0.5, fat: 5 } },
  { id: 'h6', name: 'Curd', emoji: '🥛', unit: 'bowl', macros: { kcal: 100, protein: 6, carbs: 8, fat: 4 } },
  { id: 'h7', name: 'Oil / Ghee', emoji: '🫒', unit: 'tsp', macros: { kcal: 40, protein: 0, carbs: 0, fat: 4.5 } },
  { id: 'h8', name: 'Chai', emoji: '☕', unit: 'cup', macros: { kcal: 90, protein: 2, carbs: 12, fat: 3 } },
  { id: 'h9', name: 'Custom item', emoji: '✏️', unit: 'serving', macros: { kcal: 200, protein: 10, carbs: 20, fat: 8 } },
];

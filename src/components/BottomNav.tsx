import { useApp } from '../store/AppContext';
import type { Screen } from '../types';

const items: { id: Screen; label: string; ico: string }[] = [
  { id: 'today', label: 'Today', ico: '◉' },
  { id: 'activity', label: 'Activity', ico: '⌁' },
  { id: 'goals', label: 'Goals', ico: '◎' },
  { id: 'rewards', label: 'Rewards', ico: '✦' },
  { id: 'settings', label: 'Settings', ico: '⚙' },
];

export function BottomNav() {
  const { screen, setScreen } = useApp();
  const main: Screen[] = ['today', 'activity', 'goals', 'rewards', 'settings'];
  if (!main.includes(screen)) return null;

  return (
    <nav className="bottom-nav">
      {items.map((it) => (
        <button
          key={it.id}
          className={`nav-btn ${screen === it.id ? 'active' : ''}`}
          onClick={() => setScreen(it.id)}
          type="button"
        >
          <span className="ico">{it.ico}</span>
          {it.label}
        </button>
      ))}
    </nav>
  );
}

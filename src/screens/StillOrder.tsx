import { useApp } from '../store/AppContext';

const chips = [
  { label: '~300 kcal · 25g+ protein', kcal: 300 },
  { label: '~400 kcal · 30g+ protein', kcal: 400 },
  { label: '~500 kcal · grilled / bowl', kcal: 500 },
  { label: 'High protein wrap', kcal: 450 },
  { label: 'Light South · dosa-ish', kcal: 420 },
];

export function StillOrder() {
  const { remaining, state, consumed, setScreen } = useApp();
  const proteinLeft = Math.max(0, state.proteinGoal - consumed.protein);

  const openExternal = (app: 'swiggy' | 'zomato') => {
    const url = app === 'swiggy' ? 'https://www.swiggy.com' : 'https://www.zomato.com';
    const ok = window.confirm(
      `Demo: open ${app === 'swiggy' ? 'Swiggy' : 'Zomato'}?\n\nRemaining ~${Math.round(remaining)} kcal · ${Math.round(proteinLeft)}g protein left.\n\nOK = open link · Cancel = stay`
    );
    if (ok) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const fit = chips.filter((c) => c.kcal <= remaining + 50);

  return (
    <div>
      <div className="header-row">
        <button className="btn btn-ghost" type="button" onClick={() => setScreen('today')}>← Back</button>
      </div>
      <h2>What can I still order?</h2>
      <p className="lead">Thin suggestion layer — checkout stays on Swiggy/Zomato.</p>

      <div className="card">
        <div className="grid-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="stat remain">
            <div className="label">Remaining</div>
            <div className="value">{Math.round(remaining)}</div>
            <div className="unit">kcal</div>
          </div>
          <div className="stat consumed">
            <div className="label">Protein left</div>
            <div className="value">{Math.round(proteinLeft)}</div>
            <div className="unit">grams</div>
          </div>
        </div>
      </div>

      <h3>Suggestion chips</h3>
      <div className="chip-row" style={{ marginBottom: 16 }}>
        {(fit.length ? fit : chips.slice(0, 3)).map((c) => (
          <span key={c.label} className="chip suggest">
            {c.label}
          </span>
        ))}
      </div>

      {remaining < 200 && (
        <div className="banner warn">Low remaining — consider home log or a light bowl.</div>
      )}

      <button className="btn btn-primary" type="button" onClick={() => openExternal('swiggy')} style={{ marginBottom: 8 }}>
        Open Swiggy (demo)
      </button>
      <button className="btn btn-secondary" type="button" onClick={() => openExternal('zomato')}>
        Open Zomato (demo)
      </button>

      <p className="disclaimer">After you order, come back → Log delivery → confirm / adjust portion.</p>
    </div>
  );
}

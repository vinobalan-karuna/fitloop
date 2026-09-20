import { useState } from 'react';
import { useApp } from '../store/AppContext';

export function Rewards() {
  const { state, update, simulateEndOfDay, consumed } = useApp();
  const [toast, setToast] = useState<string | null>(null);

  const runSim = () => {
    const res = simulateEndOfDay();
    setToast(res.reason);
    setTimeout(() => setToast(null), 3500);
  };

  const claim = (id: string, cost: number) => {
    if (state.coins < cost) {
      setToast('Not enough coins.');
      setTimeout(() => setToast(null), 2500);
      return;
    }
    update({
      coins: state.coins - cost,
      coupons: state.coupons.map((c) => (c.id === id ? { ...c, claimed: true } : c)),
    });
    setToast('Mock coupon claimed (prototype only).');
    setTimeout(() => setToast(null), 2500);
  };

  const bandLo = Math.round(state.calorieGoal * 0.9);
  const bandHi = Math.round(state.calorieGoal * 1.1);

  return (
    <div>
      <div className="header-row">
        <div>
          <h2>Rewards</h2>
          <p className="lead" style={{ marginBottom: 0 }}>Coins for on-track days only</p>
        </div>
        <div className="coins">✦ {state.coins}</div>
      </div>

      <div className="card">
        <h3>Streak</h3>
        <div style={{ fontSize: 28, fontWeight: 800 }}>{state.streak} day{state.streak === 1 ? '' : 's'}</div>
        <p className="lead" style={{ marginBottom: 0 }}>
          Today: {Math.round(consumed.kcal)} kcal (band {bandLo}–{bandHi}) · {state.logs.length} log(s)
        </p>
      </div>

      <div className="card soft">
        <h3>Simulate end of day</h3>
        <p className="lead">
          Award if consumed within ±10% of calorie goal AND ≥1 food log. Protein met → +5 bonus.
        </p>
        <button className="btn btn-primary" type="button" onClick={runSim}>
          Simulate end of day
        </button>
      </div>

      <h3>Mock coupons</h3>
      {state.coupons.map((c) => (
        <div className="list-item" key={c.id} style={{ cursor: 'default' }}>
          <div className="emoji">🎟</div>
          <div className="meta">
            <div className="title">{c.title}</div>
            <div className="sub">{c.claimed ? 'Claimed' : `${c.cost} coins`}</div>
            {!c.claimed && (
              <button
                className="btn btn-secondary"
                type="button"
                style={{ marginTop: 8, width: 'auto', padding: '8px 12px' }}
                onClick={() => claim(c.id, c.cost)}
              >
                Redeem
              </button>
            )}
          </div>
        </div>
      ))}

      <p className="disclaimer">Prototype offers only — not real Swiggy/Zomato partner coins.</p>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

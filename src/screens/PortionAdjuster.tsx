import { useState } from 'react';
import { useApp } from '../store/AppContext';

const FRACTIONS: { label: string; value: number }[] = [
  { label: '1/2', value: 0.5 },
  { label: '1/3', value: 1 / 3 },
  { label: '1/4', value: 0.25 },
  { label: '¾', value: 0.75 },
];

export function PortionAdjuster() {
  const { pending, setPending, setScreen } = useApp();
  const [mode, setMode] = useState<'frac' | 'pct' | 'spoons'>('frac');
  const [pct, setPct] = useState(50);
  const [spoons, setSpoons] = useState(4);

  if (!pending) {
    return (
      <div>
        <button className="btn btn-primary" type="button" onClick={() => setScreen('log-delivery')}>
          Pick a dish
        </button>
      </div>
    );
  }

  const dish = pending.dish;
  let fraction = pending.fraction;
  let portionLabel = pending.portionLabel;

  if (mode === 'frac') {
    fraction = pending.fraction;
    portionLabel = pending.portionLabel;
  } else if (mode === 'pct') {
    fraction = pct / 100;
    portionLabel = `${pct}%`;
  } else {
    // rough: full dish ≈ 12 spoons for biryani-like
    fraction = Math.min(1, spoons / 12);
    portionLabel = `${spoons} spoons`;
  }

  const applyFrac = (v: number, label: string) => {
    setMode('frac');
    setPending({ ...pending, fraction: v, portionLabel: label, adjusted: true });
  };

  const previewKcal = Math.round(dish.macros.kcal * fraction);
  const previewP = Math.round(dish.macros.protein * fraction * 10) / 10;

  const save = () => {
    const f = mode === 'pct' ? pct / 100 : mode === 'spoons' ? Math.min(1, spoons / 12) : pending.fraction;
    const label =
      mode === 'pct' ? `${pct}%` : mode === 'spoons' ? `${spoons} spoons` : pending.portionLabel;
    setPending({ ...pending, fraction: f, portionLabel: label, adjusted: true });
    setScreen('confirm-delivery');
  };

  return (
    <div>
      <div className="header-row">
        <button className="btn btn-ghost" type="button" onClick={() => setScreen('confirm-delivery')}>
          ← Back
        </button>
      </div>
      <h2>Portion adjuster</h2>
      <p className="lead">{dish.emoji} {dish.name} — honesty is the product.</p>

      <div className="chip-row" style={{ marginBottom: 12 }}>
        <button className={`chip ${mode === 'frac' ? 'active' : ''}`} type="button" onClick={() => setMode('frac')}>
          Fraction
        </button>
        <button className={`chip ${mode === 'pct' ? 'active' : ''}`} type="button" onClick={() => setMode('pct')}>
          %
        </button>
        <button className={`chip ${mode === 'spoons' ? 'active' : ''}`} type="button" onClick={() => setMode('spoons')}>
          Spoons
        </button>
      </div>

      {mode === 'frac' && (
        <div className="portion-grid">
          {FRACTIONS.map((f) => (
            <button
              key={f.label}
              type="button"
              className={pending.fraction === f.value && mode === 'frac' ? 'active' : ''}
              onClick={() => applyFrac(f.value, f.label)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {mode === 'pct' && (
        <div className="field">
          <label>Custom percent: {pct}%</label>
          <input
            type="range"
            min={10}
            max={100}
            step={5}
            value={pct}
            onChange={(e) => setPct(Number(e.target.value))}
          />
        </div>
      )}

      {mode === 'spoons' && (
        <div>
          <p className="lead">Rough conversion: full pack ≈ 12 spoons</p>
          <div className="qty-row">
            <button type="button" onClick={() => setSpoons(Math.max(1, spoons - 1))}>−</button>
            <span className="n">{spoons}</span>
            <button type="button" onClick={() => setSpoons(Math.min(12, spoons + 1))}>+</button>
            <span style={{ color: 'var(--muted)', fontSize: 13 }}>spoons</span>
          </div>
        </div>
      )}

      <div className="card" style={{ marginTop: 14 }}>
        <h3>Live preview</h3>
        <div style={{ fontSize: 20, fontWeight: 700 }}>
          {previewKcal} kcal · {previewP}g protein
        </div>
        <p className="lead" style={{ marginBottom: 0, marginTop: 6 }}>
          Will tag as <strong>user adjusted</strong> · {portionLabel || 'custom'}
        </p>
      </div>

      <button className="btn btn-primary" type="button" onClick={save}>
        Apply & return to confirm
      </button>
    </div>
  );
}

import { useState } from 'react';
import { HOME_FOODS } from '../data/homeFoods';
import { ConfidenceTag } from '../components/ConfidenceTag';
import { useApp } from '../store/AppContext';

export function LogHome() {
  const { setScreen, addLog } = useApp();
  const [qty, setQty] = useState<Record<string, number>>({});
  const [customName, setCustomName] = useState('Custom meal');
  const [customKcal, setCustomKcal] = useState(200);
  const [customP, setCustomP] = useState(10);

  const setQ = (id: string, n: number) => {
    setQty((q) => ({ ...q, [id]: Math.max(0, n) }));
  };

  const selected = HOME_FOODS.filter((f) => (qty[f.id] ?? 0) > 0);
  const totals = selected.reduce(
    (acc, f) => {
      const n = qty[f.id] ?? 0;
      return {
        kcal: acc.kcal + f.macros.kcal * n,
        protein: acc.protein + f.macros.protein * n,
      };
    },
    { kcal: 0, protein: 0 }
  );

  const commit = () => {
    if (selected.length === 0) return;
    for (const f of selected) {
      const n = qty[f.id] ?? 0;
      const isCustom = f.id === 'h9';
      addLog({
        name: isCustom ? customName : `${f.name} ×${n}`,
        source: 'home',
        macros: {
          kcal: isCustom ? customKcal * n : f.macros.kcal * n,
          protein: isCustom ? customP * n : f.macros.protein * n,
        },
        confidence: 'user entry',
        portionLabel: `${n} ${f.unit}${n > 1 ? 's' : ''}`,
      });
    }
    setScreen('today');
  };

  return (
    <div>
      <div className="header-row">
        <button className="btn btn-ghost" type="button" onClick={() => setScreen('today')}>← Back</button>
      </div>
      <h2>Log home / local</h2>
      <p className="lead">Thali-friendly quick picks. Multi-select components.</p>

      {HOME_FOODS.map((f) => {
        const n = qty[f.id] ?? 0;
        return (
          <div className="list-item" key={f.id} style={{ cursor: 'default', flexDirection: 'column', alignItems: 'stretch' }}>
            <div style={{ display: 'flex', gap: 12, width: '100%' }}>
              <div className="emoji">{f.emoji}</div>
              <div className="meta">
                <div className="title">{f.name}</div>
                <div className="sub">per {f.unit}</div>
                <div className="macros">
                  {f.macros.kcal} kcal · {f.macros.protein}g P <ConfidenceTag value="user entry" />
                </div>
              </div>
            </div>
            <div className="qty-row">
              <button type="button" onClick={() => setQ(f.id, n - 1)}>−</button>
              <span className="n">{n}</span>
              <button type="button" onClick={() => setQ(f.id, n + 1)}>+</button>
            </div>
            {f.id === 'h9' && n > 0 && (
              <div style={{ marginTop: 8, width: '100%' }}>
                <div className="field">
                  <label>Name</label>
                  <input value={customName} onChange={(e) => setCustomName(e.target.value)} />
                </div>
                <div className="field">
                  <label>Kcal / serving</label>
                  <input type="number" value={customKcal} onChange={(e) => setCustomKcal(Number(e.target.value) || 0)} />
                </div>
                <div className="field">
                  <label>Protein g / serving</label>
                  <input type="number" value={customP} onChange={(e) => setCustomP(Number(e.target.value) || 0)} />
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="card">
        <h3>Preview</h3>
        <div style={{ fontWeight: 700, fontSize: 18 }}>
          {Math.round(totals.kcal)} kcal · {Math.round(totals.protein * 10) / 10}g protein
        </div>
        <p className="lead" style={{ marginBottom: 0 }}>{selected.length} item(s) · tagged user entry</p>
      </div>

      <button
        className="btn btn-primary"
        type="button"
        disabled={selected.length === 0}
        onClick={commit}
        style={{ opacity: selected.length === 0 ? 0.5 : 1 }}
      >
        Confirm & add to Today
      </button>
    </div>
  );
}

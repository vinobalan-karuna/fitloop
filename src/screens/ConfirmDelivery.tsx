import { ConfidenceTag } from '../components/ConfidenceTag';
import { useApp } from '../store/AppContext';

export function ConfirmDelivery() {
  const { pending, setPending, setScreen, addLog, state } = useApp();

  if (!pending) {
    return (
      <div>
        <p className="lead">No dish selected.</p>
        <button className="btn btn-primary" type="button" onClick={() => setScreen('log-delivery')}>
          Pick a dish
        </button>
      </div>
    );
  }

  const { dish, fraction, portionLabel, adjusted } = pending;
  const kcal = Math.round(dish.macros.kcal * fraction);
  const protein = Math.round(dish.macros.protein * fraction * 10) / 10;

  const ateAll = () => {
    setPending({ ...pending, fraction: 1, portionLabel: 'ate all', adjusted: false });
  };

  const goAdjust = () => setScreen('portion');

  const commit = () => {
    addLog({
      name: dish.name,
      source: 'delivery',
      platform: dish.platform,
      macros: {
        kcal,
        protein,
        carbs: dish.macros.carbs ? Math.round(dish.macros.carbs * fraction) : undefined,
        fat: dish.macros.fat ? Math.round(dish.macros.fat * fraction * 10) / 10 : undefined,
      },
      confidence: adjusted ? 'user adjusted' : 'platform estimate',
      portionLabel,
    });
    setPending(null);
    setScreen('today');
  };

  return (
    <div>
      <div className="header-row">
        <button className="btn btn-ghost" type="button" onClick={() => setScreen('log-delivery')}>← Back</button>
      </div>
      <h2>Confirm log</h2>
      <p className="lead">Never auto-commit. Review macros, then confirm.</p>

      <div className="card">
        <div style={{ fontSize: 36, marginBottom: 8 }}>{dish.emoji}</div>
        <h3>{dish.name}</h3>
        <p className="lead" style={{ marginBottom: 8 }}>
          {dish.restaurant} · {dish.platform}
        </p>
        <div className="macros" style={{ fontSize: 15, marginBottom: 8 }}>
          <strong>{kcal}</strong> kcal · <strong>{protein}</strong>g protein
        </div>
        <ConfidenceTag value={adjusted ? 'user adjusted' : 'platform estimate'} />
        {portionLabel && (
          <div className="sub" style={{ marginTop: 8, color: 'var(--muted)', fontSize: 13 }}>
            Portion: {portionLabel}
          </div>
        )}
      </div>

      <h3>Did you eat all of it?</h3>
      <div className="btn-row">
        <button className="btn btn-secondary" type="button" onClick={ateAll}>
          Yes, all
        </button>
        <button className="btn btn-accent" type="button" onClick={goAdjust}>
          Shared / partial
        </button>
      </div>

      {state.shareMealsTip && (
        <div className="banner warn" style={{ marginTop: 12 }}>
          Shared meal tip: biryani split? Use 1/2 or spoons.
        </div>
      )}

      <button className="btn btn-primary" type="button" onClick={commit} style={{ marginTop: 16 }}>
        Confirm & add to Today
      </button>
    </div>
  );
}

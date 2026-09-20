import { ConfidenceTag } from '../components/ConfidenceTag';
import { ProgressBar } from '../components/ProgressBar';
import { useApp } from '../store/AppContext';

const healthLabel: Record<string, string> = {
  apple: 'Apple Health (demo)',
  health_connect: 'Health Connect (demo)',
  samsung: 'Samsung Health (demo)',
  demo: 'Apple Health (demo)',
};

export function Today() {
  const { state, consumed, remaining, setScreen } = useApp();
  const provider = state.healthProvider ?? 'demo';

  return (
    <div>
      <div className="header-row">
        <div className="brand" style={{ marginBottom: 0 }}>
          <div className="brand-mark">FL</div>
          <div>
            <h1>Today</h1>
            <p>Ledger · not a catalog</p>
          </div>
        </div>
        <div className="coins">✦ {state.coins}</div>
      </div>

      <div className="card">
        <div className="grid-3">
          <div className="stat consumed">
            <div className="label">Consumed</div>
            <div className="value">{Math.round(consumed.kcal)}</div>
            <div className="unit">kcal</div>
          </div>
          <div className="stat burned">
            <div className="label">Burned</div>
            <div className="value">{state.burnedKcal}</div>
            <div className="unit">kcal</div>
          </div>
          <div className="stat remain">
            <div className="label">Remaining</div>
            <div className="value">{Math.round(remaining)}</div>
            <div className="unit">kcal</div>
          </div>
        </div>
        <p className="lead" style={{ margin: '10px 0 0', fontSize: 12 }}>
          Remaining = Goal − Consumed ({state.calorieGoal}). Burn is context only — not added to budget.
        </p>
        <div className="banner" style={{ marginTop: 10, marginBottom: 0 }}>
          Burn from {healthLabel[provider] ?? 'Apple Health (demo)'}
        </div>
        <ProgressBar
          value={consumed.protein}
          max={state.proteinGoal}
          label="Protein"
          protein
          right={`${Math.round(consumed.protein)}g / ${state.proteinGoal}g`}
        />
        <ProgressBar
          value={consumed.kcal}
          max={state.calorieGoal}
          label="Calories vs goal"
          right={`${Math.round(consumed.kcal)} / ${state.calorieGoal}`}
        />
      </div>

      <div className="btn-row" style={{ marginTop: 0 }}>
        <button className="btn btn-primary" type="button" onClick={() => setScreen('log-picker')}>
          Log
        </button>
      </div>
      <div className="btn-row">
        <button className="btn btn-accent" type="button" onClick={() => setScreen('still-order')}>
          What can I still order
        </button>
      </div>
      <div className="btn-row">
        <button className="btn btn-secondary" type="button" onClick={() => setScreen('rewards')}>
          Rewards
        </button>
        <button className="btn btn-secondary" type="button" onClick={() => setScreen('log-home')}>
          Log home
        </button>
      </div>

      <h3 style={{ marginTop: 16 }}>Today’s log</h3>
      {state.logs.length === 0 && (
        <div className="empty">No food logged yet. Tap Log to add a delivery or home meal.</div>
      )}
      {[...state.logs].reverse().map((log) => (
        <div className="list-item" key={log.id} style={{ cursor: 'default' }}>
          <div className="emoji">{log.source === 'delivery' ? '🛵' : '🏠'}</div>
          <div className="meta">
            <div className="title">{log.name}</div>
            <div className="sub">
              {log.platform ?? 'Home'} {log.portionLabel ? `· ${log.portionLabel}` : ''}
            </div>
            <div className="macros">
              {Math.round(log.macros.kcal)} kcal · {Math.round(log.macros.protein)}g protein{' '}
              <ConfidenceTag value={log.confidence} />
            </div>
          </div>
        </div>
      ))}

      <p className="disclaimer">Estimates only · not medical advice · FitLoop prototype</p>
    </div>
  );
}

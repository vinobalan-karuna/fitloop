import { useApp } from '../store/AppContext';

export function Settings() {
  const { state, resetAll, update } = useApp();

  const label =
    state.healthProvider === 'apple'
      ? 'Apple Health · connected (demo)'
      : state.healthProvider === 'samsung'
        ? 'Samsung Health · connected (demo)'
        : state.healthProvider === 'health_connect'
          ? 'Health Connect · connected (demo)'
          : state.healthProvider === 'demo'
            ? 'Demo data mode'
            : 'Not connected';

  return (
    <div>
      <h2>Settings</h2>
      <p className="lead">Health status & trust notes.</p>

      <div className="card">
        <h3>Health</h3>
        <p style={{ margin: '0 0 8px', fontWeight: 600 }}>{label}</p>
        <p className="lead" style={{ marginBottom: 8 }}>
          Burned {state.burnedKcal} kcal · {state.steps.toLocaleString('en-IN')} steps
        </p>
        <div className="chip-row">
          <button className="chip" type="button" onClick={() => update({ healthProvider: 'apple', burnedKcal: 410 })}>
            Apple
          </button>
          <button className="chip" type="button" onClick={() => update({ healthProvider: 'health_connect', burnedKcal: 395 })}>
            Health Connect
          </button>
          <button className="chip" type="button" onClick={() => update({ healthProvider: 'samsung', burnedKcal: 440 })}>
            Samsung
          </button>
          <button className="chip" type="button" onClick={() => update({ healthProvider: 'demo', burnedKcal: 420 })}>
            Demo
          </button>
        </div>
      </div>

      <div className="card soft">
        <h3>Preferences</h3>
        <button
          className={`choice ${state.shareMealsTip ? 'active' : ''}`}
          type="button"
          onClick={() => update({ shareMealsTip: !state.shareMealsTip })}
        >
          <div className="t">Share-meals tips</div>
          <div className="d">{state.shareMealsTip ? 'On' : 'Off'} — portion nudges on delivery</div>
        </button>
      </div>

      <div className="card">
        <h3>Disclaimer</h3>
        <p className="lead" style={{ marginBottom: 0 }}>
          All nutrition values are estimates (platform / user entry). FitLoop is not medical advice and does
          not diagnose or treat disease. Burn from Health apps can be noisy — v1 does not add burn into your
          eat budget.
        </p>
      </div>

      <button
        className="btn btn-secondary"
        type="button"
        onClick={() => {
          if (window.confirm('Reset prototype state and replay onboarding?')) resetAll();
        }}
      >
        Reset demo / replay onboarding
      </button>
    </div>
  );
}

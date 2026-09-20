import { useApp } from '../store/AppContext';

export function Activity() {
  const { state, update } = useApp();
  const provider =
    state.healthProvider === 'apple'
      ? 'Apple Health'
      : state.healthProvider === 'samsung'
        ? 'Samsung Health'
        : state.healthProvider === 'health_connect'
          ? 'Health Connect'
          : 'Demo Health';

  const refresh = () => {
    update({
      burnedKcal: state.burnedKcal + 15 + Math.floor(Math.random() * 40),
      steps: state.steps + 200 + Math.floor(Math.random() * 800),
    });
  };

  return (
    <div>
      <div className="header-row">
        <div>
          <h2>Activity</h2>
          <p className="lead" style={{ marginBottom: 0 }}>Synced from {provider} (read-only demo)</p>
        </div>
      </div>

      <div className="banner">We don’t invent a step counter — this mirrors your device Health.</div>

      <div className="card">
        <div className="grid-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="stat burned">
            <div className="label">Active kcal</div>
            <div className="value">{state.burnedKcal}</div>
            <div className="unit">burned today</div>
          </div>
          <div className="stat remain">
            <div className="label">Steps</div>
            <div className="value">{state.steps.toLocaleString('en-IN')}</div>
            <div className="unit">today</div>
          </div>
        </div>
      </div>

      <div className="card soft">
        <h3>Workouts (demo)</h3>
        <div className="list-item" style={{ cursor: 'default' }}>
          <div className="emoji">🚶</div>
          <div className="meta">
            <div className="title">Morning walk</div>
            <div className="sub">32 min · ~180 kcal</div>
          </div>
        </div>
        <div className="list-item" style={{ cursor: 'default' }}>
          <div className="emoji">🏋️</div>
          <div className="meta">
            <div className="title">Bodyweight circuit</div>
            <div className="sub">18 min · ~140 kcal</div>
          </div>
        </div>
      </div>

      <button className="btn btn-secondary" type="button" onClick={refresh}>
        Simulate Health sync refresh
      </button>
      <p className="disclaimer">Burn shown for context on Today. Not added to eat budget in v1.</p>
    </div>
  );
}

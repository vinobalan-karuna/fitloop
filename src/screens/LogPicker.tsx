import { useApp } from '../store/AppContext';

export function LogPicker() {
  const { setScreen } = useApp();
  return (
    <div>
      <div className="header-row">
        <button className="btn btn-ghost" type="button" onClick={() => setScreen('today')}>← Back</button>
      </div>
      <h2>Log food</h2>
      <p className="lead">Delivery estimates or home / local components.</p>
      <button className="choice" type="button" onClick={() => setScreen('log-delivery')}>
        <div className="t">🛵 Delivery order</div>
        <div className="d">Swiggy / Zomato demo dishes · confirm + portion</div>
      </button>
      <button className="choice" type="button" onClick={() => setScreen('log-home')}>
        <div className="t">🏠 Home / local</div>
        <div className="d">Roti, rice, dal, sabzi, oil/ghee, chai…</div>
      </button>
    </div>
  );
}

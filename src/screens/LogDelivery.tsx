import { DEMO_DISHES } from '../data/dishes';
import { ConfidenceTag } from '../components/ConfidenceTag';
import { useApp } from '../store/AppContext';
import type { Dish } from '../types';

export function LogDelivery() {
  const { setScreen, setPending, state } = useApp();

  const pick = (dish: Dish) => {
    setPending({
      dish,
      fraction: 1,
      portionLabel: 'ate all',
      adjusted: false,
    });
    setScreen('confirm-delivery');
  };

  return (
    <div>
      <div className="header-row">
        <button className="btn btn-ghost" type="button" onClick={() => setScreen('today')}>← Back</button>
        <span className="coins">Delivery</span>
      </div>
      <h2>Log delivery</h2>
      <p className="lead">Pick a demo dish. Macros are platform estimates — confirm before commit.</p>
      {state.shareMealsTip && (
        <div className="banner warn">Tip: you share meals often — you’ll get a portion adjuster next.</div>
      )}
      {DEMO_DISHES.map((d) => (
        <button key={d.id} className="list-item" type="button" onClick={() => pick(d)}>
          <div className="emoji">{d.emoji}</div>
          <div className="meta">
            <div className="title">{d.name}</div>
            <div className="sub">{d.restaurant} · {d.platform}</div>
            <div className="macros">
              {d.macros.kcal} kcal · {d.macros.protein}g P · {d.macros.carbs}g C · {d.macros.fat}g F{' '}
              <ConfidenceTag value="platform estimate" />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

import { useApp } from '../store/AppContext';

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
// stub: today is Sunday (index 6) per user_info
const weekStatus = ['on', 'on', 'miss', 'on', 'on', 'on', ''] as const;

export function Goals() {
  const { state, update, consumed } = useApp();

  return (
    <div>
      <h2>Goals</h2>
      <p className="lead">Edit daily targets. Week stub for pitch storytelling.</p>

      <div className="card">
        <div className="field">
          <label>Calorie goal (kcal)</label>
          <input
            type="number"
            value={state.calorieGoal}
            onChange={(e) => update({ calorieGoal: Number(e.target.value) || 0 })}
          />
        </div>
        <div className="field">
          <label>Protein goal (g)</label>
          <input
            type="number"
            value={state.proteinGoal}
            onChange={(e) => update({ proteinGoal: Number(e.target.value) || 0 })}
          />
        </div>
        <div className="field">
          <label>Primary goal</label>
          <select
            value={state.goalType}
            onChange={(e) => update({ goalType: e.target.value as typeof state.goalType })}
          >
            <option value="lose">Lose weight</option>
            <option value="protein">Hit protein</option>
            <option value="maintain">Maintain</option>
          </select>
        </div>
      </div>

      <div className="card soft">
        <h3>This week (stub)</h3>
        <p className="lead" style={{ marginBottom: 8 }}>
          On-track days earn coins. Today so far: {Math.round(consumed.kcal)} / {state.calorieGoal} kcal
        </p>
        <div className="week-stub">
          {days.map((d, i) => (
            <div key={`${d}-${i}`} className={weekStatus[i]}>
              {d}
            </div>
          ))}
        </div>
        <p className="lead" style={{ marginTop: 10, marginBottom: 0, fontSize: 12 }}>
          Green = on track · Pink = miss · Empty = today in progress
        </p>
      </div>
    </div>
  );
}

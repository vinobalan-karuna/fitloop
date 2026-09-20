import { useApp } from '../store/AppContext';
import type { GoalType, HealthProvider } from '../types';

const defaults: Record<GoalType, { cal: number; protein: number }> = {
  lose: { cal: 1800, protein: 120 },
  protein: { cal: 2200, protein: 150 },
  maintain: { cal: 2100, protein: 100 },
};

export function Onboarding() {
  const { state, update, setScreen } = useApp();
  const step = state.onboardingStep;

  const next = () => update({ onboardingStep: step + 1 });
  const back = () => update({ onboardingStep: Math.max(0, step - 1) });

  const finish = () => {
    update({ onboarded: true, onboardingStep: 0 });
    setScreen('today');
  };

  const setGoal = (g: GoalType) => {
    const d = defaults[g];
    update({ goalType: g, calorieGoal: d.cal, proteinGoal: d.protein });
  };

  const connect = (p: HealthProvider) => {
    update({
      healthProvider: p,
      burnedKcal: p === 'demo' ? 420 : 385 + Math.floor(Math.random() * 80),
      steps: p === 'demo' ? 6842 : 5200 + Math.floor(Math.random() * 4000),
    });
    next();
  };

  return (
    <div>
      <div className="brand">
        <div className="brand-mark">FL</div>
        <div>
          <h1>FitLoop</h1>
          <p>Beside Swiggy · beside your watch</p>
        </div>
      </div>
      <div className="step-dots">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={i === step ? 'on' : ''} />
        ))}
      </div>

      {step === 0 && (
        <>
          <div className="hero">
            <h2>Close your food day with the activity you already track</h2>
            <p className="lead" style={{ marginBottom: 0 }}>
              Log delivery + home with honest portions. See consumed vs burned vs goal.
              Earn coins for on-track days — not “healthy” tags.
            </p>
          </div>
          <div className="card soft">
            <h3>Not another discovery app</h3>
            <p className="lead" style={{ marginBottom: 0 }}>
              Order on Swiggy/Zomato. FitLoop is the ledger that makes the day add up.
            </p>
          </div>
          <button className="btn btn-primary" type="button" onClick={next}>
            Get started
          </button>
        </>
      )}

      {step === 1 && (
        <>
          <h2>Connect Health</h2>
          <p className="lead">Pull burn & steps from your phone — we don’t invent a tracker.</p>
          <button className="choice" type="button" onClick={() => connect('apple')}>
            <div className="t">🍎 Apple Health</div>
            <div className="d">Active energy + steps (demo connect)</div>
          </button>
          <button className="choice" type="button" onClick={() => connect('health_connect')}>
            <div className="t">💚 Health Connect</div>
            <div className="d">Android health sync (demo)</div>
          </button>
          <button className="choice" type="button" onClick={() => connect('samsung')}>
            <div className="t">⌚ Samsung Health</div>
            <div className="d">Watch burn (demo)</div>
          </button>
          <button className="btn btn-secondary" type="button" onClick={() => connect('demo')} style={{ marginTop: 8 }}>
            Use demo data
          </button>
          <button className="btn btn-ghost" type="button" onClick={back}>Back</button>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Primary goal</h2>
          <p className="lead">We’ll set smart calorie & protein defaults.</p>
          {(
            [
              ['lose', 'Lose weight', 'Slight deficit, higher protein'],
              ['protein', 'Hit protein', 'Build / retain muscle while eating out'],
              ['maintain', 'Maintain', 'Stay steady without quitting delivery'],
            ] as [GoalType, string, string][]
          ).map(([id, t, d]) => (
            <button
              key={id}
              className={`choice ${state.goalType === id ? 'active' : ''}`}
              type="button"
              onClick={() => setGoal(id)}
            >
              <div className="t">{t}</div>
              <div className="d">{d}</div>
            </button>
          ))}
          <div className="btn-row">
            <button className="btn btn-secondary" type="button" onClick={back}>Back</button>
            <button className="btn btn-primary" type="button" onClick={next}>Continue</button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h2>Daily targets</h2>
          <p className="lead">Edit anytime in Goals.</p>
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
          <div className="btn-row">
            <button className="btn btn-secondary" type="button" onClick={back}>Back</button>
            <button className="btn btn-primary" type="button" onClick={next}>Continue</button>
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <h2>Share meals?</h2>
          <p className="lead">We’ll nudge portion adjusters when you log delivery (biryani split, spoons…).</p>
          <button
            className={`choice ${state.shareMealsTip ? 'active' : ''}`}
            type="button"
            onClick={() => update({ shareMealsTip: true })}
          >
            <div className="t">Yes — I often share</div>
            <div className="d">Show portion tips on delivery logs</div>
          </button>
          <button
            className={`choice ${!state.shareMealsTip ? 'active' : ''}`}
            type="button"
            onClick={() => update({ shareMealsTip: false })}
          >
            <div className="t">Skip for now</div>
            <div className="d">You can still adjust portions anytime</div>
          </button>
          <div className="btn-row">
            <button className="btn btn-secondary" type="button" onClick={back}>Back</button>
            <button className="btn btn-primary" type="button" onClick={finish}>Go to Today</button>
          </div>
        </>
      )}
    </div>
  );
}

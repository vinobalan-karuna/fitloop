import { BottomNav } from './BottomNav';
import { useApp } from '../store/AppContext';

export function PhoneShell({ children }: { children: React.ReactNode }) {
  const { screen } = useApp();
  const noNav = screen === 'onboarding' || screen === 'portion' || screen === 'confirm-delivery'
    || screen === 'log-delivery' || screen === 'log-home' || screen === 'still-order' || screen === 'log-picker';

  const now = new Date();
  const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="app-frame">
      <div className="phone">
        <div className="status-bar">
          <span>{time}</span>
          <span>FitLoop · Demo</span>
          <span>▮▮▮</span>
        </div>
        <div className={`screen ${noNav ? 'no-nav' : ''} slide-in`}>{children}</div>
        {!noNav && <BottomNav />}
      </div>
    </div>
  );
}

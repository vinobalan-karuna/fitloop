import { PhoneShell } from './components/PhoneShell';
import { AppProvider, useApp } from './store/AppContext';
import { Onboarding } from './screens/Onboarding';
import { Today } from './screens/Today';
import { LogDelivery } from './screens/LogDelivery';
import { LogPicker } from './screens/LogPicker';
import { ConfirmDelivery } from './screens/ConfirmDelivery';
import { PortionAdjuster } from './screens/PortionAdjuster';
import { LogHome } from './screens/LogHome';
import { Activity } from './screens/Activity';
import { Goals } from './screens/Goals';
import { StillOrder } from './screens/StillOrder';
import { Rewards } from './screens/Rewards';
import { Settings } from './screens/Settings';

function Router() {
  const { screen } = useApp();
  switch (screen) {
    case 'onboarding':
      return <Onboarding />;
    case 'today':
      return <Today />;
    case 'log-picker':
      return <LogPicker />;
    case 'log-delivery':
      return <LogDelivery />;
    case 'confirm-delivery':
      return <ConfirmDelivery />;
    case 'portion':
      return <PortionAdjuster />;
    case 'log-home':
      return <LogHome />;
    case 'activity':
      return <Activity />;
    case 'goals':
      return <Goals />;
    case 'still-order':
      return <StillOrder />;
    case 'rewards':
      return <Rewards />;
    case 'settings':
      return <Settings />;
    default:
      return <Today />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <PhoneShell>
        <Router />
      </PhoneShell>
    </AppProvider>
  );
}

import useAuth from './src/context/AuthContext';
import { AuthProvider } from './src/context/AuthProvider';
import {
  AuthNavigation,
  DashBoardNavigation,
} from './src/navigation/navigationStack';

function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

function Navigation() {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <DashBoardNavigation /> : <AuthNavigation />;
}

export default App;

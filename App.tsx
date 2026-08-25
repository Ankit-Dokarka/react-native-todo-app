import { AuthProvider } from './src/context/AuthProvider';
import { Navigation } from './src/navigation/authStack';

function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

export default App;

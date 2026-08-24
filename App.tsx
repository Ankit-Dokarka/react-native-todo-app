import { StyleSheet, View } from 'react-native';
import { AuthScreen } from './src/screens/AuthScreen';

function App() {
  return (
    <View style={styles.screen}>
      <AuthScreen />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    padding: 15,
    alignItems: 'center',
    gap: 15,
  },
});

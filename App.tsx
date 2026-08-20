import { StyleSheet, View } from 'react-native';
import Header from './src/components/Header';

function App() {
  return (
    <View style={styles.screen}>
      <Header />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 15,
    alignItems: 'center',
  },
});

export default App;

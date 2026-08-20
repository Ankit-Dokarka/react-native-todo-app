import { StyleSheet, View } from 'react-native';
import Header from './src/components/Header';
import TaskInput from './src/components/TaskInput';

function App() {
  return (
    <View style={styles.screen}>
      <Header />
      <TaskInput />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    padding: 15,
    alignItems: 'center',
    gap: 15,
  },
});

export default App;

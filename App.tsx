import { StyleSheet, View } from 'react-native';
import Header from './src/components/Header';
import TaskInput from './src/components/TaskInput';
import Filters from './src/components/Filters';
import TaskList from './src/components/TaskList';
import { useState } from 'react';
import uuid from 'react-native-uuid';

type Tasks = {
  id: string;
  title: string;
  date: string;
  isCompleted: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Tasks[]>([]);

  const addTask = (title: string) => {
    if (title.trim() === '') return;
    const newTask = {
      id: uuid.v4() as string,
      title: title,
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(prevTasks => {
      return prevTasks.map(task => {
        if (task.id === id) {
          return {
            ...task,
            isCompleted: !task.isCompleted,
          };
        }
        return task;
      });
    });
  };

  return (
    <View style={styles.screen}>
      <Header />
      <TaskInput addTask={addTask} />
      <Filters />
      <TaskList tasks={tasks} toggleTask={toggleTask} />
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

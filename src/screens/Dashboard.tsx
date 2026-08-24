import { StyleSheet, View, Keyboard } from 'react-native';
import Header from '../components/Header';
import TaskInput from '../components/TaskInput';
import Filters from '../components/Filters';
import TaskList from '../components/TaskList';
import { useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV();
const STORAGE_KEY = 'tasks';

type Tasks = {
  id: string;
  title: string;
  date: string;
  isCompleted: boolean;
};

export const DashBoard = () => {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [activeTab, setActiveTab] = useState<'All' | 'Pending' | 'Completed'>(
    'All',
  );
  const [editingTask, setEditingTask] = useState<Tasks | null>(null);

  useEffect(() => {
    const savedTasks = storage.getString(STORAGE_KEY);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    storage.set(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

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
    Keyboard.dismiss();
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

  const handleEditClick = (task: Tasks) => {
    setEditingTask(task);
  };

  const updateTask = (title: string) => {
    if (!editingTask || title.trim() === '') return;
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === editingTask.id ? { ...task, title: title } : task,
      ),
    );
    setEditingTask(null);
    Keyboard.dismiss();
  };

  const cancelEdit = () => {
    setEditingTask(null);
    Keyboard.dismiss();
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  return (
    <View style={styles.screen}>
      <Header deleteAllTasks={deleteAllTasks} />
      <TaskInput
        addTask={addTask}
        editingTask={editingTask}
        updateTask={updateTask}
        cancelEdit={cancelEdit}
      />
      <Filters activeTab={activeTab} setActiveTab={setActiveTab} />
      <TaskList
        tasks={tasks}
        toggleTask={toggleTask}
        activeTab={activeTab}
        onEdit={handleEditClick}
        deleteTask={deleteTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    padding: 15,
    alignItems: 'center',
    gap: 15,
  },
});

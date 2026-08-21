import { useState, useEffect } from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';

type Tasks = {
  id: string;
  title: string;
  date: string;
  isCompleted: boolean;
};

type TaskInputProps = {
  addTask: (title: string) => void;
  editingTask: Tasks | null;
  updateTask: (title: string) => void;
  cancelEdit: () => void;
};

const TaskInput = ({
  addTask,
  editingTask,
  updateTask,
  cancelEdit,
}: TaskInputProps) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (editingTask) {
      setText(editingTask.title);
    } else {
      setText('');
    }
  }, [editingTask]);

  const handlePress = () => {
    if (text.trim() === '') return;
    if (editingTask) {
      updateTask(text);
    } else {
      addTask(text);
    }
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={editingTask ? 'Edit your task...' : 'Add a new task...'}
        placeholderTextColor="#71748D"
        value={text}
        onChangeText={setText}
      />
      <Pressable style={styles.actionButton} onPress={handlePress}>
        <MaterialDesignIcons
          name={editingTask ? 'check-circle-outline' : 'plus'}
          size={30}
          color="#FF5C00"
        />
      </Pressable>
      {editingTask && (
        <Pressable style={styles.cancelButton} onPress={cancelEdit}>
          <MaterialDesignIcons name="close" size={24} color="#71748D" />
        </Pressable>
      )}
    </View>
  );
};

export default TaskInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 16,
  },
  actionButton: {
    padding: 5,
  },
  cancelButton: {
    padding: 5,
  },
});

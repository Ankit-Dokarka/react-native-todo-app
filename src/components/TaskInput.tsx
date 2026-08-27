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
        placeholder={editingTask ? 'Update your task...' : 'Add a new task...'}
        placeholderTextColor="#5E6250"
        value={text}
        onChangeText={setText}
        selectionColor="#B0522E"
      />

      {editingTask && (
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.cancelButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={cancelEdit}
          android_ripple={{
            color: 'rgba(43, 45, 38, 0.1)',
            radius: 26,
            borderless: true,
          }}
        >
          <MaterialDesignIcons name="close" size={24} color="#5E6250" />
        </Pressable>
      )}

      <Pressable
        style={({ pressed }) => [
          styles.button,
          styles.actionButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={handlePress}
        android_ripple={{
          color: 'rgba(244, 242, 233, 0.2)',
          radius: 26,
          borderless: true,
        }}
      >
        <MaterialDesignIcons
          name={editingTask ? 'check' : 'plus'}
          size={28}
          color="#F4F2E9"
        />
      </Pressable>
    </View>
  );
};

export default TaskInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#F4F2E9',
    borderWidth: 1,
    borderColor: '#A3A786',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    color: '#2B2D26',
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    height: 52,
    width: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 26,
  },
  actionButton: {
    backgroundColor: '#B0522E',
  },
  cancelButton: {
    backgroundColor: '#F4F2E9',
    borderWidth: 1,
    borderColor: '#A3A786',
  },
  buttonPressed: {
    transform: [{ scale: 0.95 }],
  },
});

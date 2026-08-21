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
        placeholderTextColor="#71748D"
        value={text}
        onChangeText={setText}
        selectionColor="#FF5C00"
      />

      {editingTask && (
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.cancelButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={cancelEdit}
          android_ripple={{ color: '#333333', radius: 26, borderless: true }}
        >
          <MaterialDesignIcons name="close" size={24} color="#A1A1A1" />
        </Pressable>
      )}

      <Pressable
        style={({ pressed }) => [
          styles.button,
          styles.actionButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={handlePress}
        android_ripple={{ color: '#FFFFFF', radius: 26, borderless: true }}
      >
        <MaterialDesignIcons
          name={editingTask ? 'check' : 'plus'}
          size={28}
          color="#FFFFFF"
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
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    color: '#FFFFFF',
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
    backgroundColor: '#FF5C00',
  },
  cancelButton: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#333333',
  },
  buttonPressed: {
    transform: [{ scale: 0.95 }],
  },
});

import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { useState } from 'react';

type TaskInputProps = {
  addTask: (task: string) => void;
};

const TaskInput = ({ addTask }: TaskInputProps) => {
  const [taskInput, setTaskInput] = useState('');
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Add a new task.."
        placeholderTextColor="#cec7c7"
        onChangeText={Text => setTaskInput(Text)}
        value={taskInput}
      />
      <Pressable
        style={styles.buttonContainer}
        onPress={() => {
          addTask(taskInput);
          setTaskInput('');
        }}
      >
        <MaterialDesignIcons name="plus" size={24} color="#fff" />
      </Pressable>
    </View>
  );
};

export default TaskInput;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#1E1E1E',
    width: '100%',
    borderRadius: 14,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  buttonContainer: {
    backgroundColor: '#FF5C00',
    padding: 10,
    borderRadius: 25,
  },
  input: {
    color: '#fff',
  },
});

import {
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputInstance,
  View,
} from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { useState, useEffect, useRef } from 'react';

type TaskInputProps = {
  addTask: (task: string) => void;
};

const TaskInput = ({ addTask }: TaskInputProps) => {
  const [taskInput, setTaskInput] = useState('');
  const inputRef = useRef<TextInputInstance>(null);
  useEffect(() => {
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
      inputRef.current?.blur();
    });

    return () => {
      keyboardDidHide.remove();
    };
  }, []);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Add a new task.."
        placeholderTextColor="#cec7c7"
        cursorColor="#FF5C00"
        onChangeText={Text => setTaskInput(Text)}
        value={taskInput}
      />
      <Pressable
        style={({ pressed }) => [
          styles.buttonContainer,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => {
          addTask(taskInput);
          setTaskInput('');
          Keyboard.dismiss();
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
  buttonPressed: {
    opacity: 0.7,
  },
  input: {
    color: '#fff',
    flex: 1,
  },
});

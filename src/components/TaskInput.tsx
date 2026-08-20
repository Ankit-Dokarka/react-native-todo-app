import { StyleSheet, TextInput, View } from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';

const TaskInput = () => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Add a new task.."
        placeholderTextColor="#757575"
      />
      <View style={styles.buttonContainer}>
        <MaterialDesignIcons name="plus" size={24} color="#" />
      </View>
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
});

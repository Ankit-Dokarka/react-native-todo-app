import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { useState } from 'react';

const TaskList = () => {
  const [completed, setCompleted] = useState(true);

  return (
    <View style={styles.taskView}>
      <View style={styles.leftSide}>
        <Pressable style={styles.checkbox}>
          <MaterialDesignIcons
            name={completed ? 'checkbox-marked' : 'checkbox-blank-outline'}
            size={24}
            color="#FF5C00"
          />
        </Pressable>

        <View style={styles.taskInfo}>
          <Text style={styles.taskTitle}>Design Homepage</Text>
          <Text style={styles.taskDate}>20 Aug 2026</Text>
        </View>
      </View>

      <Pressable style={styles.menuButton}>
        <MaterialDesignIcons name="dots-vertical" size={22} color="#71748D" />
      </Pressable>
    </View>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  taskView: {
    width: '100%',
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  checkbox: {
    marginRight: 12,
  },

  taskInfo: {
    justifyContent: 'center',
  },

  taskTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  taskDate: {
    color: '#71748D',
    fontSize: 13,
    marginTop: 4,
  },

  menuButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

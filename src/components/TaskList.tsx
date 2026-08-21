import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';

type Tasks = {
  id: string;
  title: string;
  date: string;
  isCompleted: boolean;
};
type TabName = 'All' | 'Pending' | 'Completed';
type TaskListProps = {
  tasks: Tasks[];
  toggleTask: (id: string) => void;
  activeTab: TabName;
};

const TaskList = ({ tasks, toggleTask, activeTab }: TaskListProps) => {
  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'Pending') {
      return !task.isCompleted;
    }
    if (activeTab === 'Completed') {
      return task.isCompleted;
    }
    return true;
  });

  return (
    <>
      {filteredTasks.map(task => (
        <View key={task.id} style={styles.taskView}>
          <View style={styles.leftSide}>
            <Pressable
              style={styles.checkbox}
              onPress={() => toggleTask(task.id)}
            >
              <MaterialDesignIcons
                name={
                  task.isCompleted
                    ? 'checkbox-marked'
                    : 'checkbox-blank-outline'
                }
                size={40}
                color="#FF5C00"
              />
            </Pressable>

            <View style={styles.taskInfo}>
              <View style={styles.taskTitleWrapper}>
                <Text
                  style={[
                    styles.taskTitleBase,
                    task.isCompleted ? styles.isCompletedText : null,
                  ]}
                >
                  {task.title}
                </Text>

                {task.isCompleted && <View style={styles.strikeLine} />}
              </View>

              <Text style={styles.taskDate}>{task.date}</Text>
            </View>
          </View>

          <Pressable style={styles.menuButton}>
            <MaterialDesignIcons
              name="dots-vertical"
              size={22}
              color="#71748D"
            />
          </Pressable>
        </View>
      ))}
    </>
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
  taskTitleWrapper: {
    position: 'relative',
    alignSelf: 'flex-start',
  },

  taskTitleBase: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  isCompletedText: {
    color: '#FF5C00',
  },
  strikeLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 1.5,
    backgroundColor: '#FF5C00',
    transform: [{ translateY: -0.75 }],
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

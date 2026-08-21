import {
  Pressable,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
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
  onEdit: (task: Tasks) => void;
  deleteTask: (id: string) => void;
};

const TaskList = ({
  tasks,
  toggleTask,
  activeTab,
  onEdit,
  deleteTask,
}: TaskListProps) => {
  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'Pending') return !task.isCompleted;
    if (activeTab === 'Completed') return task.isCompleted;
    return true;
  });

  const handleDelete = (item: Tasks) => {
    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${item.title}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTask(item.id),
        },
      ],
    );
  };

  const renderItem = ({ item }: { item: Tasks }) => (
    <View style={styles.taskView}>
      <View style={styles.leftSide}>
        <Pressable style={styles.checkbox} onPress={() => toggleTask(item.id)}>
          <MaterialDesignIcons
            name={
              item.isCompleted ? 'checkbox-marked' : 'checkbox-blank-outline'
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
                item.isCompleted ? styles.isCompletedText : null,
              ]}
            >
              {item.title}
            </Text>

            {item.isCompleted && <View style={styles.strikeLine} />}
          </View>

          <Text style={styles.taskDate}>{item.date}</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        {!item.isCompleted && (
          <Pressable style={styles.actionButton} onPress={() => onEdit(item)}>
            <MaterialDesignIcons
              name="pencil-outline"
              size={20}
              color="#FFFFFF"
            />
          </Pressable>
        )}
        <Pressable
          style={styles.actionButton}
          onPress={() => handleDelete(item)}
        >
          <MaterialDesignIcons
            name="trash-can-outline"
            size={20}
            color="#FF5C00"
          />
        </Pressable>
      </View>
    </View>
  );

  return (
    <FlatList
      data={filteredTasks}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.listContainer}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      ListEmptyComponent={
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>
            {activeTab === 'Pending'
              ? 'No pending tasks'
              : activeTab === 'Completed'
              ? 'No completed tasks yet.'
              : 'No tasks yet. Add one above'}
          </Text>
        </View>
      }
    />
  );
};

export default TaskList;

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
    gap: 12,
  },
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
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  actionButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  emptyView: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#71748D',
    fontSize: 16,
    textAlign: 'center',
  },
});

import {
  Pressable,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  LayoutAnimation,
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
          onPress: () => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut,
            );
            deleteTask(item.id);
          },
        },
      ],
    );
  };

  const handleToggle = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    toggleTask(id);
  };

  const renderItem = ({ item }: { item: Tasks }) => (
    <View style={styles.taskView}>
      <View style={styles.leftSide}>
        <Pressable
          style={styles.checkbox}
          onPress={() => handleToggle(item.id)}
          android_ripple={{
            color: 'rgba(62, 107, 72, 0.15)',
            borderless: true,
            radius: 24,
          }}
        >
          <MaterialDesignIcons
            name={
              item.isCompleted ? 'checkbox-marked' : 'checkbox-blank-outline'
            }
            size={32}
            color={item.isCompleted ? '#3E6B48' : '#5E6250'}
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
          <Pressable
            style={styles.actionButton}
            onPress={() => onEdit(item)}
            android_ripple={{
              color: 'rgba(43, 45, 38, 0.1)',
              borderless: true,
              radius: 24,
            }}
          >
            <MaterialDesignIcons
              name="pencil-outline"
              size={20}
              color="#5E6250"
            />
          </Pressable>
        )}
        <Pressable
          style={styles.actionButton}
          onPress={() => handleDelete(item)}
          android_ripple={{
            color: 'rgba(168, 50, 50, 0.15)',
            borderless: true,
            radius: 24,
          }}
        >
          <MaterialDesignIcons
            name="trash-can-outline"
            size={20}
            color="#A83232"
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
          <MaterialDesignIcons
            name={
              activeTab === 'Completed'
                ? 'check-circle-outline'
                : 'clipboard-list-outline'
            }
            size={64}
            color="#A3A786"
          />
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
    paddingVertical: 8,
    gap: 12,
  },
  taskView: {
    width: '100%',
    backgroundColor: '#F4F2E9',
    borderWidth: 1,
    borderColor: '#A3A786',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
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
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    marginRight: 8,
  },
  taskInfo: {
    justifyContent: 'center',
    flexShrink: 1,
  },
  taskTitleWrapper: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  taskTitleBase: {
    color: '#2B2D26',
    fontSize: 16,
    fontWeight: '600',
  },
  isCompletedText: {
    color: '#5E6250',
  },
  strikeLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 1.5,
    backgroundColor: '#3E6B48',
    transform: [{ translateY: -0.75 }],
  },
  taskDate: {
    color: '#5E6250',
    fontSize: 13,
    marginTop: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  actionButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    marginLeft: 4,
  },
  emptyView: {
    flex: 1,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  emptyText: {
    color: '#5E6250',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});

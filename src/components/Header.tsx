import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';

type HeaderProps = {
  deleteAllTasks: () => void;
};

const Header = ({ deleteAllTasks }: HeaderProps) => {
  const handleMenuPress = () => {
    Alert.alert(
      'Delete All Tasks',
      'Are you sure you want to delete all tasks? This cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: () => deleteAllTasks(),
        },
      ],
    );
  };

  return (
    <View style={styles.headingContainer}>
      <View>
        <Text style={styles.headingTitle}>Task Manager</Text>
        <Text style={styles.subHeading}>What needs to be done today?</Text>
      </View>
      <Pressable style={styles.iconContainer} onPress={handleMenuPress}>
        <MaterialDesignIcons name="dots-vertical" size={24} color="#ffffff" />
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headingContainer: {
    paddingTop: 35,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headingTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subHeading: {
    color: '#A1A1A1',
    paddingLeft: 2,
    fontSize: 15,
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderColor: '#333333',
    borderWidth: 1,
  },
});

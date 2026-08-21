import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  StatusBar,
} from 'react-native';
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
      <View style={styles.textContainer}>
        <Text style={styles.headingTitle}>Task Manager</Text>
        <Text style={styles.subHeading}>What needs to be done today?</Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.iconContainer,
          pressed && styles.iconPressed,
        ]}
        onPress={handleMenuPress}
        android_ripple={{ color: '#333333', radius: 22, borderless: true }}
      >
        <MaterialDesignIcons name="dots-vertical" size={24} color="#A1A1A1" />
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headingContainer: {
    paddingTop: (StatusBar.currentHeight || 24) + 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  textContainer: {
    flexShrink: 1,
  },
  headingTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  subHeading: {
    color: '#71748D',
    fontSize: 15,
    marginTop: 4,
    fontWeight: '500',
  },
  iconContainer: {
    height: 44,
    width: 44,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    borderColor: '#333333',
    borderWidth: 1,
  },
  iconPressed: {
    backgroundColor: '#333333',
    transform: [{ scale: 0.95 }],
  },
});

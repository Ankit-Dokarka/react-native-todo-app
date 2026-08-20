import { StyleSheet, Text, View } from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';

const Header = () => {
  return (
    <View style={styles.headingContainer}>
      <View>
        <Text style={styles.headingTitle}>Task Manager</Text>
        <Text style={styles.subHeading}>What needs to be done today?</Text>
      </View>
      <View style={styles.iconContainer}>
        <MaterialDesignIcons name="dots-vertical" size={24} color="#1A1A1A" />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headingContainer: {
    paddingTop: 35,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headingTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subHeading: {
    color: '#777575',
    paddingLeft: 2,
    fontSize: 15,
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: '#dee3e6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
});

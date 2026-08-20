import { Pressable, StyleSheet, Text, View } from 'react-native';

const Filters = () => {
  return (
    <View style={styles.filterView}>
      <Pressable style={styles.button}>
        <Text style={styles.text}>All</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.text}>Pending</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.text}>Completed</Text>
      </Pressable>
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  filterView: {
    width: '70%',
    flexDirection: 'row',
    gap: 16,
    alignSelf: 'flex-start',
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FF5C00',
    padding: 15,
    borderRadius: 8,
  },
});

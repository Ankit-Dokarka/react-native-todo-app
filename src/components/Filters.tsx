import { Pressable, StyleSheet, Text, View } from 'react-native';

type TabName = 'All' | 'Pending' | 'Completed';

type FiltersProps = {
  activeTab: TabName;
  setActiveTab: (tab: TabName) => void;
};

const Filters = ({ activeTab, setActiveTab }: FiltersProps) => {
  return (
    <View style={styles.filterView}>
      <Pressable
        style={({ pressed }) => [
          styles.buttonBase,
          activeTab === 'All' ? styles.buttonActive : null,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => setActiveTab('All')}
      >
        <Text style={styles.text}>All</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.buttonBase,
          activeTab === 'Pending' ? styles.buttonActive : null,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => setActiveTab('Pending')}
      >
        <Text style={styles.text}>Pending</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.buttonBase,
          activeTab === 'Completed' ? styles.buttonActive : null,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => setActiveTab('Completed')}
      >
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
  buttonBase: {
    padding: 15,
    borderRadius: 8,
  },
  buttonActive: {
    backgroundColor: '#FF5C00',
  },
  buttonPressed: {
    opacity: 0.7,
  },
});

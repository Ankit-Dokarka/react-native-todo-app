import {
  Pressable,
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
} from 'react-native';

type TabName = 'All' | 'Pending' | 'Completed';

type FiltersProps = {
  activeTab: TabName;
  setActiveTab: (tab: TabName) => void;
};

const Filters = ({ activeTab, setActiveTab }: FiltersProps) => {
  const handlePress = (tab: TabName) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveTab(tab);
  };

  const tabs: TabName[] = ['All', 'Pending', 'Completed'];

  return (
    <View style={styles.filterView}>
      {tabs.map(tab => (
        <Pressable
          key={tab}
          style={({ pressed }) => [
            styles.buttonBase,
            activeTab === tab && styles.buttonActive,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => handlePress(tab)}
          android_ripple={{
            color: 'rgba(255, 255, 255, 0.1)',
            borderless: true,
          }}
        >
          <Text style={[styles.text, activeTab === tab && styles.textActive]}>
            {tab}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  filterView: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 6,
    borderWidth: 1,
    borderColor: '#262626',
  },
  buttonBase: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  buttonActive: {},
  buttonPressed: {
    opacity: 0.8,
  },
  text: {
    color: '#A1A1A1',
    fontWeight: '700',
    fontSize: 14,
  },
  textActive: {
    color: '#FF5C00',
  },
});

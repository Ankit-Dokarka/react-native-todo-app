import { StyleSheet, Text, View, Pressable, StatusBar } from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { useState } from 'react';
import useAuth from '../context/AuthContext';

type HeaderProps = {
  deleteAllTasks: () => void;
};

const Header = ({ deleteAllTasks }: HeaderProps) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { logout } = useAuth();

  const handleDeleteAll = () => {
    setMenuVisible(false);
    deleteAllTasks();
  };

  const handleLogout = () => {
    setMenuVisible(false);
    logout();
  };

  return (
    <View style={styles.headingContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.headingTitle}>Task Manager</Text>
        <Text style={styles.subHeading}>What needs to be done today?</Text>
      </View>

      <View>
        <Pressable
          style={({ pressed }) => [
            styles.iconContainer,
            pressed && styles.iconPressed,
          ]}
          onPress={() => setMenuVisible(prev => !prev)}
          android_ripple={{
            color: '#333333',
            radius: 22,
            borderless: true,
          }}
        >
          <MaterialDesignIcons name="dots-vertical" size={24} color="#A1A1A1" />
        </Pressable>

        {menuVisible && (
          <View style={styles.menuPanel}>
            <Pressable style={styles.menuItem} onPress={handleDeleteAll}>
              <MaterialDesignIcons
                name="delete-outline"
                size={20}
                color="#FF5C00"
              />

              <Text style={styles.menuText}>Delete All Tasks</Text>
            </Pressable>

            <Pressable style={styles.menuItem} onPress={handleLogout}>
              <MaterialDesignIcons name="logout" size={20} color="#FF5C00" />

              <Text style={styles.menuText}>Logout</Text>
            </Pressable>
          </View>
        )}
      </View>
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

  menuPanel: {
    position: 'absolute',
    top: 52,
    right: 0,
    width: 190,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333333',
    paddingVertical: 6,
    zIndex: 100,
    elevation: 8,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },

  menuText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

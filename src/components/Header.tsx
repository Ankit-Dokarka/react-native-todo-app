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
            color: 'rgba(43, 45, 38, 0.1)',
            radius: 22,
            borderless: true,
          }}
        >
          <MaterialDesignIcons name="dots-vertical" size={24} color="#5E6250" />
        </Pressable>

        {menuVisible && (
          <View style={styles.menuPanel}>
            <Pressable style={styles.menuItem} onPress={handleDeleteAll}>
              <MaterialDesignIcons
                name="delete-outline"
                size={20}
                color="#A83232"
              />

              <Text style={styles.menuText}>Delete All Tasks</Text>
            </Pressable>

            <Pressable style={styles.menuItem} onPress={handleLogout}>
              <MaterialDesignIcons name="logout" size={20} color="#A83232" />

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
    color: '#2B2D26',
    letterSpacing: -1,
  },

  subHeading: {
    color: '#5E6250',
    fontSize: 15,
    marginTop: 4,
    fontWeight: '500',
  },

  iconContainer: {
    height: 44,
    width: 44,
    backgroundColor: '#F4F2E9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    borderColor: '#A3A786',
    borderWidth: 1,
  },

  iconPressed: {
    backgroundColor: '#D8DBC2',
    transform: [{ scale: 0.95 }],
  },

  menuPanel: {
    position: 'absolute',
    top: 52,
    right: 0,
    width: 190,
    backgroundColor: '#F4F2E9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A3A786',
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
    color: '#2B2D26',
    fontSize: 14,
    fontWeight: '600',
  },
});

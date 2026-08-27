import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import useAuth from '../context/AuthContext';

export const ProfileScreen = () => {
  const { user } = useAuth();
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.profileContainer}>
        <Image
          style={styles.image}
          source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
        />
        <Pressable style={styles.editAvatarBtn}>
          <MaterialDesignIcons name="camera" size={18} color="#F4F2E9" />
        </Pressable>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.labelText}>FULL NAME</Text>
          <View style={styles.inputWrapper}>
            <MaterialDesignIcons
              name="account-outline"
              size={20}
              color="#B0522E"
              style={styles.inputIcon}
            />
            <TextInput
              value={user?.name}
              style={styles.inputs}
              cursorColor="#B0522E"
              selectionColor="#B0522E"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.labelText}>EMAIL ADDRESS</Text>
          <View style={[styles.inputWrapper, styles.disabledWrapper]}>
            <MaterialDesignIcons
              name="email-outline"
              size={20}
              color="#8B8E76"
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.inputs, styles.disabledText]}
              editable={false}
              value={user?.email}
            />
            <MaterialDesignIcons
              name="lock"
              size={16}
              color="#8B8E76"
              style={styles.lockIcon}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.labelText}>NEW PASSWORD</Text>
          <View style={styles.inputWrapper}>
            <MaterialDesignIcons
              name="lock-outline"
              size={20}
              color="#B0522E"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.inputs}
              secureTextEntry
              cursorColor="#B0522E"
              selectionColor="#B0522E"
            />
          </View>
        </View>
      </View>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#C7CBAC',
    alignItems: 'center',
    paddingTop: (StatusBar.currentHeight || 24) + 60,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  profileContainer: {
    position: 'relative',
    marginBottom: 40,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#A3A786',
    backgroundColor: '#F4F2E9',
    shadowColor: '#2B2D26',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#B0522E',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#C7CBAC',
    elevation: 6,
    shadowColor: '#2B2D26',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#F4F2E9',
    borderRadius: 24,
    padding: 24,
    gap: 20,
    shadowColor: '#2B2D26',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E0E2C8',
  },
  inputGroup: {
    gap: 8,
  },
  labelText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#5E6250',
    letterSpacing: 1,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6E8D3',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
    borderWidth: 1,
    borderColor: '#C7CBAC',
  },
  disabledWrapper: {
    backgroundColor: '#EDEFE0',
    borderColor: '#E0E2C8',
  },
  inputIcon: {
    marginRight: 12,
  },
  inputs: {
    flex: 1,
    color: '#2B2D26',
    fontSize: 15,
    fontWeight: '600',
    padding: 0,
  },
  disabledText: {
    color: '#8B8E76',
  },
  lockIcon: {
    marginLeft: 8,
  },
  button: {
    width: '100%',
    backgroundColor: '#B0522E',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    elevation: 4,
    shadowColor: '#B0522E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonText: {
    color: '#F4F2E9',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 16,
  },
});

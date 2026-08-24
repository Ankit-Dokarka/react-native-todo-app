import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DashBoard } from "../screens/Dashboard";
import { AuthScreen } from "../screens/AuthScreen";
import { createStaticNavigation } from "@react-navigation/native";


const authStack = createNativeStackNavigator({
  initialRouteName: 'Auth',

  screens: {
    DashBoard: {
      screen: DashBoard,
      options: {
        headerShown: false,
      },
    },

    Auth: {
      screen: AuthScreen,
      options: {
        headerShown: false,
      },
    },
  },
});

export const Navigation = createStaticNavigation(authStack)
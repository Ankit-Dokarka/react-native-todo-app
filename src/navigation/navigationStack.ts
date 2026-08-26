import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DashBoard } from "../screens/Dashboard";
import { AuthScreen } from "../screens/AuthScreen";
import { createStaticNavigation } from "@react-navigation/native";


const authStack = createNativeStackNavigator({
  screens: {
    Auth: {
      screen: AuthScreen,
      options: {
        headerShown: false,
      },
    },
  },
});
const dashBoardStack = createNativeStackNavigator({
  screens:{
     DashBoard: {
      screen: DashBoard,
      options: {
        headerShown: false,
      },
    },
  }
})

export const AuthNavigation = createStaticNavigation(authStack)

export const DashBoardNavigation = createStaticNavigation(dashBoardStack)
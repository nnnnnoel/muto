/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React, { Fragment } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from "react-native";
import { createStackNavigator } from "react-navigation";
import { createSwitchNavigator } from "react-navigation";
import { createAppContainer } from "react-navigation";
import { Provider } from "mobx-react";
import SignCheckScreen from "./src/screens/SignCheckScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpPhScreen from "./src/screens/SignUpPhScreen";
import SignUpCodeScreen from "./src/screens/SignUpCodeScreen";
import SignUpPwScreen from "./src/screens/SignUpPwScreen";
import SignUpRPwScreen from "./src/screens/SignUpRPwScreen";
import SplashScreen from "./src/screens/SplashScreen";
import stores from "./src/stores";
import MainScreen from "./src/screens/MainScreen";
import MainWeekScreen from "./src/screens/MainWeekScreen";
import MainListScreen from "./src/screens/MainListScreen";
import CreateNoteScreen from "./src/screens/CreateNoteScreen";
import CreateNoteDateScreen from "./src/screens/CreateNoteDateScreen";
import CreateNoteCategoryScreen from "./src/screens/CreateNoteCategoryScreen";
import CardScreen from "./src/screens/CardScreen";
import CreateGroupScreen from "./src/screens/CreateGroupScreen";
import CreateGroupCodeScreen from "./src/screens/CreateGroupCodeScreen";
import JoinGroupScreen from "./src/screens/JoinGroupScreen";

const App = () => {
  return (
    <Provider {...stores}>
      <AppContainer />
    </Provider>
  );
};

const AuthStack = createStackNavigator({
  SignCheck: { screen: SignCheckScreen },
  SignIn: { screen: SignInScreen },
  SignUpPh: { screen: SignUpPhScreen },
  SignUpCode: { screen: SignUpCodeScreen },
  SignUpPw: { screen: SignUpPwScreen },
  SignUpRPw: { screen: SignUpRPwScreen }
});

const MainStack = createStackNavigator({
  Main: { screen: MainScreen },
  MainWeek: { screen: MainWeekScreen },
  MainList: { screen: MainListScreen },
  CreateNote: { screen: CreateNoteScreen },
  CreateNoteDate: { screen: CreateNoteDateScreen },
  CreateNoteCategory: { screen: CreateNoteCategoryScreen },
  Card: { screen: CardScreen },
  CreateGroup: { screen: CreateGroupScreen },
  CreateGroupCode: { screen: CreateGroupCodeScreen },
  JoinGroup: { screen: JoinGroupScreen }
});

const MainSwitch = createSwitchNavigator({
  Splash: { screen: SplashScreen },
  AuthStack,
  MainStack
});

const AppContainer = createAppContainer(MainSwitch);

export default App;

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import { AppDrawerNavigator } from './components/AppDrawerNavigator';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

export default class App extends React.Component{
  render() {
    return (
      <AppContainer />
    );
  }
}

const SwitchNavigator = createSwitchNavigator({
  LoginScreen: {screen:LoginScreen},
  Drawer: {screen: AppDrawerNavigator}
});

const AppContainer = createAppContainer(SwitchNavigator);
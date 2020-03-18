import React from 'react'
import {View, Text} from 'react-native'
import Home from './src/screen/Home'
import LoaderScreen from './src/screen/LoaderScreen'
import LoginScreen from './src/screen/LoginScreen'
import SignUp from './src/screen/SignUp'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

const SwitchNavigator = createSwitchNavigator(
  {
    Loading: LoaderScreen,
    SignUp: SignUp,
    Login: LoginScreen,
    Home: Home
  },
  {
    initialRouteName: 'Loading',
    headerMode: 'none'
  }
)

const App = createAppContainer(SwitchNavigator);
export default App
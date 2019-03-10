import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';
import firebase from 'firebase';

import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import DonateScreen from './screens/DonateScreen';
import RecieveScreen from './screens/RecieveScreen';

export default class App extends React.Component {
  
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyCVmwjEby0vZR3m8XMQGHVh2E_0ZETcEHQ",
      authDomain: "feed-the-needy-ce21f.firebaseapp.com",
      databaseURL: "https://feed-the-needy-ce21f.firebaseio.com",
      projectId: "feed-the-needy-ce21f",
      storageBucket: "feed-the-needy-ce21f.appspot.com",
      messagingSenderId: "847952958679"
    };
    firebase.initializeApp(config);
  }

  render() {
    const tabOptions = {    
      tabBarOptions: {
          activeTintColor:'#fff',
          inactiveTintColor:'rgba(255,255,255,0.5)',
          style:{
              backgroundColor:'rgba(0,0,0,1)',
              borderTopWidth:1,
              borderTopColor:'#D3D3D3'
          },
          indicatorStyle: {
              backgroundColor: 'red'
          },
          labelStyle: {
              fontSize: 18,
              paddingBottom: 10,
          }
      },
  }
  
    const MainNavigator = createBottomTabNavigator({
      log: {screen: LoginScreen, },
      sign: {screen: SignUpScreen},
      main: {                                               //Nesting TabNavigator
        screen: createBottomTabNavigator({
          Donate: {screen: DonateScreen, navigationOptions: { title: 'Add Hunger Spot' }},
          Recieve: {screen: RecieveScreen, navigationOptions: { title: 'View Hunger Spots' }}
          }, tabOptions)
        }
      }
    , {
    navigationOptions: {
        tabBarVisible: false,
        headerLeft: null
      },
      lazy: true
    });

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator/> 
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
  },
});

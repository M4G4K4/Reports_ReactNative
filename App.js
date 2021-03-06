import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, Alert} from 'react-native';
import firebase from '@react-native-firebase/app';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';
import messaging, {AuthorizationStatus} from '@react-native-firebase/messaging';
import Home from './pages/Home';
import Register from './pages/Register';
import Maps from './pages/Map';
import Login from './pages/Login';
import Notes from './pages/Notes';
import AddNote from './pages/AddNote';
import EditNote from './pages/EditNote';
import AddReport from './pages/AddReport';
import EditReport from './pages/EditReport';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="Maps"
          component={Maps}
          options={{headerLeft: false}}
        />
        <Stack.Screen
          name="Notes"
          component={Notes}
          options={{headerLeft: false}}
        />
        <Stack.Screen name="AddNote" component={AddNote} />
        <Stack.Screen name="EditNote" component={EditNote} />
        <Stack.Screen name="AddReport" component={AddReport} />
        <Stack.Screen name="EditReport" component={EditReport} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

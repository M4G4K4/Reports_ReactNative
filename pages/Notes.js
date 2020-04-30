import React, {Component, useState} from 'react';
const Realm = require('realm');
import {Icon, ThemeProvider} from 'react-native-elements';
import {FaBeer} from 'react-icons/fa';
import {MdSave} from 'react-icons/md';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

const realmFunction = () => {
  // Define your models and their properties
  const CarSchema = {
    name: 'Car',
    properties: {
      make: 'string',
      model: 'string',
      miles: {type: 'int', default: 0},
    },
  };

  const PersonSchema = {
    name: 'Person',
    properties: {
      name: 'string',
      birthday: 'date',
      cars: 'Car[]', // a list of Cars
      picture: 'data?', // optional property
    },
  };

  Realm.open({schema: [CarSchema, PersonSchema]})
    .then((realm) => {
      // Create Realm objects and write to local storage
      realm.write(() => {
        const myCar = realm.create('Car', {
          make: 'Honda',
          model: 'Civic',
          miles: 1000,
        });
        myCar.miles += 20; // Update a property value
      });

      // Query Realm for all cars with a high mileage
      const cars = realm.objects('Car').filtered('miles > 1000');
      console.log('1st Cars: ' + cars);
      console.log('1st Cars: ' + cars[0].model);

      // Will return a Results object with our 1 car
      cars.length; // => 1
      console.log('2nd Num. cars : ' + cars.length);
      console.log('2nd Cars: ' + cars.make);

      // Add another car
      realm.write(() => {
        const myCar = realm.create('Car', {
          make: 'Ford',
          model: 'Focus',
          miles: 2000,
        });
      });

      // Query results are updated in realtime
      cars.length; // => 2
      console.log('3rd Num. cars : ' + cars.length);

      // Remember to close the realm when finished.
      realm.close();
    })
    .catch((error) => {
      console.log(error);
    });
};

function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Notes" component={Notes} />
    </Stack.Navigator>
  );
}

function Notes({navigation}) {
  const [count, setCount] = React.useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        //<Button onPress={() => setCount((c) => c + 1)} title="Update count" />
        <TouchableOpacity onPress={() => navigation.navigate('AddNote')}>
          <Text>Add</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, setCount]);

  return (
    <View>
      <Text>Notes Screen</Text>

      <Button title="Press me" onPress={() => realmFunction()} />
      <Text>Value: {count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default Notes;

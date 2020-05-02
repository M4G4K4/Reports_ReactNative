import React, {Component, useState} from 'react';
const Realm = require('realm');
import {ListView} from 'realm/react-native';
import Swipeable from 'react-native-swipeable-row';
import {List, ListItem} from 'react-native-elements';
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
  FlatList,
} from 'react-native';

function refresh() {
  Notes();
}

// Main function
function Notes({navigation}) {
  const realm = new Realm({
    schema: [
      {
        name: 'notes',
        properties: {
          id: {type: 'int', default: 0},
          title: 'string',
          description: 'string',
          createDate: 'string',
        },
      },
    ],
  });
  var newList = realm.objects('notes');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('AddNote')}>
          <Text>Add</Text>
        </TouchableOpacity>
      ),
    });
  });

  const ListViewItemSeparator = () => {
    return (
      <View style={{height: 0.5, width: '100%', backgroundColor: '#000'}} />
    );
  };

  return (
    <View style={styles.MainContainer}>
      <FlatList
        data={newList}
        ItemSeparatorComponent={ListViewItemSeparator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={{backgroundColor: 'white', padding: 20}}>
            <Text>Id: {item.id}</Text>
            <Text>Title: {item.title}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Date: {item.createDate}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
  },
  TextInputStyle: {
    borderWidth: 1,
    borderColor: '#009688',
    width: '100%',
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    height: 40,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 7,
    marginTop: 12,
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  textViewContainer: {
    textAlignVertical: 'center',
    padding: 10,
    fontSize: 20,
    color: '#000',
  },
});

export default Notes;

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

function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Notes" component={Notes} />
    </Stack.Navigator>
  );
}

function editNote() {
  console.log('Edit pressed');
}

function deleteNote() {
  console.log('Delete pressed');
}

function notesList() {
  const NoteSchema = {
    name: 'Notes',
    properties: {
      title: 'string',
      description: 'string',
      createDate: 'string',
    },
  };

  Realm.open({schema: [NoteSchema]})
    .then((realm) => {
      realm.close();
    })
    .catch((error) => {
      console.log(error);
      Alert.alert(
        'Error showing notes',
        '',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    });
}

// Main function
function Notes({navigation}) {
  const [notes, setNotes] = React.useState([]);

  const list = [
    {
      name: 'Amy Farha',
      avatar_url:
        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President',
    },
    {
      name: 'Chris Jackson',
      avatar_url:
        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman',
    },
  ];
  const list2 = [
    {
      '0': {createDate: '30/04/2020 - 15:57', description: 'ss', title: 'aa'},
      '1': {
        createDate: '30/04/2020 - 15:57',
        description: '2nd Description',
        title: '2nd Title',
      },
      '2': {createDate: '30/04/2020 - 19:35', description: 'ss', title: 'ss'},
      '3': {
        createDate: '30/04/2020 - 19:36',
        description: 'sdfsdfds',
        title: 'ss',
      },
    },
  ];
  const list3 = {
    '0': {createDate: '30/04/2020 - 15:57', description: 'ss', title: 'aa'},
    '1': {
      createDate: '30/04/2020 - 15:57',
      description: '2nd Description',
      title: '2nd Title',
    },
    '2': {createDate: '30/04/2020 - 19:35', description: 'ss', title: 'ss'},
    '3': {
      createDate: '30/04/2020 - 19:36',
      description: 'sdfsdfds',
      title: 'ss',
    },
  };

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
        data={list}
        ItemSeparatorComponent={ListViewItemSeparator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={{backgroundColor: 'white', padding: 20}}>
            <Text>Id: {item.id}</Text>
            <Text>Nome: {item.name}</Text>
            <Text>Cidade: {item.subtitle}</Text>
            <Text>Telefone: {item.telefone}</Text>
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

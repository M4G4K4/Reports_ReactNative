import React, {Component, useState} from 'react';
const Realm = require('realm');

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
import Notes from './Notes';
import {useSafeArea} from 'react-native-safe-area-context';

function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AddNote" component={AddNote} />
    </Stack.Navigator>
  );
}

const saveNote = (title, description) => {
  var dia = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  var hour = new Date().getHours();
  var minutes = new Date().getMinutes();

  if (month < 10) {
    month = '0' + month;
  }
  var date = dia + '/' + month + '/' + year + ' - ' + hour + ':' + minutes;
  console.log(date);
  console.log(title);
  console.log(description);

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
      realm.write(() => {
        const myNote = realm.create('Notes', {
          title: title,
          description: description,
          createDate: date,
        });
      });

      //const notes = realm.objects('Notes');
      //console.log(notes);

      realm.close();
    })
    .catch((error) => {
      console.log(error);
      Alert.alert(
        'Error adding note',
        '',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    });
};

function AddNote({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => saveNote(title, description)}>
          <Text>Save</Text>
        </TouchableOpacity>
      ),
    });
  });

  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  return (
    <View>
      <TextInput
        placeholder="Title"
        autoCorrect={true}
        onChangeText={(text) => setTitle(text)}
      />

      <TextInput
        multiline={true}
        placeholder="Title"
        numberOfLines={10}
        onChangeText={(text) => setDescription(text)}
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
});

export default AddNote;

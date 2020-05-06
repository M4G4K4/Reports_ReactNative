import React, {Component, useState} from 'react';
const Realm = require('realm');
import {ListItem} from 'react-native-elements';
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

const saveNote = (title, description, navigation) => {
  var dia = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  var hour = new Date().getHours();
  var minutes = new Date().getMinutes();

  if (month < 10) {
    month = '0' + month;
  }
  if (dia < 10) {
    dia = '0' + dia;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  var date = dia + '/' + month + '/' + year + ' - ' + hour + ':' + minutes;

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

  realm.write(() => {
    var ID = realm.objects('notes').length + 1;
    const myNote = realm.create('notes', {
      id: ID,
      title: title,
      description: description,
      createDate: date,
    });
  });
  navigation.navigate('Notes');
};

function AddNote({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => saveNote(title, description, navigation)}>
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

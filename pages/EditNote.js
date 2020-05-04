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

const editNote = (title, description, navigation, id) => {
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
    var note = realm.objects('notes').filtered('id =' + id);
    if (note.length > 0) {
      note[0].title = title;
      note[0].description = description;
      note[0].createDate = date;
    }
  });

  navigation.navigate('Notes', true);
};

function EditNote({route, navigation}) {
  const [description, setDescription] = useState(route.params.description);
  const [title, setTitle] = useState(route.params.title);
  const [id, setID] = useState(route.params.id);
  const [date, setDate] = useState(route.params.createDate);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => editNote(title, description, navigation, id)}>
          <Text>Save</Text>
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View>
      <TextInput
        placeholder="Title"
        autoCorrect={true}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />

      <TextInput
        multiline={true}
        placeholder="Title"
        numberOfLines={10}
        value={description}
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

export default EditNote;

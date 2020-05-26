import React, {useContext, useState} from 'react';
const Realm = require('realm');
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Notes from './Notes';
import {LocalizationContext} from '../services/localization/LocalizationContext';

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
  navigation.navigate('Notes', true);
};

function AddNote({navigation}) {
  const {translations} = useContext(LocalizationContext);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => saveNote(title, description, navigation)}>
          <Text>{translations.Save}</Text>
        </TouchableOpacity>
      ),
    });
  });

  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  return (
    <View>
      <TextInput
        placeholder={translations.Title}
        autoCorrect={true}
        onChangeText={(text) => setTitle(text)}
      />

      <TextInput
        multiline={true}
        placeholder={translations.Description}
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

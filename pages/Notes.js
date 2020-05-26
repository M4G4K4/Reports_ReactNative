import React, {Component, useContext, useState} from 'react';
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
  TouchableWithoutFeedback,
} from 'react-native';
import {LocalizationContext} from '../services/localization/LocalizationContext';


var editRefresh = false;

// Main function
function Notes({route, navigation}) {
  const [refresh, setRefresh] = useState(true);
  const {translations} = useContext(LocalizationContext);
  // Refresh list after edit
  editRefresh = route.params;

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
          <Text>{translations.Add}</Text>
        </TouchableOpacity>
      ),
    });
  });

  const ListViewItemSeparator = () => {
    return (
      <View style={{height: 0.5, width: '100%', backgroundColor: '#000'}} />
    );
  };

  const ActionOnNote = (item) => {
    Alert.alert(
      `${translations.AlertNotesTitle}`,
      '',
      [
        {
          text: `${translations.AlertNotesCancelbtn}`,
          style: 'cancel',
        },
        {text: `${translations.AlertNotesDeletebtn}`, onPress: () => deleteNote(item)},
        {text: `${translations.AlertNotesEditbtn}`, onPress: () => editNote(item)},
      ],
      {cancelable: false},
    );
  };

  const deleteNote = (item) => {
    console.log('Delete');
    realm.write(() => {
      let task = realm.objects('notes').filtered('id = ' + item.id);
      realm.delete(task);
    });
    // Refresh list after delete
    setRefresh(false);
  };

  const editNote = (item) => {
    navigation.navigate('EditNote', item);
  };

  return (
    <View style={styles.MainContainer}>
      <FlatList
        data={newList}
        extraData={(refresh, editRefresh)}
        ItemSeparatorComponent={ListViewItemSeparator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => ActionOnNote(item)}>
            <View style={{backgroundColor: 'white', padding: 15}}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.date}>{item.createDate}</Text>
            </View>
          </TouchableOpacity>
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
  title: {
    fontSize: 22,
  },
  description: {
    fontSize: 16,
    left: 10,
    marginBottom: 15,
  },
  date: {
    fontSize: 11,
    left: 10,
  },
});

export default Notes;

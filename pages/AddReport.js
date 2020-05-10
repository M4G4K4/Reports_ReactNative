import React, {Component, useState} from 'react';
import {ListItem} from 'react-native-elements';
import {createStackNavigator} from '@react-navigation/stack';
import {RNCamera} from 'react-native-camera';
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
import {BsTypeUnderline} from 'react-icons/all';
import ensureNativeModuleAvailable from 'react-native-vector-icons/lib/ensure-native-module-available';

function AddReport({route, navigation}) {
  const [userID, setUserID] = useState(route.params.ID);
  const [description, setDescription] = useState('');
  const [data, setData] = useState(route.params.data);
  const [datauri, setDatauri] = useState(route.params.datauri);

  console.log('AddReport ' + userID);

  const takeImage = () => {
    let user = {
      ID: userID,
    };
    navigation.navigate('TakeImage', user);
  };

  const saveReport = () => {
    if (description == '' || description == ' ') {
      Alert.alert(
        'Description field need to be filled',
        '',
        [
          {
            text: '',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    } else {
      // Save note
    }
  };

  // Btn na navigation bar
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={saveReport}>
          <Text>Save</Text>
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={takeImage}>
        <Text>Take Image</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Report Description"
        autoCorrect={false}
        onChangeText={(text) => setDescription(text)}
      />
    </View>
  );
} // end Main function

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AddReport;

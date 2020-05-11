import React, {Component, useState} from 'react';
import {ListItem} from 'react-native-elements';
import {createStackNavigator} from '@react-navigation/stack';
import {RNCamera} from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';
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

var photo = '';

function addPhoto() {
  Alert.alert(
    'Please choose:',
    null,
    [
      {text: 'Camera', onPress: () => openCamera()},
      {text: 'Gallery', onPress: () => openGalery()},
    ],
    {cancelable: true},
    //clicking out side of alert will not cancel
  );
}

function openCamera() {
  ImagePicker.openCamera({
    width: 300,
    height: 400,
    compressImageQuality: 0.8,
    cropping: true,
  }).then((image) => {
    photo = image.path;
    console.log(image.path);
    console.log(photo);
    console.log(image.size);
  });
}

function openGalery() {
  ImagePicker.openPicker({
    width: 300,
    height: 400,
    compressImageQuality: 0.8,
    cropping: true,
  }).then((image) => {
    photo = image.path;
    console.log(image.path);
    console.log(photo);
    console.log(image.size);
  });
}

function AddReport({route, navigation}) {
  const [userID, setUserID] = useState(route.params.ID);
  const [description, setDescription] = useState('');

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
      <View>
        <View>
          <TouchableOpacity
            onPress={() => {
              addPhoto();
            }}>
            <Text
              style={{
                color: '#0B4F6C',
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              ADD PHOTO
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
} // end Main function

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AddReport;

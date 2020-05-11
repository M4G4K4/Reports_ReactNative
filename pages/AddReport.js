import React, {Component, useState} from 'react';
import {ListItem} from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';
import {createStackNavigator} from '@react-navigation/stack';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';
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
import {add} from 'react-native-reanimated';

const ClientID = '917669a10ae9a08';
const ClientSecreat = 'ec6a7a3c715b601811debe8781e54c4f928964b2';
var base64;
var photo = '';
var imgLink;

var geolocation = {};
var address;
Geocoder.init('AIzaSyBPsA7_4kLm_VZefQZ20ESObvg5m8LHss0', {language: 'en'});

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
    includeBase64: true,
  }).then((image) => {
    photo = image.path;
    base64 = image.data;
    console.log('Base64: ' + base64);
    console.log('Path: ' + image.path);
    console.log('Photo: ' + photo);
    console.log('Size: ' + image.size);
    uploadPhoto(image.data);
  });
}

function openGalery() {
  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true,
    includeBase64: true,
  }).then((image) => {
    base64 = image.data;
    photo = image.path;
    console.log('Base64: ' + base64);
    console.log('Path: ' + image.path);
    console.log('Photo: ' + photo);
    console.log('Size: ' + image.size);
    uploadPhoto(image.data);
  });
}

function uploadPhoto(base64) {
  // Upload img to imgur
  let data = {
    image: base64,
  };
  var url = 'https://api.imgur.com/3/image';
  axios
    .post(url, data, {
      headers: {Authorization: `Client-ID ${ClientID}`},
    })
    .then((res) => {
      imgLink = res.data.data.link;
      console.log('Upload sucess');
      console.log(imgLink);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getLocation() {
  Geolocation.getCurrentPosition((info) => {
    geolocation = info;
  });
}

function getAddress() {
  var long = geolocation.coords.longitude;
  var lat = geolocation.coords.latitude;
  Geocoder.from(41.55032, -8.42005)
    .then((json) => {
      console.log(json.results[0].address_components[0]);
      address = json.results[0].address_components[0];
    })
    .catch((error) => console.warn(error));
}

// Main Function
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
    } else if (base64 == '' || base64 == ' ') {
      Alert.alert(
        'Need to take a picture of the problem',
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
      getLocation();
      getAddress();
      console.log(geolocation);
      getAddress();
      console.log(address);
      /*
      var url = 'http://64.227.36.62/api/newReport';
      var data = {
        description: description,
        longitude: latitude,
        latitude: longitude,
        img: imgLink,
        morada: morada,
        userID: userID,
      };
      axios
        .post(url, data)
        .then((res) => {
          console.log('DB report added');
        })
        .catch((err) => {
          console.log(err);
        });
    }
    */
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
          <View>
            <TextInput
              style={styles.input}
              placeholder="Report Description"
              autoCorrect={true}
              onChangeText={(text) => setDescription(text)}
            />
          </View>

          <Image
            source={{uri: photo}}
            style={{
              resizeMode: 'stretch',
              width: 100,
              height: 100,
              marginRight: 15,
              borderBottomLeftRadius: 20,
              borderTopLeftRadius: 20,
            }}
          />
        </View>
      </View>
    </View>
  );
} // end Main function

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
  },
});

export default AddReport;

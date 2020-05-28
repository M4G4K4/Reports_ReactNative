import React, {useContext, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {LocalizationContext} from '../services/localization/LocalizationContext';

console.disableYellowBox = true;

const ClientID = '917669a10ae9a08';
var base64 = '';
var photo = '';
var imgLink = '';
var save = false;

var latitude;
var longitude;
var address;

Geocoder.init('AIzaSyBPsA7_4kLm_VZefQZ20ESObvg5m8LHss0', {language: 'pt-BR'});

function addPhoto() {
  Alert.alert(
    'Please choose:',
    null,
    [
      {text: 'Camera', onPress: () => openCamera()},
      {text: 'Gallery', onPress: () => openGalery()},
    ],
    {cancelable: true},
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
    save = true;
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
    save = true;
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
    latitude = parseFloat(info.coords.latitude);
    longitude = parseFloat(info.coords.longitude);
    getAddress(
      parseFloat(info.coords.latitude),
      parseFloat(info.coords.longitude),
    );
  });
}

function getAddress(lat, long) {
  Geocoder.from(lat, long)
    .then((json) => {
      address = json.results[0].formatted_address;
    })
    .catch((error) => console.warn(error));
}

// Main Function
function AddReport({route, navigation}) {
  const [userID, setUserID] = useState(route.params);
  const [description, setDescription] = useState('');
  const {translations} = useContext(LocalizationContext);

  getLocation();
  getAddress();

  const saveReport = () => {
    if (description === '' || description === ' ') {
      Alert.alert(
        `${translations.AddReportSaveReportAlertDescriptionTitle}`,
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
    } else if (base64 === '' || base64 === ' ') {
      Alert.alert(
        `${translations.AddReportSaveReportAlertImageTitle}`,
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
    } else if (imgLink === undefined || imgLink === ' ' || imgLink === '') {
      Alert.alert(
        `${translations.AddReportSaveReportAlertImageTitle}`,
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

      var url = 'http://64.227.36.62/api/newReport';
      var data = {
        description: description,
        longitude: latitude,
        latitude: longitude,
        img: imgLink,
        morada: address,
        userID: userID.ID,
      };
      axios
        .post(url, data)
        .then((res) => {
          console.log('DB report added');
          Alert.alert(
            `${translations.AddReportSaveReportAlertSucessTitle}`,
            '',
            [
              {
                text: '',
                onPress: () => console.log('Cancel Pressed'),
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
          // navigate to back
          navigation.navigate('Maps', userID);
        })
        .catch((err) => {
          console.log(err);
        });



    }
  };

  // Btn na navigation bar
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={saveReport}>
          <Text  style={styles.SaveBtn}>{translations.Save}</Text>
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
            <Text style={styles.AddPhoto}>
              {translations.AddReportAddPhoto}
            </Text>
          </TouchableOpacity>
          <View>
            <TextInput
              style={styles.input}
              placeholder={translations.AddReportReportDescription}
              autoCorrect={true}
              onChangeText={(text) => setDescription(text)}
            />
          </View>
          <Image source={{uri: photo}} style={styles.image} />
        </View>
      </View>
    </View>
  );
} // end Main function

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    marginLeft: 50,
    width: 300,
    height: 300,
    marginRight: 15,
  },
  input: {
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    marginLeft: 20,
    borderRadius: 7,
  },
  SaveBtn: {
    paddingRight: 20,
    fontWeight: 'bold',
    fontSize: 15,
  },
  AddPhoto: {
    backgroundColor: '#1898cf',
    height: 45,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 7,
    marginLeft: 150,
    marginRight: 150,
    paddingLeft: 15,
    paddingTop: 10,
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddReport;

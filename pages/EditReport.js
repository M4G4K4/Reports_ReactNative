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
console.disableYellowBox = true;

const ClientID = '917669a10ae9a08';
const ClientSecreat = 'ec6a7a3c715b601811debe8781e54c4f928964b2';

Geocoder.init('AIzaSyBPsA7_4kLm_VZefQZ20ESObvg5m8LHss0', {language: 'pt-BR'});

// Main Function
function AddReport({route, navigation}) {
  const [userID, setUserID] = useState(route.params.userID);
  const [marker, setMarker] = useState(route.params.marker);
  const [description, setDescription] = useState('');

  console.log(userID);
  console.log(marker.img);

  const saveReport = () => {
    if (description != ' ' || description != '') {
      let data = {
        description: description,
        img: marker.img,
      };
      axios
        .put('http://64.227.36.62/api/editReport', data)
        .then((response) => {
          if (response.status == 200) {
            console.log('Return sucesso');
            navigation.navigate('Maps');
          } else {
            console.log('Erro');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Alert.alert(
        'Description need to be filled',
        '',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }
  };

  // Btn na navigation bar
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => saveReport()}>
          <Text>Save</Text>
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View style={styles.container}>
      <View>
        <View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Report Description"
              autoCorrect={true}
              onChangeText={(text) => setDescription(text)}
            />
          </View>
        </View>
      </View>
    </View>
  );
} // end Main function

const styles = StyleSheet.create({});

export default AddReport;

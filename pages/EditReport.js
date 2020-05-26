import React, {useContext, useState} from 'react';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {LocalizationContext} from '../services/localization/LocalizationContext';
console.disableYellowBox = true;

Geocoder.init('AIzaSyBPsA7_4kLm_VZefQZ20ESObvg5m8LHss0', {language: 'pt-BR'});

// Main Function
function AddReport({route, navigation}) {
  const [userID, setUserID] = useState(route.params.userID);
  const [marker, setMarker] = useState(route.params.marker);
  const [description, setDescription] = useState('');
  const {translations} = useContext(LocalizationContext);

  console.log(userID);
  console.log(marker.img);

  const saveReport = () => {
    if (description !== ' ' || description !== '') {
      let data = {
        description: description,
        img: marker.img,
      };
      axios
        .put('http://64.227.36.62/api/editReport', data)
        .then((response) => {
          if (response.status === 200) {
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
          <Text>{translations.Save}</Text>
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
              placeholder={translations.EditReportDescription}
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

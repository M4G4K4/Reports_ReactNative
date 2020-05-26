import React, {Component, useContext, useState} from 'react';
import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  unstable_enableLogBox,
} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {Card, CardItem} from 'react-native-elements';
import axios from 'axios';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import {makeOverlays} from 'react-native-maps/lib/components/Geojson';
import {LocalizationContext} from '../services/localization/LocalizationContext';

// Main function
function Map({route, navigation}) {
  const [marker, setMarker] = useState([]);
  const [call, setCall] = useState(true);
  const [userID, setUserID] = useState(route.params);
  const [del, setDel] = useState(false);
  const {translations} = useContext(LocalizationContext);


  const handleEditDelete = (marker) => {
    //Edit or Delete marker
    if (marker.userID == userID.ID) {
      Alert.alert(
        `${translations.MapsAlertTitle}`,
        null,
        [
          {text: `${translations.MapsAlertEditbtn}`, onPress: () => editReport(marker)},
          {text: `${translations.MapsAlertDeletebtn}`, onPress: () => deleteReport(marker)},
        ],
        {cancelable: true},
        //clicking out side of alert will not cancel
      );
    } else {
      console.log('Wrong user cant edit delete');
    }
  };

  const editReport = (marker) => {
    let data = {
      marker: marker,
      userID: userID,
    };
    navigation.navigate('EditReport', data);
  };

  const deleteReport = (marker) => {
    let data = {
      img: marker.img,
    };
    axios
      .post('http://64.227.36.62/api/deleteReport', data)
      .then((response) => {
        if (response.status == 200) {
          console.log('Return sucesso');
          setDel(true);
          getMarker();
          navigation.navigate('Maps');
        } else {
          console.log('Erro');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddReport', userID)}>
          <Text>{translations.Add}</Text>
        </TouchableOpacity>
      ),
    });
  });

  const getMarker = () => {
    fetch('http://64.227.36.62/api/getAllReports')
      .then((response) => response.json())
      .then((responseJson) => {
        setMarker(responseJson);
      })
      .catch((error) => console.error(error));
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMarker();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <MapView
        extraData={del}
        style={styles.map}
        region={{
          latitude: 39.3325,
          longitude: -7.5112,
          latitudeDelta: 6,
          longitudeDelta: 6,
        }}>
        {marker.map((marker) => (
          <Marker
            extraData={del}
            pinColor={marker.userID == userID ? 'red' : 'red'}
            key={marker.ID}
            coordinate={{
              latitude: marker.longitude,
              longitude: marker.latitude,
            }}>
            <Callout onPress={() => handleEditDelete(marker)}>
              <View>
                <Text style={{float: 'right'}}>{marker.description}</Text>
                <Text>{marker.morada}</Text>
                <Text style={{float: 'left'}}>
                  <Image
                    style={{height: 100, width: 100}}
                    source={{uri: marker.img}}
                    resizeMode="cover"
                  />
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  ); // End return
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  callout: {
    width: 200,
    height: 200,
  },
  thumb: {},
  markerDescription: {},
  markerTitle: {},
});

export default Map;

import React, {useContext, useState} from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  DeviceEventEmitter,
} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import axios from 'axios';
import {LocalizationContext} from '../services/localization/LocalizationContext';
import {
  accelerometer,
  gyroscope,
  barometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import {map, filter} from 'rxjs/operators';

var mapStyleJSON = require('../JSON/mapStyle.json');
var mapStyle2JSON = require('../JSON/mapStyle2.json');

setUpdateIntervalForType(SensorTypes.barometer, 500); // defaults to 100ms

// Main function
function Map({route, navigation}) {
  const [marker, setMarker] = useState([]);
  const [userID, setUserID] = useState(route.params);
  const [del, setDel] = useState(false);
  const [mapStyle, setMapStyle] = useState(0);
  const {translations} = useContext(LocalizationContext);


  const subscription = barometer.subscribe(({pressure}) => {
    if (pressure >= 550) {
      // night
      setMapStyle(1);
    } else {
      // day
      setMapStyle(2);
    }
  });

  const handleEditDelete = (marker) => {
    //Edit or Delete marker
    if (marker.userID == userID.ID) {
      Alert.alert(
        `${translations.MapsAlertTitle}`,
        null,
        [
          {
            text: `${translations.MapsAlertEditbtn}`,
            onPress: () => editReport(marker),
          },
          {
            text: `${translations.MapsAlertDeletebtn}`,
            onPress: () => deleteReport(marker),
          },
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
          <Text style={styles.SaveBtn}>{translations.Add}</Text>
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
        customMapStyle={mapStyle == 1 ? mapStyleJSON : mapStyle2JSON}
        region={{
          latitude: 39.3325,
          longitude: -7.5112,
          latitudeDelta: 6,
          longitudeDelta: 6,
        }}>
        {marker.map((marker) => (
          <Marker
            extraData={del}
            pinColor={marker.userID == userID ? 'blue' : 'red'}
            key={marker.ID}
            coordinate={{
              latitude: marker.longitude,
              longitude: marker.latitude,
            }}>
            <Callout onPress={() => handleEditDelete(marker)}>
              <View>
                <Text>{marker.description}</Text>
                <Text>{marker.morada}</Text>
                <Text>
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
  CalloutView: {
    flex: 1,
    flexDirection: 'row',
  },
  CalloutImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CalloutText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SaveBtn: {
    paddingRight: 20,
    fontWeight: 'bold',
    fontSize: 15,
  },
  bubble: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Map;

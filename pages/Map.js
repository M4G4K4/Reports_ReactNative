import React, {Component, useState} from 'react';
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

// Main function
function Map({route, navigation}) {
  const [marker, setMarker] = useState([]);
  const [call, setCall] = useState(true);
  const [userID, setUserID] = useState(route.params);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddReport', userID)}>
          <Text>Add</Text>
        </TouchableOpacity>
      ),
    });
  });
  const getMarker = () => {
    console.log('---');
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
        style={styles.map}
        region={{
          latitude: 39.3325,
          longitude: -7.5112,
          latitudeDelta: 6,
          longitudeDelta: 6,
        }}>
        {marker.map((marker) => (
          <Marker
            key={marker.ID}
            coordinate={{
              latitude: marker.longitude,
              longitude: marker.latitude,
            }}>
            <Callout
              onPress={() => console.log('Marker callout cliked' + marker.ID)}>
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
  callout: {
    width: 200,
    height: 200,
  },
  thumb: {},
  markerDescription: {},
  markerTitle: {},
});

export default Map;

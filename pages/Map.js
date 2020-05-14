import React, {Component, useState} from 'react';
import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
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
    fetch('http://64.227.36.62/api/getAllReports')
      .then((response) => response.json())
      .then((responseJson) => {
        setMarker(responseJson);
      })
      .catch((error) => console.error(error));
  };

  getMarker();

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: 39.3325,
          longitude: -7.5112,
          latitudeDelta: 7,
          longitudeDelta: 7,
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
              <Text>{marker.description}</Text>
              <Text>{marker.morada}</Text>
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

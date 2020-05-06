import React, {Component, useState} from 'react';
import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import axios from 'axios';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
let markersURL = 'https://www.emergency.wa.gov.au/data/incident_FCAD.json';

// Main function
function Map({route, navigation}) {
  const [marker, setMarker] = useState([]);
  const [call, setCall] = useState(true);

  const getMarker = () => {
    fetch('http://64.227.36.62/api/getAllReports')
      .then((response) => response.json())
      .then((responseJson) => {
        setMarker(responseJson);
      })
      .catch((error) => console.error(error));
  };

  if (call) {
    getMarker();
    setCall(false);
  }

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
            <Callout>
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
});

export default Map;

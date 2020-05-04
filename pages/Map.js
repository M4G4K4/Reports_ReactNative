import React, {Component, useState} from 'react';
import {Alert, FlatList, Text, TouchableOpacity, View} from 'react-native';
import MapView from 'react-native-maps';

function Map({route, navigation}) {
  return (
    <View>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}
export default Map;

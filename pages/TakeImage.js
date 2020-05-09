import React, {Component, useState, useEffect} from 'react';
import axios from 'axios';
import {sha256} from 'react-native-sha256';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
  StatusBar,
  Button,
  Alert,
} from 'react-native';

function TakeImage({navigation}) {
  return (
    <View>
      <Text>Take image screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default TakeImage;

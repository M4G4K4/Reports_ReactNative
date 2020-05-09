import React, {Component, useState} from 'react';
import {ListItem} from 'react-native-elements';
import {createStackNavigator} from '@react-navigation/stack';
import {RNCamera} from 'react-native-camera';
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
} from 'react-native';

function AddReport({route, navigation}) {
  const [userID, setUserID] = useState(route.params.ID);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
          <Text>Save</Text>
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View style={styles.container}>
      <Text>Add Report Screen</Text>
    </View>
  );
} // end Main function

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default AddReport;

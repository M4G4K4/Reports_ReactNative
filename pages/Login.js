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


function Login({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hash, setHash] = useState('');

  function encryptPasswrod(password) {
    sha256(password).then((hash) => {
      setHash(hash);
    });
  }

  const login = () => {
    axios
      .get('http://64.227.36.62/api/checkUser2/' + username + '/' + hash)
      .then((response) => {
        if (response.status == 200) {
          console.log('Return sucesso');
          // TODO: pass ID to next screen
          navigation.navigate('Maps');
        } else {
          console.log('Erro');
        }
      })
      .catch((error) => {
        console.log(error);
        // Alert wrong user
        Alert.alert(
          'Wrong credentials',
          'No user found with the current combination of email and password',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      });
  };

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Image source={require('../src/images/pointBRemoved.png')} />
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCorrect={false}
          onChangeText={(text) => setUsername(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCorrect={false}
          onChangeText={(text) => encryptPasswrod(text)}
        />

        <TouchableOpacity style={styles.btnLogin} onPress={login}>
          <Text style={styles.textLogin}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnRegister}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.textRegister}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnRegister}
          onPress={() => navigation.navigate('Notes')}>
          <Text style={styles.textRegister}>Notes</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
    aspectRatio: 0.75,
    width: '20%',
    height: '20%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 50,
  },
  input: {
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
  },
  btnLogin: {
    backgroundColor: '#1898cf',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  textLogin: {
    color: '#FFF',
    fontSize: 18,
  },
  btnRegister: {
    backgroundColor: '#1898cf',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginTop: 10,
  },
  textRegister: {
    color: '#FFF',
    fontSize: 18,
    marginTop: 10,
  },
});

export default Login;

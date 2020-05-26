import React, {useContext, useState} from 'react';
import {sha256} from 'react-native-sha256';
import axios from 'axios';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {LocalizationContext} from '../services/localization/LocalizationContext';

function Register({navigation}) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [hash, setHash] = useState('');
  const {translations} = useContext(LocalizationContext);

  function encryptPasswrod(password) {
    sha256(password).then((hash) => {
      setHash(hash);
    });
  }

  const regist = () => {
    let data = {
      email: username,
      password: hash,
      name: name,
    };
    axios
      .post('http://64.227.36.62/api/registerUser', data)
      .then((response) => {
        if (response.status === 201) {
          Alert.alert(
            `${translations.RegisterAlertTitle}`,
            '',
            [{text: 'OK', onPress: () => navigation.navigate('Login')}],
            {cancelable: false},
          );
        }
      })
      .catch((error) => {});
  };

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Image source={require('../src/images/pointBRemoved.png')} />
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={translations.RegisterName}
          autoCorrect={false}
          onChangeText={(text) => setName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder={translations.RegisterEmail}
          autoCorrect={false}
          onChangeText={(text) => setUsername(text)}
        />

        <TextInput
          style={styles.input}
          placeholder={translations.Password}
          autoCorrect={false}
          onChangeText={(text) => encryptPasswrod(text)}
        />

        <TouchableOpacity style={styles.btnRegister} onPress={regist}>
          <Text style={styles.textRegister}>
            {translations.RegisterSignUpBtn}
          </Text>
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

export default Register;

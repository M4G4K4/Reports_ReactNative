import React, {useState, useContext} from 'react';
import axios from 'axios';
import {sha256} from 'react-native-sha256';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Dimensions,
} from 'react-native';
import {LocalizationContext} from '../services/localization/LocalizationContext';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

function Login({navigation}) {
  const [dimensions, setDimensions] = useState({window, screen});
  const [username, setUsername] = useState('');
  const [hash, setHash] = useState('');
  const {translations} = useContext(LocalizationContext);

  const change = ({window, screen}) => {
    var w = Dimensions.get('window');
    var s = Dimensions.get('screen');
    setDimensions({window, screen});
  };

  Dimensions.addEventListener('change', change);

  function encryptPasswrod(password) {
    sha256(password).then((hash) => {
      setHash(hash);
    });
  }

  const login = () => {
    axios
      .get('http://64.227.36.62/api/checkUser2/' + username + '/' + hash)
      .then((response) => {
        if (response.status === 200) {
          console.log('Return sucesso');
          console.log(response.data.ID);
          let data = {
            ID: response.data.ID,
          };
          navigation.navigate('Maps', data);
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
    <KeyboardAvoidingView
      style={
        dimensions.window.height > dimensions.window.width
          ? styles.fullP
          : styles.fullL
      }>
      <View
        style={
          dimensions.window.height > dimensions.window.width
            ? styles.containerLogoP
            : styles.containerLogoL
        }>
        <Image source={require('../src/images/pointBRemoved.png')} />
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={translations.Email}
          autoCorrect={false}
          onChangeText={(text) => setUsername(text)}
        />

        <TextInput
          style={styles.input}
          placeholder={translations.Password}
          autoCorrect={false}
          onChangeText={(text) => encryptPasswrod(text)}
        />

        <TouchableOpacity style={styles.btnLogin} onPress={login}>
          <Text style={styles.textLogin}>{translations.Login}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnRegister}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.textRegister}>{translations.Register}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnNotes}
          onPress={() => navigation.navigate('Notes')}>
          <Text style={styles.textNotes}>{translations.Notes}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fullP: {
    flex: 1,
    flexDirection: 'column',
  },
  fullL: {
    flex: 1,
    flexDirection: 'row',
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLogoP: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 0.75,
    paddingLeft: 170,
    width: '20%',
    height: '20%',
  },
  containerLogoL: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 0.75,
    paddingBottom: 150,
    width: '20%',
    height: '20%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  btnNotes: {
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginTop: 20,
    color: '#000000',
  },
  textRegister: {
    color: '#FFF',
    fontSize: 18,
    marginTop: 10,
  },
  textNotes: {
    color: '#000',
    fontSize: 18,
    marginTop: 10,
  },
});

export default Login;

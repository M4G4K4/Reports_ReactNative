import LocalizedStrings from 'react-native-localization';
export const DEFAULT_LANGUAGE = 'en';

const translations = {
  en: {
    WELCOME: 'Welcome to Localization',
    BUTTON: 'b en',
    Login: 'Login',
    Email: 'Email',
    Password: 'Password',
    Register: 'Register',
    Notes: 'Notes',
  },
  pt: {
    WELCOME: 'Bem-vindo à multi-lingua',
    BUTTON: 'b pt',
    Login: 'Login',
    Email: 'Email',
    Password: 'Palavra Passe',
    Register: 'Registo',
    Notes: 'Notas',
  }
};

export default new LocalizedStrings(translations);

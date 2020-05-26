import React from 'react';

import {View, Text, Button} from 'react-native';

function Home({navigation}) {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Go to Register Screen"
        onPress={() => navigation.navigate('Register')}
      />
      <Text />
    </View>
  );
}

export default Home;

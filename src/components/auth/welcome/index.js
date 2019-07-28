import React from 'react';
import { View, Text } from 'react-native';

export default props => (
  <View
    style={{
      width: 250,
      height: 200,
      backgroundColor: '#E1C540',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    }}
  >
    <Text
      onPress={() => alert('apertou no texto')}
      style={{
        color: '#FFF',
        fontSize: 26,
      }}

    >Welcome</Text>
  </View>
);
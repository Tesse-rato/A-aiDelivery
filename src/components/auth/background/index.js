import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';

import {
  Folha,
  LogoContainer,
  Container
} from './styles';

import Logo from '../../../assets/logoBranco.svg';

export default props => (
  <Container source={require('../../../assets/Background.png')}>
    <Folha
      style={{
        transform: props.folhaTransform1
      }}
      blurRadius={.5}
      source={require('../../../assets/Folha.png')}
    // source={{ uri: 'http://192.168.0.105:3333/Folha.png' }}
    />
    <Folha
      style={{
        position: 'absolute',
        bottom: 10,
        transform: props.folhaTransform2
      }}
      blurRadius={3}
      source={require('../../../assets/Folha.png')}
    // source={{ uri: 'http://192.168.0.105:3333/Folha.png' }}
    />

    <Animated.View
      style={{
        width: props.logoSize,
        height: props.logoSize,
        marginTop: props.logoMarginTop,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
      }}
    >
      <Logo
        width={'100%'}
      />
    </Animated.View>

  </Container>
);

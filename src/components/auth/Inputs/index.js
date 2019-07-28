import React, { Component } from 'react';
import { Text, StatusBar, StyleSheet, View, Animated } from 'react-native';

import {
  InputContainer,
  Input,
} from './styles';

export default props => (
  <InputContainer>
    <Input
      placeholder={props.placeholderPrimaryInput}
      onChangeText={(text) => props.onChangeText('first', text)}
    />
    <Input
      placeholder={props.placeholderSecondInput}
      onFocus={() => props.onFocus(3)}
      onEndEditing={() => props.onEndEditing(2)}
      onChangeText={(text) => props.onChangeText('second', text)}
    />
  </InputContainer>
);

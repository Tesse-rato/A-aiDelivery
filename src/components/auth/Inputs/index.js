import React from 'react';
import { Picker, View } from 'react-native';

import { InputContainer, Input } from './styles';

export default props => (
  <InputContainer>
    {props.placeholderPrimaryInput === 'Cidade' ? (
      <View style={{ backgroundColor: '#FFF', borderRadius: 20 }}>
        <Picker mode='dialog' selectedValue={props.city} onValueChange={(text) => props.onChangeText('first', text)} >
          <Picker.Item color='#333' value='Tupaciguara' key='tupaciguara' label='Tupaciguara' />
          <Picker.Item color='#333' value='MonteAlegre' key='MonteAlegre' label='Monte Alegre' />
          <Picker.Item color='#333' value='Itumbiara' key='Itumbiara' label='Itumbiara' />
          <Picker.Item color='#333' value='Uberlandia' key='Uberlandia' label='Uberlândia' />
        </Picker>
      </View>
    ) : (
        <Input
          placeholder={props.placeholderPrimaryInput}
          onChangeText={(text) => props.onChangeText('first', text)}
          secureTextEntry={props.placeholderPrimaryInput == 'Senha' ? true : false}
        />
      )
    }
    <Input
      placeholder={props.placeholderSecondInput}
      onFocus={() => props.onFocus(3)}
      onEndEditing={() => props.onEndEditing(2)}
      onChangeText={(text) => props.onChangeText('second', text)}
      secureTextEntry={props.secureTextEntry}
    />
  </InputContainer >
);

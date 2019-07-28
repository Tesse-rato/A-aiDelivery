import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

import Colors from '../../../assets/colors';

export const InputContainer = styled.View`
  padding: 20px;
  background-color: ${Colors.ROXO};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;
export const Input = styled.TextInput.attrs(props => ({
  placeholder: props.placeholder,
  placeholderTextColor: Colors.ROXO,
  selectionColor: Colors.VERDE,
  onFocus: props.onFocus,
  onEndEditing: props.onEndEditing
}))`
  width: ${width - 80}px;
  height: 50px;
  border-width: 2px;
  border-color: ${Colors.ROXO};
  align-self: center;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${Colors.ROXO};
  margin: 10px;
  background-color: #FFF;
  border-radius: 20px;
`;
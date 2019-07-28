import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  position: absolute;
  width: ${width}px;
  height: ${height}px;
`;


export const NavigationsButtons = styled.TouchableOpacity.attrs(props => ({ ...props }))`
  position: absolute;
`;
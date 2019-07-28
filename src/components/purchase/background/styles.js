import styled from 'styled-components/native';
import { Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Container = styled.ImageBackground.attrs(props => ({ ...props }))`
  position: absolute;
  width: ${width}px;
  height: ${height}px;
`;

export const WhiteCard = styled(Animated.View)`
  position: absolute;
  background-color: #FFF;
  width: ${width}px;
  height: ${height}px;
  align-self: center;
  border-radius: 40px;
`;
import styled from 'styled-components/native';
import { Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Container = styled(Animated.View)`
  width: ${width}px;
  height: ${height / 3}px;
  top: -10px;
`;

export const IconsContainer = styled(Animated.View)`
  flex-direction: row;
  justify-content: space-evenly;
  width: ${width}px;
`;

export const StatusCirclesContainer = styled.View`
  align-self: center;
  margin-top: 30px;
  width: 100px;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const StatusCircle = styled(Animated.View)`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #FFF;
`;

export const AnimatedText = styled(Animated.Text)`
  align-self: center;
  text-align: center;
`;

export const AnimatedTextContainer = styled(Animated.View)`
  align-self: center;
  margin-top: 10px;
`;

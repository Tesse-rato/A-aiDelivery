import styled from 'styled-components/native';
import { Dimensions, Animated } from 'react-native';

import Colors from '../../../assets/colors';

const { width, height } = Dimensions.get('window');

export const Container = styled(Animated.View)`
  width: ${width}px;
  height: ${height}px;
  position: absolute;
`;
export const ButtonOnMiddle = styled.TouchableOpacity.attrs(props => ({ ...props }))`
  width: ${width - 60}px;
  height: 50px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: ${Colors.VERDE};
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const BottomBtnContainer = styled(Animated.View)`
position: absolute;
bottom: 50px;
align-self: center;
background-color: #FFF;
border-radius: 25px;
`;

export const BottomBtn = styled.TouchableOpacity.attrs(props => ({ ...props }))`
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 15px;
  padding-bottom: 15px;
  align-items: center;
  justify-content: center;
`;

export const MiddleContainer = styled(Animated.View)`
  width: ${width - 50}px;
  align-self: center;
`;

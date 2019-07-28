import styled from 'styled-components/native';
import { Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

import Colors from '../../../assets/colors';

// export const Container = styled.ImageBackground.attrs(props => ({ ...props }))`
//   width: ${width}px;
//   height: ${height}px;
//   position: absolute;
// `;

export const Container = styled.View`
  position: absolute;
  width: ${width}px;
  height: ${height}px;
  background-color: ${Colors.ROXO};
`;

export const Folha = styled(Animated.Image).attrs(props => ({ ...props }))`
  width: 600px;
  height: 600px;
  opacity: .5;
  position: absolute;
`;

export const LogoContainer = styled(Animated.View)`
  align-self: center;
  align-items: center;
  justify-content: center;
`;
import styled from 'styled-components/native';
import { Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Container = styled(Animated.View)`
  position: absolute;
  width: ${width}px;
  height: ${height}px;
`;

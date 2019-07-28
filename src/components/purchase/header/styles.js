import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  width: ${width}px;
  height: ${80}px;
  flex-direction: row;
`;

export const LogoContainer = styled.View`
  padding-top: 5px;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: ${width}px;
`;

export const MenuBtn = styled.TouchableOpacity.attrs(props => ({ ...props }))`
  left: 5px;
  top: 10px;
`;
import styled from 'styled-components/ntive';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  width: ${width - 50}px;
  height: 200px;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-top: 20px;
`;
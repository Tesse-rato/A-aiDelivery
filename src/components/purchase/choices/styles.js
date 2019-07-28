import styled from 'styled-components/native';
import { Dimensions, Animated, StyleSheet } from 'react-native';

import Colors from '../../../assets/colors';

const { width, height } = Dimensions.get('window');

export const Container = styled(Animated.View)`
  width: ${width}px;
  height: ${height / 2}px;
  top: ${height / 2}px;
  padding-bottom: 23px;
  position: absolute;
`; // Container do index

export const ChoicesScroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false
})`
  width: ${width}px;
  align-self: center;
`; // Scroll para os botões deslizantes

export const WhiteCupContainer = styled(Animated.View)`
  width: ${width - (width / 4) - 20};
  height: 60px;
  background-color: ${Colors.CINZA};
  border-radius: 30px;
  padding-left: 20px;
  flex-direction: row;
  align-items: center;
  left: 10px;
`; // Componentes animados da selecao da medida do copo

export const PurplePriceContainer = styled(Animated.View)`
  width: ${width / 2}px;
  height: 58px;
  background-color: ${Colors.ROXO};
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  border-radius: 30px;
  top: 1px;
  padding-right: 20px;
  position: absolute;
  left: ${width / 2 - 10}px;
`; // Componentes animados da selecao da medida do copo

export const CupChoiceContainer = styled.View`
  width: ${width}px;
  align-self: center;
  margin: 3px;
`; // Container pra um botao deslizante do copo

export const Title = styled(Animated.Text)`
  font-family: ${'OpenSans-Light'};
  font-size: 18;
  align-self: center;
  margin-top: 10;
`; // Título pro container das escolhas

// --------------- //   // CUP SIZE CHOICE
// --------------- //
// --------------- //
// --------------- //   // 
// --------------- //
// --------------- //
// --------------- //   // ADDITIONALS

export const AdditionalChoiceContainer = styled.View`
  flex-direction: row;
  width: ${width - 20}px;
  align-self: center;
  justify-content: center;
  margin: 10px;
`;

export const AdditionalCenterContaiter = styled(Animated.View)`
  width: ${width - (10 + 90)}px;
  height: 70px;
  border-radius: 35px;
  align-items: center;
  align-self: center;
  position: absolute;
  padding-top: 5px;
`;

export const AdditionalIncreaseContainer = styled.View`
  width: ${width / 2 - 10}px;
  height: 70px;
  background-color: ${Colors.VERDE};
  justify-content: center;
  align-items: flex-end;
  border-bottom-right-radius:35px;
  border-top-right-radius:35px;
  padding-right: 5px;
`;

export const AdditionalDecreaseContaiter = styled.View`
  width: ${width / 2 - 10}px;
  height: 70px;
  background-color: ${Colors.VERMELHO};
  justify-content: center;
  border-bottom-left-radius:35px;
  border-top-left-radius:35px;
  padding-left: 5px;
`;

export const AddittionalCenterDescription = styled(Animated.Text)`
  font-family: ${'OpenSans-Light'};
  font-size: 14px;
  color: ${Colors.ROXO};
  margin-top: 8px;
`;


// --------------- //   // ADDITIONALS
// --------------- //
// --------------- //
// --------------- //   // 
// --------------- //
// --------------- //
// --------------- //   // ADDRESSFORM


export const AddresFormContainer = styled.View`
`;

export const Input = styled.TextInput.attrs(props => ({ ...props }))`
  height: 45px;
  border-width: ${StyleSheet.hairlineWidth};
  border-color: #FFF;
  border-radius: 30px;
  padding: 10px;
`;


// --------------- //   // ADDRESSFORM
// --------------- //
// --------------- //
// --------------- //   // 
// --------------- //
// --------------- //
// --------------- //   // ORDER

export const Button = styled.TouchableOpacity.attrs(props => ({ ...props }))`
  width: 250px;
  height: 50px;
  border-radius: 30px;
  border-width: ${StyleSheet.hairlineWidth};
  border-color: ${Colors.ROXO};
  align-items: center;
  justify-content: center;
`;

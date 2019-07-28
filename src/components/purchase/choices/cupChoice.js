import React from 'react';
import { View, Text, Animated, Dimensions, Easing } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

import Colors from '../../../assets/colors';

import {
  WhiteCupContainer,
  PurplePriceContainer,
  CupChoiceContainer
} from './styles';

import env from '../environment';


export default props => {

  let translateX = new Animated.Value(0);
  let animatedColor = new Animated.Value(0);

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX
        }
      }
    ]
  );

  const onHandlerStateChange = function ({ nativeEvent }) {
    if (nativeEvent.oldState == State.ACTIVE) {
      const { translationX } = nativeEvent;

      if (translationX < 0) {
        Animated.timing(translateX, { toValue: 0, duration: 500, easing: Easing.bounce }).start();
      }
      else if (translationX > ((width / 4) - 30)) {
        Animated.timing(translateX, { toValue: width / 4, duration: 200, delay: 50 }).start(() => {
          Animated.timing(translateX, { toValue: 0, duration: 200, delay: 50 }).start(() => {
            Animated.timing(animatedColor, { toValue: 1, duration: 200 }).start(() => {
              props.onChoice(env.CUPCHOICE, {
                price: props.price,
                size: props.size,
                category: props.category,       // Seleciona o copo
                amountAdditional: 0,
                freeAdditional: props.amountAdditional,
              });
            });
          });
        });
      }
      else {
        Animated.timing(translateX, { toValue: 0, duration: 500, delay: 100, easing: Easing.bounce }).start();
      }
    }
  }

  return (
    <CupChoiceContainer >

      <PurplePriceContainer
        style={{
          backgroundColor: animatedColor.interpolate({
            inputRange: [0, 1],
            outputRange: [Colors.ROXO, Colors.VERDE]
          })
        }}
      >
        <Text style={{ color: '#FFF', fontFamily: 'OpenSans-Bold', margin: 1 }} >R$</Text>
        <Text style={{ color: '#FFF', fontFamily: 'OpenSans-Light', margin: 1 }} >{props.price}</Text>
      </PurplePriceContainer>

      <PanGestureHandler
        onGestureEvent={animatedEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <WhiteCupContainer
          style={{
            transform: [
              {
                translateX: translateX.interpolate({
                  inputRange: [-50, 0, width / 4],
                  outputRange: [-5, 0, width / 4],
                  extrapolate: 'clamp'
                })
              }
            ]
          }}
        >
          <props.ico height={40} width={30} />
          <View style={{ left: 8 }}>
            <Text style={{ color: Colors.ROXO, fontFamily: 'OpenSans-Bold' }}>{props.size}ml</Text>
            <Text style={{ color: Colors.ROXO, fontFamily: 'OpenSans-Light' }}>+{props.amountAdditional} Adicionais</Text>
          </View>
        </WhiteCupContainer>
      </PanGestureHandler>

    </CupChoiceContainer>
  );
}
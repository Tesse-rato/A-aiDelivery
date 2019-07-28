import React from 'react';
import { View, Text, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

import { NavigationsButtons } from './styles';
import env from '../environment';

import SetaEsquerda from '../../../assets/setaEsquerda.svg';
import SetaDireita from '../../../assets/setaDireita.svg';

export default ({ navigationBts, mainState: { step } }) => step == env.ADDITIONALS ? (
  <>
    <NavigationsButtons
      onPress={() => navigationBts('forward')}
      style={{
        transform: [
          {
            translateY: height / 2 - 80,
          },
          {
            translateX: width - 40,
          }
        ]
      }}
    >
      <SetaDireita width={60} height={60} />
    </NavigationsButtons>
    <NavigationsButtons
      onPress={() => navigationBts('backward')}
      style={{
        transform: [
          {
            translateY: height / 2 - 80,
          },
          {
            translateX: -20,
          }
        ]
      }}
    >
      <SetaEsquerda width={60} height={60} />
    </NavigationsButtons>
  </>
) : null
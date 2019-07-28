import React, { Component } from 'react';
import { Animated, Dimensions, Easing } from 'react-native';

const { width, height } = Dimensions.get('window');

import env from '../environment';

import { Container, WhiteCard } from './styles';

export default class Background extends Component {

  constructor() {
    super();

    this.state = {
      step: env.CUPCHOICE,
    }

    this.animatedValues = {
      whiteCardTransform: new Animated.Value(0),
      whiteCardBorderRadius: new Animated.Value(1),
    }

    this.interpolatedValues = {
      whiteCardTransform: [
        {
          translateY: this.animatedValues.whiteCardTransform.interpolate({
            inputRange: [0, 1, 2, 3],
            outputRange: [height, height / 2, 0, -height]
          }, { useNativeDriver: true })
        },
        {
          scaleX: this.animatedValues.whiteCardTransform.interpolate({
            inputRange: [0, 1, 1.3, 2, 3],
            outputRange: [.6, 1, .9, 1, .9],
            extrapolate: 'clamp'
          }, { useNativeDriver: true })
        },
        {
          scaleY: this.animatedValues.whiteCardTransform.interpolate({
            inputRange: [0, 1, 2, 3],
            outputRange: [0, 1, 1, .9],
            extrapolate: 'clamp'
          }, { useNativeDriver: true })
        }
      ]
    }
  }

  componentDidMount() {
    Animated.timing(this.animatedValues.whiteCardTransform, { toValue: 1, duration: 200 }).start();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.mainState.step != this.state.step
  }

  componentDidUpdate() {
    if (this.state.step != this.props.mainState.step) {
      console.log('Atualizou aqui no index Background');

      const { mainState: { step } } = this.props;

      if (step == env.CUPCHOICE) {
        this.componentDidMount();
      }
      else if (step == env.FREEADDITIONAL || step == env.ADDITIONALS) {
        Animated.timing(this.animatedValues.whiteCardTransform, { toValue: 2, duration: 200, easing: Easing.linear }).start();
      }
      else if (step == env.PAYMENT) {
        Animated.timing(this.animatedValues.whiteCardTransform, { toValue: 3, duration: 200, delay: 1000 }).start();
      }
    }

    this.setState({ step: this.props.mainState.step });

  }

  render() {
    console.disableYellowBox = true;
    return (
      < Container source={require('../../../assets/Background.png')} >
        <WhiteCard
          style={{
            transform: this.interpolatedValues.whiteCardTransform,
          }}
        />
      </Container >
    );
  }
}
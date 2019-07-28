import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

import Colors from '../../../assets/colors';

import { Button, Input, Alert } from './styles';

export default class Order extends Component {
  constructor() {
    super();

    this.state = {
      acaiOwner: '',
    }

    this.animatedValues = {
      alert: new Animated.Value(0)
    }

    this.interpolatedValue = {
      alertTransform: [
        {
          translateX: this.animatedValues.alert.interpolate({
            inputRange: [0, .25, .5, .75, 1, 1.25, 1.5, 1.75, 2],
            outputRange: [0, -50, 50, -25, 25, -12.5, 12.5, -6, 0],
          }, { useNativeDriver: true })
        }
      ]
    }
  }

  _onChoice(field) {
    if (!this.state.acaiOwner) return this.noOwner();

    this.props.onChoice(field, this.state.acaiOwner);
  }

  noOwner() {
    this.animatedValues.alert.setValue(0);
    Animated.timing(this.animatedValues.alert, { toValue: 2, duration: 1000 }).start();
  }

  render() {
    return (
      <>
        <View style={{ flex: 1, height: 200, alignItems: 'center', alignContent: 'space-around', justifyContent: 'space-evenly' }}>
          <Animated.View
            style={{
              transform: this.interpolatedValue.alertTransform,
              alignSelf: 'center'
            }}
          >
            <Input
              style={{
                borderColor: Colors.ROXO,
                width: 300,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: StyleSheet.hairlineWidth,
              }}
              onFocus={this.props.onInputFocus}
              onBlur={this.props.onInputBlur}
              onChangeText={text => { this.setState({ acaiOwner: text }) }}
              placeholderTextColor={Colors.ROXO}
              placeholder='De quem é esse açai?'
            />
          </Animated.View>

          <Button onPress={() => this._onChoice('continue')} style={{ backgroundColor: Colors.ROXO }}>
            <Text style={{ color: '#FFF', fontFamily: 'OpenSans-Bold' }}>Continuar Pedindo</Text>
          </Button>
          <Button onPress={() => this._onChoice('finish')} style={{ borderWidth: 0 }}>
            <Text style={{ color: Colors.ROXO, fontFamily: 'OpenSans-Bold' }}>Finalizar Pedido</Text>
          </Button>
        </View>
      </>
    );
  }
}
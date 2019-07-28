import React, { Component } from 'react';
import { Animated, Dimensions, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

import env from '../environment';

import Background from '../background';
import Header from '../header';
import Steps from '../steps';
import Choices from '../choices';
import NavigationBts from '../navigationBts';

import { Container, NavigationsButtons } from './styles';
import { throwStatement } from '@babel/types';


class Main extends Component {

  constructor() {
    super();

    this.state = {
      currentState: {
        step: env.CUPCHOICE,
        orders: [],
        logoColor: 'WHITE',
        cupChoice: {
          size: '',
          category: '',
          price: '',
          amountAdditional: '',
          freeAdditionals: '',
          additionals: new Array(),
          owner: '',
        },
        inputFocus: false
      },
      oldState: [],
    }

    this.animatedValues = {
      container: new Animated.Value(0),
    }
  }

  componentDidMount() {
    Animated.timing(this.animatedValues.container, { toValue: 1, duration: 300, delay: 100 }).start();
  }

  async changeMainState(cb) {
    if (typeof cb != 'function') throw new Error('Props on changeMainState() might be function!');

    const newState = await cb(this.state);

    this.setState(newState);
  }

  onChoice(field, props, price) {

    const { currentState: { step } } = this.state;

    if (field == env.CUPCHOICE) {
      this.setState(state => {
        state.oldState.push(state.currentState);
        state.currentState = {
          ...state.currentState,
          logoColor: 'PURPLE',
          step: env.FREEADDITIONAL,
          cupChoice: props,
        };
        return state;
      });
    } else if (field == '+additionals') {
      this.setState(state => {
        if (step == env.FREEADDITIONAL) {
          state.currentState.cupChoice.freeAdditional = parseInt(state.currentState.cupChoice.freeAdditional);
          state.currentState.cupChoice.freeAdditional--;
        } else {
          state.currentState.cupChoice.price = parseFloat(state.currentState.cupChoice.price);
          state.currentState.cupChoice.price += parseFloat(price);
        }

        state.currentState.cupChoice.amountAdditional = parseInt(state.currentState.cupChoice.amountAdditional);
        state.currentState.cupChoice.amountAdditional++;

        if (!state.currentState.cupChoice.additionals) {
          state.currentState.cupChoice.additionals = new Array();
        }

        state.currentState.cupChoice.additionals.push(props);

        return state;
      }, () => {
        console.log(this.state);
      });
    } else if (field == '-additionals') {
      this.setState(state => {
        if (step == env.FREEADDITIONAL) {
          state.currentState.cupChoice.freeAdditional = parseInt(state.currentState.cupChoice.freeAdditional);
          state.currentState.cupChoice.freeAdditional++;
        } else {
          state.currentState.cupChoice.price = parseFloat(state.currentState.cupChoice.price);
          state.currentState.cupChoice.price -= parseFloat(price);
        }

        state.currentState.cupChoice.amountAdditional = parseInt(state.currentState.cupChoice.amountAdditional);
        state.currentState.cupChoice.amountAdditional--;
        state.currentState.cupChoice.additionals = state.currentState.cupChoice.additionals.filter(additional => additional != props);

        return state;
      }, () => {
        console.log(this.state);
      });
    } else if (step == env.ORDER) {
      if (field == 'continue') {
        this.setState(state => {
          if (!state.currentState.orders.length) state.currentState.orders = new Array();

          state.currentState.cupChoice.owner = props;
          state.currentState.orders.push(state.currentState.cupChoice);
          state.currentState.step = env.CUPCHOICE;

          return state;
        });
      } else if (field == 'finish') {
        this.setState(state => {
          if (!state.currentState.orders.length) state.currentState.orders = new Array();

          state.currentState.cupChoice.owner = props;
          state.currentState.orders.push(state.currentState.cupChoice);
          state.oldState.push(state.currentState);
          state.currentState.step = env.PAYMENT;

          return state;
        });
      }
    }
  }

  navigation(props) {

    const { currentState: { step } } = this.state;

    if (props == 'forward') {
      if (step == env.ADDITIONALS) {

        this.setState(state => {
          state.oldState.push(state.currentState);
          state.currentState = {
            ...state.currentState,
            logoColor: 'WHITE',
            step: env.ORDER,
          };
          return state;
        });
      }
    }
    else if (props == 'backward') {

      let { currentState, oldState } = this.state;

      if (oldState.length > 0) {

        currentState = oldState[oldState.length - 1];
        oldState.pop();

        this.setState({ currentState, oldState });
      }

    }
  }

  render() {
    console.disableYellowBox = true;

    const { currentState } = this.state;
    return (
      <Container style={{ opacity: this.animatedValues.container }}>

        <StatusBar barStyle='light-content' backgroundColor='#250C3D' />

        <Background mainState={currentState} />

        <Header mainState={currentState} />

        <Steps mainState={currentState} />

        <NavigationBts
          mainState={currentState}
          navigationBts={this.navigation.bind(this)}
        />

        <Choices
          mainState={currentState}
          onChoice={this.onChoice.bind(this)}
          changeMainState={this.changeMainState.bind(this)}
          onInputFocus={() => this.setState(state => { state.currentState.inputFocus = true; return state; })}
          onInputBlur={() => this.setState(state => { state.currentState.inputFocus = false; return state; })}
        />

      </Container>
    );
  }
}

export default Main;
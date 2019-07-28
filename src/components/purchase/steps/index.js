import React, { Component } from 'react';
import { Animated, Text, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

import env from '../environment';

import Colors from '../../../assets/colors';

import StatusCircle from './statusCircle';
import Icons from './icons';

import {
  Container,
  AnimatedText,
  AnimatedTextContainer,
  IconsContainer,
} from './styles';

class Steps extends Component {
  constructor() {
    super();

    this.state = {
      step: env.CUPCHOICE,
      price: '',
      inputFocus: false,
      textTop: 'Açaí em 3 Passos',
      textMiddle: 'Primeiro você escolhe',
      textBottom: 'o tamanho :)',
    }

    this.animatedValues = {
      stepsCircleColor: new Animated.Value(0),
      stepsTextColor: new Animated.Value(0),
      stepsTextOpacity: new Animated.Value(0),
      iconsContainerOpacity: new Animated.Value(0),
      containerTransform: new Animated.Value(.9),
    }

    this.interpolatadValues = {
      stepsTextColor: this.animatedValues.stepsTextColor.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.CINZA, Colors.ROXO]
      }),
      circleColor: [
        this.animatedValues.stepsCircleColor.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [Colors.VERDE, Colors.CINZA, Colors.CINZA]
        }),
        this.animatedValues.stepsCircleColor.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [Colors.CINZA, Colors.VERDE, Colors.CINZA]
        }),
        this.animatedValues.stepsCircleColor.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [Colors.CINZA, Colors.CINZA, Colors.VERDE]
        }),
      ],
      containerTransform: [
        {
          translateY: this.animatedValues.containerTransform.interpolate({
            inputRange: [0, 1],
            outputRange: [-width, 0]
          })
        }
      ]
    }
  }

  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.animatedValues.containerTransform, { toValue: 1, duration: 200, delay: 300 }),
      Animated.timing(this.animatedValues.stepsTextOpacity, { toValue: 1, duration: 200, delay: 400 }),
      Animated.timing(this.animatedValues.iconsContainerOpacity, { toValue: 1, duration: 200, delay: 400 })
    ]).start();

  }

  shouldComponentUpdate(nextProps, nextState) {
    const { mainState: { step, inputFocus, cupChoice: { price } } } = nextProps;

    console.log('Steps deve atualizar? ', step != this.state.step || inputFocus != this.state.inputFocus || price != this.state.price);

    return step != this.state.step || inputFocus != this.state.inputFocus || price != this.state.price;
  }

  componentDidUpdate() {
    if (this.props.mainState.step != this.state.step || this.props.mainState.inputFocus != this.state.inputFocus) {
      console.log('Atualizou aqui no index Steps');

      const { step, inputFocus } = this.props.mainState;

      if (step == env.CUPCHOICE) {
        this.animContainer({
          value: false, cb: () => {
            console.log('Tela Escolha do Copo');
            this.setState({
              step,
              inputFocus,
              textTop: 'É rapidinho',
              textMiddle: 'Vamos começar de novo',
              textBottom: 'fique a vontade!',
            }, () => {
              this.animContainer({
                value: true, cb: () => {
                  this.animTextColor(0);
                  this.animCircleStatus(0);
                }
              });
            });
          }
        });
      } else if (step == env.FREEADDITIONAL || step == env.ADDITIONALS) {
        let delay = 2000;
        this.animContainer({
          value: false, delay, cb: () => {
            this.setState({
              step,
              inputFocus,
              textTop: 'R$ ' + parseFloat(this.props.mainState.cupChoice.price).toFixed(2),
              textMiddle: 'Agora você escolhe',
              textBottom: 'seus adicionais preferidos',
            }, () => {
              this.animContainer({
                value: true, cb: () => {
                  this.animTextColor(1);
                  this.animCircleStatus(1);
                }
              });
            });
          }
        });
      } else if (step == env.PAYMENT && this.state.step != step) {
        setTimeout(() => {
          const phrases1 = [
            'Quase lá',
            'Mas vai ser uma DLÇ',
            'Açai faz bem pra vida'
          ], phrases2 = [
            'Já deu àgua na boca',
            'Tá preparado?',
            'Já escolheu o filme?',
            'Você vai se amarrar',
            'Uhull!!'
          ]
          this.animContainer({
            value: false, cb: () => {
              this.setState({
                step,
                inputFocus,
                textTop: phrases1[Math.floor(Math.random() * phrases1.length)],
                textMiddle: '',
                textBottom: phrases2[Math.floor(Math.random() * phrases2.length)],
              }, () => {
                this.animContainer({
                  value: true, cb: () => {
                    this.animTextColor(0);
                    this.animCircleStatus(2);
                  }
                });
              });
            }
          });
        }, 1000);
      } else if (this.state.inputFocus != inputFocus) {
        if (inputFocus) {
          Animated.timing(this.animatedValues.containerTransform, { toValue: 0, duration: 200 }).start();
        } else {
          Animated.timing(this.animatedValues.containerTransform, { toValue: 1, duration: 200 }).start();
        }
        this.setState({ inputFocus });
      }
    } else if (this.props.mainState.cupChoice.price != this.state.price && this.state.step == env.ADDITIONALS) {
      const { mainState: { cupChoice: { price } } } = this.props;
      this.setState({ textTop: 'R$ ' + parseFloat(price).toFixed(2), price });
    }
  }


  render() {

    const { stepsTextColor, containerTransform } = this.interpolatadValues;
    const { stepsTextOpacity, iconsContainerOpacity } = this.animatedValues;

    return (
      <Container
        style={{
          transform: containerTransform
        }}
      >

        <IconsContainer style={{ opacity: iconsContainerOpacity }} >
          <Icons
            step={this.state.step}
          />
        </IconsContainer>

        <StatusCircle
          animatedColor={this.interpolatadValues.circleColor}
        />

        <AnimatedTextContainer style={{ opacity: stepsTextOpacity }}>
          <AnimatedText style={{ color: stepsTextColor, fontFamily: 'OpenSans-Bold', fontSize: 20 }} >
            {this.state.textTop}
          </AnimatedText>
          <AnimatedText style={{ color: stepsTextColor, fontFamily: 'OpenSans-Light', fontSize: 14 }} >
            {this.state.textMiddle}
          </AnimatedText>
          <AnimatedText style={{ color: stepsTextColor, fontFamily: 'OpenSans-Light', fontSize: 14 }} >
            {this.state.textBottom}
          </AnimatedText>
        </AnimatedTextContainer>


      </Container>
    );
  }
  animContainer({ value, delay, cb }) {
    Animated.parallel([
      Animated.timing(this.animatedValues.iconsContainerOpacity, { toValue: value ? 1 : 0, duration: 50, delay: delay ? delay : 0 }),
      Animated.timing(this.animatedValues.stepsTextOpacity, { toValue: value ? 1 : 0, duration: 50, delay: delay ? delay : 0 })
    ]).start(cb ? cb : null);
  }

  animCircleStatus(value, cb) {
    Animated.timing(this.animatedValues.stepsCircleColor, { toValue: value, duration: 1000 }).start(cb ? cb : null);
  }

  animTextColor(value, cb) {
    Animated.timing(this.animatedValues.stepsTextColor, { toValue: value ? 1 : 0, duration: 100 }).start(cb ? cb : null);
  }

}


export default Steps;
import React, { Component } from 'react';
import { Text, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

import Colors from '../../../assets/colors';
import CopoMedida from '../../../assets/copoMedidaRoxo.svg';
import Barca from '../../../assets/barcaRoxo.svg';

import Api from '../../../api';
import env from '../environment';

import { Container, Title, ChoicesScroll } from './styles';

import CupChoice from './cupChoice';
import AdressForm from './adressForm';
import Order from './order';
import { UmCinquenta, UmVinteCinco, DoisCinquenta } from './additionalChoice';

class Choices extends Component {
  constructor() {
    super();

    this.state = {
      step: env.CUPCHOICE,
      textTop: 'Qual o Tamanho da Sua Fome?',
      amountAdditionals: null,
      inputFocus: false,
      freeAdditional: '',
    }
    this.animatedValues = {
      transform: new Animated.Value(0),
      opacity: new Animated.Value(0),
      textTopColor: new Animated.Value(0),
    }
    this.interpolatedValues = {
      cupChoiceTransform: [
        {
          translateY: this.animatedValues.transform.interpolate({
            inputRange: [0, .5, 1, 2],
            outputRange: [height / 2, height / 2, 0, -((height / 2) - 60)]
          }, { useNativeDriver: true })
        }
      ],
      cupChoiceOpacity: this.animatedValues.opacity.interpolate({
        inputRange: [0, .85, 1],
        outputRange: [0, 0, 1]
      }),
      textTopColor: this.animatedValues.textTopColor.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.ROXO, '#FFF']
      })
    }
  }
  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.animatedValues.transform, { toValue: 1, duration: 500 }),
      Animated.timing(this.animatedValues.opacity, { toValue: 1, duration: 700 }),
    ]).start();
  }
  shouldComponentUpdate(nextProps, nextState) {

    if (this.state.step == env.ADDITIONALS) {
      this.state.textTop = `Você já escolheu ${nextProps.mainState.cupChoice.amountAdditional} adicionais`
    }

    const { mainState } = nextProps;
    const { amountAdditionals: nextAmountAdditionals, freeAdditional: nextStateFreeAdditional } = nextState;
    const { step, amountAdditionals, inputFocus, freeAdditional } = this.state;

    this.state.amountAdditionals = nextProps.mainState.cupChoice.amountAdditional;
    this.state.freeAdditional = nextProps.mainState.cupChoice.freeAdditional;

    return mainState.step != step ||
      mainState.inputFocus != inputFocus ||
      mainState.cupChoice.amountAdditional != amountAdditionals ||
      freeAdditional != nextStateFreeAdditional;
  }
  componentDidUpdate() {
    console.log('Atualizou aqui no index Choices');

    const { mainState: { step, inputFocus, cupChoice: { amountAdditional } } } = this.props;

    const animToChangeContent = cb => {
      setTimeout(() => {
        Animated.sequence([
          Animated.timing(this.animatedValues.transform, { toValue: .99, duration: 200, delay: 100 }),
          Animated.timing(this.animatedValues.opacity, { toValue: 0, duration: 150 }),

        ]).start(() => {
          if (cb) cb();
          Animated.sequence([
            Animated.timing(this.animatedValues.opacity, { toValue: 1, duration: 150 }),
            Animated.timing(this.animatedValues.transform, { toValue: 1, duration: 200, delay: 100 }),
          ]).start();
        });
      }, 500);
    }

    if (step != this.state.step) {
      if (step == env.CUPCHOICE) {
        this.componentDidMount();
        animToChangeContent(() => {
          this.setState({ step, inputFocus, textTop: `Qual Tamanha da Sua Fome Hoje? ` });
        });
      }
      else if (step == env.FREEADDITIONAL) {
        animToChangeContent(() => {
          this.setState({ step, inputFocus, textTop: `Você tem ${this.state.freeAdditional} adicionais gratis` }, () => {
            Animated.timing(this.animatedValues.textTopColor, { toValue: 0, duration: 200, delay: 1000 }).start(() => {
              this.scrollRef.scrollTo({ x: 0, y: 0 });
            });
          });
        });
      }
      else if (step == env.ADDITIONALS) {
        animToChangeContent(() => {
          this.setState({ step, inputFocus, textTop: `Você já escolheu ${amountAdditional} adicionais` }, () => {
            this.scrollRef.scrollTo({ x: 0, y: 0 });
          });
        });
      }
      else if (step == env.ORDER) {
        const phrases = [
          'Aposto que você quer mais um!!',
          'Hmmmmmmmmmmm mais um?',
          'Alguem do seu lado? Pede um pra ele(a).',
          'Prove que você ama açai <3',
          'Já pede outro pra mais tarde...',
          'Só um dá? Será??',
        ]
        animToChangeContent(() => {
          this.setState({ step, inputFocus, textTop: phrases[Math.floor(Math.random() * phrases.length)] }, () => {
            this.scrollRef.scrollTo({ x: 0, y: 0 });
          });
        });
      }
      else if (step == env.PAYMENT) {
        animToChangeContent(() => {
          this.setState({ step, inputFocus, textTop: `Confirme Seus Dados` }, () => {
            Animated.timing(this.animatedValues.textTopColor, { toValue: 1, duration: 200, delay: 500 }).start();
          });
        });
      }
    } else if (inputFocus != this.state.inputFocus) {
      if (inputFocus) {
        Animated.timing(this.animatedValues.transform, { toValue: 2, duration: 100 }).start();
      }
      else {
        Animated.timing(this.animatedValues.transform, { toValue: 1, duration: 200 }).start();
      }
      this.setState({ inputFocus });
    }
  }
  _increase() {
    let { step, freeAdditional } = this.state;

    if (step == env.FREEADDITIONAL && freeAdditional > 0) {
      freeAdditional = parseInt(freeAdditional);
      freeAdditional--;

      this.setState({
        freeAdditional: freeAdditional,
        textTop: `Agora ${freeAdditional} adicionais gratis`
      }, () => {
        if (!freeAdditional) {
          setTimeout(() => {
            this.props.changeMainState(state => {
              state.currentState.step = env.ADDITIONALS;
              return state;
            });
          }, 1000);
        }
      });
    }
  }
  _decrease() {
    let { step, freeAdditional } = this.state;

    if (step == env.FREEADDITIONAL) {
      freeAdditional = parseInt(freeAdditional);
      freeAdditional++;

      this.setState({
        freeAdditional: freeAdditional,
        textTop: `Você tem ${freeAdditional} adicionais gratis`
      });
    }
  }
  render() {

    const { step } = this.state;
    const { cupChoiceTransform: transform, cupChoiceOpacity: opacity, textTopColor } = this.interpolatedValues;

    return (
      <Container style={{ transform, opacity }}>

        <Title
          style={{
            color: textTopColor
          }}
        >
          {this.state.textTop}
        </Title>

        <ChoicesScroll ref={ref => this.scrollRef = ref}>
          {
            step == env.CUPCHOICE ? Api.acai.map(obj => (
              <CupChoice
                onChoice={this.props.onChoice}
                key={obj.price.toString()}
                ico={obj.category == 'copo' ? CopoMedida : Barca}
                price={obj.price}
                amountAdditional={obj.additional}
                size={obj.size}
                category={obj.category}
              />
            )) : step == env.FREEADDITIONAL ? (
              <UmVinteCinco
                increase={this._increase.bind(this)}
                decrease={this._decrease.bind(this)}
                onChoice={this.props.onChoice}
                price='1.25'
              />
            ) : step == env.ADDITIONALS ? (
              <>
                <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 16, alignSelf: 'center', marginBottom: 5 }} >R$2,50</Text>
                <DoisCinquenta
                  increase={this._increase.bind(this)}
                  decrease={this._decrease.bind(this)}
                  onChoice={this.props.onChoice}
                  price='2.50'
                />
                <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 16, alignSelf: 'center', marginBottom: 5 }} >R$1,50</Text>
                <UmCinquenta
                  increase={this._increase.bind(this)}
                  decrease={this._decrease.bind(this)}
                  onChoice={this.props.onChoice}
                  price='1.50'
                />
                <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 16, alignSelf: 'center', marginBottom: 5 }} >R$1,25</Text>
                <UmVinteCinco
                  increase={this._increase.bind(this)}
                  decrease={this._decrease.bind(this)}
                  onChoice={this.props.onChoice}
                  price='1.25'
                />
              </>
            ) : step == env.ORDER ? (

              <Order
                onInputFocus={this.props.onInputFocus}
                onInputBlur={this.props.onInputBlur}
                onChoice={this.props.onChoice}
              />

            ) : step == env.PAYMENT ? (
              <AdressForm
                onInputFocus={this.props.onInputFocus}
                onInputBlur={this.props.onInputBlur}
                mainState={this.props.mainState}
              />
            ) : null
          }

        </ChoicesScroll>
      </Container>
    );
  }
}

export default Choices;
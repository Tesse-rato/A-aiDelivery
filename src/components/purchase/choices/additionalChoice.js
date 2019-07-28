import React, { Component } from 'react';
import { Text, Animated, Dimensions, Easing, Image } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

import {
  AdditionalChoiceContainer,
  AdditionalDecreaseContaiter,
  AdditionalIncreaseContainer,
  AdditionalCenterContaiter,
  AddittionalCenterDescription
} from './styles';

import Colors from '../../../assets/colors';
import MaisIco from '../../../assets/mais.svg';
import MenosIco from '../../../assets/menos.svg';
import CastanhaRoxo from '../../../assets/granolaRoxo.svg';
import CastanhaBranco from '../../../assets/granolaBranco.svg';
import LeiteCondensadoBranco from '../../../assets/leiteCondensadoBranco.svg';
import LeiteCondensadoRoxo from '../../../assets/leiteCondensadoRoxo.svg';
import LeiteNinhoBranco from '../../../assets/leiteNinhoBranco.svg';
import LeiteNinhoRoxo from '../../../assets/leiteNinhoRoxo.svg';
import PacocaBranco from '../../../assets/pacocaBranco.svg';
import PacocaRoxo from '../../../assets/pacocaRoxo.svg';
import MorangoRoxo from '../../../assets/morangoRoxo.svg';
import MorangoBranco from '../../../assets/morangoBranco.svg';
import BananaRoxo from '../../../assets/bananaRoxo.svg';
import BananaBranco from '../../../assets/bananaBranco.svg';
import KiwiRoxo from '../../../assets/kiwiRoxo.svg';
import KiwiBranco from '../../../assets/kiwiBranco.svg';
const ChocoPower = require('../../../assets/ChocoPower.png');
const GotasChocolate = require('../../../assets/GotasDeChocolate.png');
const ConfeteChocolate = require('../../../assets/ConfeteChocolate.png');
const Nutella = require('../../../assets/Nutella.png');
const KitKat = require('../../../assets/KitKat.png');
const SonhoValsa = require('../../../assets/SonhoValsa.png');
const Bis = require('../../../assets/Bis.png');
const Baton = require('../../../assets/Baton.png');


class AdditionalSlidingContainer extends Component {
  constructor() {
    super();

    this.translateX = new Animated.Value(0);
    this.color = new Animated.Value(0);
    this.count = 0;
    this.animatedEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this.translateX
          }
        }
      ]
    );
  }

  onHandlerStateChange({ nativeEvent }) {
    if (nativeEvent.oldState == State.ACTIVE) {

      const { translationX } = nativeEvent;

      console.log(translationX);

      if (translationX > 0) {
        if (translationX < ((width / 2 - (10 + 90)) / 2)) {
          Animated.timing(this.translateX, { toValue: 0, duration: 1000, easing: Easing.bounce }).start();
        }
        else {
          Animated.timing(this.translateX, { toValue: width / 4 - 20, duration: 300 }).start(() => {
            Animated.timing(this.translateX, { toValue: 0, duration: 300 }).start(() => {
              if (this.count == 0)
                Animated.timing(this.color, { toValue: 1, duration: 500, delay: 200 }).start();
              this.count++;
              this.props.increase();
              this.props.onChoice('+additionals', this.props.description, this.props.price);
            });
          });
        }
      }
      else if (translationX < 0) {
        if (-translationX < width / 4 - 40) {
          Animated.timing(this.translateX, { toValue: 0, duration: 1000, easing: Easing.bounce }).start();
        }
        else {
          if (this.count > 0) {
            Animated.timing(this.translateX, { toValue: -(width / 4 - 20), duration: 300 }).start(() => {
              Animated.timing(this.translateX, { toValue: 0, duration: 300 }).start(() => {
                if (this.count == 1)
                  Animated.timing(this.color, { toValue: 0, duration: 500, delay: 200 }).start();
                this.count--;
                this.props.decrease();
                this.props.onChoice('-additionals', this.props.description, this.props.price);
              });
            });
          }
          else {
            Animated.timing(this.translateX, { toValue: 0, duration: 500, easing: Easing.bounce }).start();
          }
        }
      }
    }
  }
  render() {
    return (
      <PanGestureHandler
        onGestureEvent={this.animatedEvent}
        onHandlerStateChange={this.onHandlerStateChange.bind(this)}
      >
        <AdditionalCenterContaiter
          style={{
            backgroundColor: this.color.interpolate({
              inputRange: [0, 1],
              outputRange: [Colors.CINZA, Colors.ROXO]
            }),
            transform: [{
              translateX: this.translateX.interpolate({
                inputRange: [-width / 4, 0, width / 4],
                outputRange: [-width / 4, 0, width / 4],
                extrapolate: 'clamp'
              }),
            }]
          }}
        >
          {this.props.svg ? (this.count > 0 ? (
            <this.props.icoBranco width={60} height={35} />
          ) : (
              <this.props.icoRoxo width={60} height={35} />
            )) : (
              <Image source={this.props.png} resizeMode='contain' style={{ width: 60, height: 35 }} />
            )}
          <AddittionalCenterDescription style={{ color: this.count > 0 ? '#FFF' : Colors.ROXO }} >{this.props.description}</AddittionalCenterDescription>
        </AdditionalCenterContaiter>
      </PanGestureHandler>
    );
  }
}

const AdditionalDecrease = props => (
  <AdditionalDecreaseContaiter>
    <MenosIco width={30} />
  </AdditionalDecreaseContaiter>

);

const AdditionalIncrease = props => (
  <AdditionalIncreaseContainer>
    <MaisIco width={30} />
  </AdditionalIncreaseContainer>
);

export const UmVinteCinco = props => {
  return (
    <>
      <AdditionalChoiceContainer>
        <AdditionalDecrease />
        <AdditionalIncrease />
        <AdditionalSlidingContainer
          svg
          increase={props.increase}
          decrease={props.decrease}
          icoRoxo={CastanhaRoxo}
          icoBranco={CastanhaBranco}
          onChoice={props.onChoice}
          description='Granola'
          price={props.price}
        />

      </AdditionalChoiceContainer>
      <AdditionalChoiceContainer>
        <AdditionalDecrease />
        <AdditionalIncrease />
        <AdditionalSlidingContainer
          svg
          increase={props.increase}
          decrease={props.decrease}
          icoRoxo={LeiteCondensadoRoxo}
          icoBranco={LeiteCondensadoBranco}
          onChoice={props.onChoice}
          description='Leite Condensado'
          price={props.price}
        />
      </AdditionalChoiceContainer>
      <AdditionalChoiceContainer>
        <AdditionalDecrease />
        <AdditionalIncrease />
        <AdditionalSlidingContainer
          svg
          increase={props.increase}
          decrease={props.decrease}
          icoRoxo={LeiteNinhoRoxo}
          icoBranco={LeiteNinhoBranco}
          onChoice={props.onChoice}
          description='Leite Ninho'
          price={props.price}
        />
      </AdditionalChoiceContainer>
      <AdditionalChoiceContainer>
        <AdditionalDecrease />
        <AdditionalIncrease />
        <AdditionalSlidingContainer
          svg
          increase={props.increase}
          decrease={props.decrease}
          icoRoxo={PacocaRoxo}
          icoBranco={PacocaBranco}
          onChoice={props.onChoice}
          description='Paçoca'
          price={props.price}
        />
      </AdditionalChoiceContainer>
    </>
  );
}
export const UmCinquenta = props => {
  return (
    <>
      <AdditionalChoiceContainer>
        <AdditionalDecrease />
        <AdditionalIncrease />
        <AdditionalSlidingContainer
          png={ChocoPower}
          increase={props.increase}
          decrease={props.decrease}
          onChoice={props.onChoice}
          description='ChocoPower'
          price={props.price}
        />

      </AdditionalChoiceContainer>
      <AdditionalChoiceContainer>
        <AdditionalDecrease />
        <AdditionalIncrease />
        <AdditionalSlidingContainer
          png={GotasChocolate}
          increase={props.increase}
          decrease={props.decrease}
          onChoice={props.onChoice}
          description='Gotas de Chocolate'
          price={props.price}
        />

      </AdditionalChoiceContainer>
      <AdditionalChoiceContainer>
        <AdditionalDecrease />
        <AdditionalIncrease />
        <AdditionalSlidingContainer
          png={ConfeteChocolate}
          increase={props.increase}
          decrease={props.decrease}
          onChoice={props.onChoice}
          description='Confete de Chocolate'
          price={props.price}
        />

      </AdditionalChoiceContainer>
      <AdditionalChoiceContainer>
        <AdditionalDecrease />
        <AdditionalIncrease />
        <AdditionalSlidingContainer
          svg
          increase={props.increase}
          decrease={props.decrease}
          icoRoxo={MorangoRoxo}
          icoBranco={MorangoBranco}
          onChoice={props.onChoice}
          description='Morango'
          price={props.price}
        />

      </AdditionalChoiceContainer>
      <AdditionalChoiceContainer>
        <AdditionalDecrease />
        <AdditionalIncrease />
        <AdditionalSlidingContainer
          svg
          increase={props.increase}
          decrease={props.decrease}
          icoRoxo={BananaRoxo}
          icoBranco={BananaBranco}
          onChoice={props.onChoice}
          description='Banana'
          price={props.price}
        />

      </AdditionalChoiceContainer>
      <AdditionalChoiceContainer>
        <AdditionalDecrease />
        <AdditionalIncrease />
        <AdditionalSlidingContainer
          svg
          increase={props.increase}
          decrease={props.decrease}
          icoRoxo={KiwiRoxo}
          icoBranco={KiwiBranco}
          onChoice={props.onChoice}
          description='Kiwi'
          price={props.price}
        />

      </AdditionalChoiceContainer>
    </>
  );
}
export const DoisCinquenta = props => {
  return (
    <>
      <AdditionalChoiceContainer>
        <AdditionalDecrease />
        <AdditionalIncrease />
        <AdditionalSlidingContainer
          png={Nutella}
          increase={props.increase}
          decrease={props.decrease}
          onChoice={props.onChoice}
          description='Nutella'
          price={props.price}
        />

      </AdditionalChoiceContainer>
      <AdditionalChoiceContainer>
        <AdditionalDecrease />
        <AdditionalIncrease />
        <AdditionalSlidingContainer
          png={KitKat}
          increase={props.increase}
          decrease={props.decrease}
          onChoice={props.onChoice}
          description='KitKat'
          price={props.price}
        />

      </AdditionalChoiceContainer>
      <AdditionalChoiceContainer>
        <AdditionalDecrease />
        <AdditionalIncrease />
        <AdditionalSlidingContainer
          png={Baton}
          increase={props.increase}
          decrease={props.decrease}
          onChoice={props.onChoice}
          description='Baton'
          price={props.price}
        />

      </AdditionalChoiceContainer>
      <AdditionalChoiceContainer>
        <AdditionalDecrease />
        <AdditionalIncrease />
        <AdditionalSlidingContainer
          png={SonhoValsa}
          increase={props.increase}
          decrease={props.decrease}
          onChoice={props.onChoice}
          description='SonhoValsa'
          price={props.price}
        />

      </AdditionalChoiceContainer>
      <AdditionalChoiceContainer>
        <AdditionalDecrease />
        <AdditionalIncrease />
        <AdditionalSlidingContainer
          png={Bis}
          increase={props.increase}
          decrease={props.decrease}
          onChoice={props.onChoice}
          description='Bis'
          price={props.price}
        />

      </AdditionalChoiceContainer>
    </>
  );
}
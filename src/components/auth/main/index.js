import React, { Component } from 'react';
import { Text, Animated } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Colors from '../../../assets/colors';

import {
  MiddleContainer,
  ButtonOnMiddle,
  BottomBtn,
  Container,
  BottomBtnContainer
} from './styles';

import Background from '../background';
import Inputs from '../Inputs';
import Welcome from '../welcome';

import {
  initInterpolationValues,
  animChangeMiddleContent,
  changeMainState,
  onFocusPassword,
  animAppOnStart,
  changeScene,
  onChangeText,
  verifyFields
} from './funcs';

export default class Main extends Component {

  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);

    this.initInterpolationValues = initInterpolationValues.bind(this);
    this.animChangeMiddleContent = animChangeMiddleContent.bind(this);
    this.animAppOnStart = animAppOnStart.bind(this);
    this.onFocusPassword = onFocusPassword.bind(this);
    this.changeMainState = changeMainState.bind(this);
    this.changeScene = changeScene.bind(this);
    this.onChangeText = onChangeText.bind(this);
    this.verifyFields = verifyFields.bind(this);


    this.animatedValues = {
      logo: new Animated.Value(0),
      container: new Animated.Value(0),
      middleContainer: new Animated.Value(2),
      middleOpacity: new Animated.Value(0),
      folha: new Animated.Value(0),
    }

    this.sceneStackToMiddle = {
      Welcome,
      Inputs,
    }

    this.state = {
      scene: '',
      btnTextMiddleContainer: '',
      placeholderPrimaryInput: '',
      placeholderSecondInput: '',
      btnTextBottomBtn: '',
      sceneInMiddle: null,
      name: '',
      userName: '',
      password: '',
      confirmPassword: '',
      street: '',
      district: '',
      number: '',
      city: '',
    };
  }

  async componentWillMount() {

    this.setState({
      scene: 'Welcome',
      btnTextMiddleContainer: 'Logar',
      placeholderPrimaryInput: 'Apelido',
      placeholderSecondInput: 'Senha',
      btnTextBottomBtn: 'Logar',
      secureTextEntry: true,
      sceneInMiddle: this.sceneStackToMiddle['Welcome'],
    });

    this.interpolatedValues = this.initInterpolationValues();

    this.user = JSON.parse(await AsyncStorage.getItem('@acaidelivery-user'));

  }

  componentDidMount() {
    this.animAppOnStart();
  }

  onMiddleBtnClick() {
    const { scene } = this.state;

    this.verifyFields(scene).then(() => {
      this.changeScene('MiddleBtn');
    }).catch(err => {
      alert(err);
    })
  }

  onBottomBtnClick() {
    this.changeScene('BottomBtn');
    console.log(this.state);
  }

  finishAuth() {
    console.log(this.state, 'FINISHAUTH');
    Animated.timing(this.animatedValues.folha, { toValue: 0, duration: 250, delay: 100 }).start(() => setTimeout(() => {
      this.props.changeScene(() => ({
        pageName: 'Purchase'
      }));
    }), 500);
  }

  render() {
    console.disableYellowBox = true;
    return (
      <Container>

        <Background
          folhaTransform1={this.interpolatedValues.folhaTransform1}
          folhaTransform2={this.interpolatedValues.folhaTransform2}
          logoSize={this.interpolatedValues.logoSize}
          logoMarginTop={this.interpolatedValues.logoMarginTop}
        />

        <MiddleContainer
          style={{
            transform: this.interpolatedValues.middleContainerTransform,
            opacity: this.interpolatedValues.middleOpacity,
          }}
        >
          <this.state.sceneInMiddle
            placeholderPrimaryInput={this.state.placeholderPrimaryInput}
            placeholderSecondInput={this.state.placeholderSecondInput}
            onFocus={this.onFocusPassword.bind(this)}
            onEndEditing={this.onFocusPassword.bind(this)}
            onChangeText={this.onChangeText.bind(this)}
            secureTextEntry={this.state.secureTextEntry}
            city={this.state.city}
          />

          {this.state.scene != 'Welcome' ? (
            <ButtonOnMiddle onPress={() => this.onMiddleBtnClick()}>
              <Text style={{ color: Colors.ROXO, fontSize: 18 }}>
                {this.state.btnTextMiddleContainer}
              </Text>
            </ButtonOnMiddle>
          ) : null}

        </MiddleContainer>

        <BottomBtnContainer style={{ transform: this.interpolatedValues.bottomBtnTransform }}>
          <BottomBtn onPress={() => { this.onBottomBtnClick() }}>
            <Text style={{ color: Colors.VERDE }}>
              {this.state.btnTextBottomBtn}
            </Text>
          </BottomBtn>
        </BottomBtnContainer>

      </Container >
    );
  }
}

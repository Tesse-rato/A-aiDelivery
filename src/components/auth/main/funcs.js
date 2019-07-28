import { Animated } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {
  verifyUserName,
  login,
  register
} from '../../../api';

export function initInterpolationValues() {
  return {
    logoSize: this.animatedValues.logo.interpolate({
      inputRange: [0, 1, 2, 3],
      outputRange: [0, 50, 170, 100]
    }),
    logoMarginTop: this.animatedValues.logo.interpolate({
      inputRange: [0, 1, 2, 3],
      outputRange: [0, 5, 20, 10]
    }),
    containerOpacity: this.animatedValues.container.interpolate({
      inputRange: [0, .5, 1],
      outputRange: [0, .8, 1]
    }),
    middleContainerTransform: [
      {
        translateX: this.animatedValues.middleContainer.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [-20, 0, 20],
          extrapolate: 'clamp'
        }, { useNativeDriver: true })
      },
      {
        translateY: this.animatedValues.logo.interpolate({
          inputRange: [0, 2, 3],
          outputRange: [0, 150, 100],
          extrapolate: 'clamp'
        })
      }
    ],
    middleOpacity: this.animatedValues.middleOpacity.interpolate({
      inputRange: [0, .5, 1, 1.5, 2],
      outputRange: [0, 1, 1, 1, 0],
      extrapolate: 'clamp'
    }),
    bottomBtnTransform: [
      {
        scale: this.animatedValues.middleOpacity.interpolate({
          inputRange: [0, 1],
          outputRange: [.2, 1],
          extrapolte: 'clamp'
        })
      },
      {
        translateY: this.animatedValues.middleOpacity.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 0]
        })
      }
    ],
    folhaTransform1: [{
      translateX: this.animatedValues.folha.interpolate({
        inputRange: [0, 1],
        outputRange: [-250, 0],
        extrapolate: 'clamp'
      }, { useNativeDriver: true })
    }],
    folhaTransform2: [
      {
        translateX: this.animatedValues.folha.interpolate({
          inputRange: [0, 1],
          outputRange: [50, -180]
        }, { useNativeDriver: true })
      },
      {
        translateY: this.animatedValues.folha.interpolate({
          inputRange: [0, 1],
          outputRange: [150, 170]
        }, { useNativeDriver: true })
      },
      {
        rotateZ: '180deg'
      },
      {
        scale: .8
      }
    ],
  };
}

export function animChangeMiddleContent(value) {
  return new Promise(resolve => {
    let duration = 100;

    if (value != 2) {
      Animated.timing(this.animatedValues.middleOpacity, { toValue: value, duration, delay: 50 }).start();
    }
    Animated.timing(this.animatedValues.middleContainer, { toValue: value, duration, delay: 50 }).start(resolve);
  });
}

export function animAppOnStart() {
  Animated.parallel([
    Animated.timing(this.animatedValues.container, { toValue: 1, duration: 300, delay: 100 }),
    Animated.timing(this.animatedValues.logo, { toValue: 2, duration: 300, delay: 100 }),
    Animated.timing(this.animatedValues.middleContainer, { toValue: 1, duration: 300, delay: 100 }),
    Animated.timing(this.animatedValues.middleOpacity, { toValue: 1, duration: 300, delay: 100 }),
    Animated.timing(this.animatedValues.folha, { toValue: 1, duration: 80000 })
  ]).start();
}

export function changeMainState(
  newState = {
    scene,
    placeholderPrimaryInput,
    placeholderSecondInput,
    btnTextMiddleContainer,
    btnTextBottomBtn,
  }
) {
  return new Promise(resolve => {
    this.animChangeMiddleContent(0).then(() => {
      if (newState.scene == 'Login')
        newState.sceneInMiddle = this.sceneStackToMiddle['Inputs']
      this.setState(newState, () => {
        this.animChangeMiddleContent(2).then(() => {
          this.animChangeMiddleContent(1).then(resolve);
        });
      });
    });
  });
}

export function onFocusPassword(value) {
  Animated.timing(this.animatedValues.logo, { toValue: value, duration: 300, delay: 100 }).start()
}

export function changeScene(btn) {
  const { scene } = this.state;

  if (btn == 'MiddleBtn') {
    switch (scene) {
      case 'Login': {
        //Logar
        alert('Logar');
        break;
      }
      case 'Register': {
        this.changeMainState({
          scene: 'Password',
          placeholderPrimaryInput: 'Senha',
          placeholderSecondInput: 'Confirmar Senha',
          btnTextMiddleContainer: 'Continuar',
          btnTextBottomBtn: 'Voltar',
        })
        break;
      }
      case 'Password': {
        this.changeMainState({
          scene: 'Adress',
          placeholderPrimaryInput: 'Cidade',
          placeholderSecondInput: 'Bairro',
          btnTextMiddleContainer: 'Continuar',
          btnTextBottomBtn: 'Voltar',
        })
        break;
      }
      case 'Adress': {
        this.changeMainState({
          scene: 'Adress2',
          placeholderPrimaryInput: 'Rua',
          placeholderSecondInput: 'Nº - Complemento',
          btnTextMiddleContainer: 'Continuar',
          btnTextBottomBtn: 'Voltar',
        })
        break;
      }
      case 'Adress2': {
        this.finishAuth();
        break;
      }
    }
  }
  else if (btn == 'BottomBtn') {
    switch (scene) {
      case 'Welcome': {
        this.changeMainState({
          scene: 'Login',
          placeholderPrimaryInput: 'Apelido',
          placeholderSecondInput: 'Senha',
          btnTextMiddleContainer: 'Logar',
          btnTextBottomBtn: 'Cadastrar',
        });
        break;
      }
      case 'Login': {
        this.changeMainState({
          scene: 'Register',
          placeholderPrimaryInput: 'Nome',
          placeholderSecondInput: 'Apelido',
          btnTextMiddleContainer: 'Continuar',
          btnTextBottomBtn: 'Voltar',
        });
        break;
      }
      case 'Register': {
        this.changeMainState({
          scene: 'Login',
          placeholderPrimaryInput: 'Apelido',
          placeholderSecondInput: 'Senha',
          btnTextMiddleContainer: 'Logar',
          btnTextBottomBtn: 'Cadastrar',
        });
        break;
      }
      case 'Password': {
        this.changeMainState({
          scene: 'Register',
          placeholderPrimaryInput: 'Nome',
          placeholderSecondInput: 'Apelido',
          btnTextMiddleContainer: 'Continuar',
          btnTextBottomBtn: 'Voltar',
        });
        break;
      }
      case 'Adress': {
        this.changeMainState({
          scene: 'Password',
          placeholderPrimaryInput: 'Senha',
          placeholderSecondInput: 'Confirmar Senha',
          btnTextMiddleContainer: 'Continuar',
          btnTextBottomBtn: 'Voltar',
        })
        break;
      }
      case 'Adress2': {
        this.changeMainState({
          scene: 'Adress',
          placeholderPrimaryInput: 'Cidade',
          placeholderSecondInput: 'Bairro',
          btnTextMiddleContainer: 'Continuar',
          btnTextBottomBtn: 'Voltar',
        })
        break;
      }
    }
  }
}

export function onChangeText(input, text) {
  const { scene } = this.state;
  let newState = this.state;

  switch (scene) {
    case 'Welcome': {
      return;
    }
    case 'Login': {
      if (input == 'first') {
        newState.userName = text;
      } else {
        newState.password = text;
      }
      break;
    }
    case 'Register': {
      if (input == 'first') {
        newState.name = text;
      } else {
        newState.userName = text;
      }
      break;
    }
    case 'Password': {
      if (input == 'first') {
        newState.password = text;
      } else {
        newState.confirmPassword = text;
      }
      break;
    }
    case 'Adress': {
      if (input == 'first') {
        newState.city = text;
      } else {
        newState.district = text;
      }
      break;
    }
    case 'Adress2': {
      if (input == 'first') {
        newState.street = text;
      } else {
        newState.number = text;
      }
      break;
    }
  }
  this.setState(newState);
}

export function verifyFields(scene) {
  return new Promise((resolve, reject) => {
    switch (scene) {
      case 'Welcome': {
        resolve();
        break;
      }
      case 'Login': {
        const { userName, password } = this.state;

        if (!userName) {
          return reject('Missing UserName');
        } else if (!password) {
          return reject('Missing Password');
        }

        login(userName, password).then(user => {
          resolve(user);
        }).catch(err => {
          reject(err);
        });
        break;
      }
      case 'Register': {
        const { userName } = this.state;
        if (!userName) {
          return reject('Missing UserName');
        }
        verifyUserName(userName).then(resolve).catch(reject);
        break;
      }
      case 'Password': {
        const { password, confirmPassword } = this.state;

        if (!password) {
          return reject('Missing Password');
        } else if (!confirmPassword) {
          return reject('Missing ConfirmPassword');
        }

        if (password != confirmPassword) {
          reject('Password don\'t match');
        } else {
          resolve();
        }
        break;
      }
      case 'Adress': {
        const { city, district } = this.state;

        if (!city) {
          return reject('Missing City');
        } else if (!district) {
          return reject('Missing District');
        }

        resolve();

        break;
      }
      case 'Adress2': {
        const { street, number, userName, password, district, name, city } = this.state;

        if (!street) {
          return reject('Missing Street');
        } else if (!number) {
          return reject('Missing Number');
        }

        register({
          street,
          number,
          userName,
          password,
          district,
          name,
          city
        }).then(user => {
          AsyncStorage.setItem('@acaidelivery-user', JSON.stringify({
            street,
            number,
            userName,
            password,
            district,
            name,
            city,
            _id: user._id
          })).then(resolve).catch(reject);

        }).catch(err => {
          reject();
        });

        break;
      }
    }
  });
}
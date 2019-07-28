import React from 'react';
import { View, Text, TouchableOpacity, Animated, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Colors from '../../../assets/colors';

import { Input } from './styles';
import Dinheiro from '../../../assets/dinheiro.svg';
import Cartao from '../../../assets/cartao.svg';
import Linha from '../../../assets/linhaPagamento.svg';
import DinheiroSelecionado from '../../../assets/dinheiroSelecionado.svg';
import CartaoSelecionado from '../../../assets/cartaoSelecionado.svg';

import { order } from '../../../api';

export default class AdressForm extends React.Component {
  constructor() {
    super()

    this.state = {
      city: '',
      district: '',
      number: '',
      password: '',
      street: '',
      userName: '',
      _id: '',
      payment: {
        type: '',
        value: ''
      },
      dinheiro: Dinheiro,
      cartao: Cartao,
    }

    this.animatedValues = {
      payback: new Animated.Value(0),
      payment: '',
    }

  }
  async componentWillMount() {

    const user = JSON.parse(await AsyncStorage.getItem('@acaidelivery-user'));

    const {
      city,
      district,
      number,
      password,
      street,
      userName,
      _id
    } = user;

    this.setState({
      city,
      district,
      number,
      password,
      street,
      userName,
      _id
    });
  }

  onPress(props) {
    if (props == 'dinheiro') {
      Animated.timing(this.animatedValues.payback, { toValue: 0, duration: 100 }).start(() => {
        this.setState({ dinheiro: DinheiroSelecionado, cartao: Cartao, payment: { type: 'dinheiro' } }, () => {
          Animated.timing(this.animatedValues.payback, { toValue: 1, duration: 100 }).start();
        });
      });
    } else if (props == 'cartao') {
      Animated.timing(this.animatedValues.payback, { toValue: 0, duration: 100 }).start(() => {
        this.setState({ dinheiro: Dinheiro, cartao: CartaoSelecionado, payment: { type: 'cartao', value: '' } }, () => {
          Animated.timing(this.animatedValues.payback, { toValue: 1, duration: 100 }).start();
        });
      });
    }
  }

  async confirmOrder() {
    const user = JSON.parse(await AsyncStorage.getItem('@acaidelivery-user'));
    const { mainState: { orders } } = this.props;
    const {
      _id,
      city,
      district,
      number,
      password,
      street,
      payment: {
        type,
        value
      }
    } = this.state;
    let orderPayload = {
      userId: _id,
      cups: new Array(),
      adress: {
        city,
        district,
        number,
        street,
      },
      payment: {
        type,
        value: value ? value : undefined
      }
    };

    orders.map(({ price, size, category, owner, additionals }) => {
      orderPayload.cups.push({
        price: parseFloat(price),
        size: parseFloat(size),
        category: category,
        owner: owner,
        additionals: additionals,
      });
    });

    order(orderPayload).then(response => {
      console.log('Deu certo o pedido do homem ', response);
    }).catch(err => {
      const { response: { data: { error } } } = err;
      console.log('Deu Errado Aqui na Requisicao do homem ', error)
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          <Input
            onChangeText={text => this.setState({ city: text })}
            value={this.state.city}
            placeholder='Cidade'
            placeholderTextColor='#FFF'
            onFocus={this.props.onInputFocus}
            onBlur={this.props.onInputBlur}
            style={{ top: -3, width: 160, left: 20, marginTop: 10, color: '#FFF' }}
          />
          <Input
            onChangeText={text => this.setState({ district: text })}
            value={this.state.district}
            placeholder='Bairro'
            placeholderTextColor='#FFF'
            onFocus={this.props.onInputFocus}
            onBlur={this.props.onInputBlur}
            style={{ top: 5, width: 140, left: 25, marginTop: 10, color: '#FFF' }}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Input
            onChangeText={text => this.setState({ street: text })}
            value={this.state.street}
            onFocus={this.props.onInputFocus}
            onBlur={this.props.onInputBlur}
            placeholder='Rua'
            placeholderTextColor='#FFF'
            style={{ width: 210, left: 30, marginTop: 10, color: '#FFF' }}
          />
          <Input
            onChangeText={text => this.setState({ number: text })}
            value={this.state.number}
            onFocus={this.props.onInputFocus}
            onBlur={this.props.onInputBlur}
            placeholder='Nº - Comp.'
            placeholderTextColor='#FFF'
            style={{ top: 10, width: 80, left: 35, marginTop: 10, color: '#FFF' }}
          />
        </View>

        <Animated.View
          style={{
            left: 5,
            marginTop: 5,
            opacity: this.animatedValues.payback,
            transform: [
              {
                translateY: this.animatedValues.payback.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-5, 0],
                  extrapolate: 'clamp',
                }, { useNativeDriver: true })
              }
            ]
          }}
        >
          {this.state.payment.type == 'dinheiro' ? (
            <Input
              onChangeText={text => this.setState({ payment: { ...this.state.payment, value: text } })}
              value={this.state.payment.value}
              onFocus={this.props.onInputFocus}
              onBlur={this.props.onInputBlur}
              placeholder='Troco'
              placeholderTextColor='#FFF'
              style={{ width: 140, color: '#FFF' }}
            />
          ) : this.state.payment.type == 'cartao' ? (
            <Image
              style={{
                height: 45,
                width: 120,
                left: 10
              }}
              resizeMode='contain'
              source={require('../../../assets/VisaMastercard.png')}
            />
          ) : (
                <View style={{ height: 45 }} />
              )}
        </Animated.View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 80, alignItems: 'center', margin: 10 }} >

          <TouchableOpacity onPress={() => this.onPress('dinheiro')}>
            <this.state.dinheiro width={16} />
          </TouchableOpacity>
          <Linha />
          <TouchableOpacity onPress={() => this.onPress('cartao')}>
            <this.state.cartao width={30} />
          </TouchableOpacity>

        </View>

        <View style={{ bottom: 25, position: 'absolute', right: 10 }} >

          <TouchableOpacity
            onPress={this.confirmOrder.bind(this)}
            style={{
              width: 150,
              height: 50,
              borderRadius: 25,
              backgroundColor: Colors.VERDE,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#FFF' }}>Confirmar Pedido</Text>
          </TouchableOpacity>

        </View>

      </View>
    );
  }
}
import React from 'react';
import { View, Text } from 'react-native';

import {
  LogoContainer,
  Container,
  MenuBtn
} from './styles';

import LogoBranco from '../../../assets/logoBranco.svg';
import LogoRoxo from '../../../assets/logoRoxo.svg';
import MenuBrancoIco from '../../../assets/menuBranco.svg';
import MenuRoxoIco from '../../../assets/menuRoxo.svg';

export default props => {

  let Logo_W_B;

  let getIco = () => {
    setTimeout(() => { Logo_W_B = LogoRoxo; }, 5000);

    return LogoRoxo;
  }

  Logo_W_B = props.mainState.logoColor == 'WHITE' ? LogoBranco : getIco();


  return (
    <Container>

      <MenuBtn>
        {props.mainState.logoColor == 'WHITE' ? (
          <MenuBrancoIco
            height={60}
          />
        ) : (
            <MenuRoxoIco
              height={60}
            />
          )}
      </MenuBtn>

      <LogoContainer>
        <Logo_W_B
          height={60}
        />

      </LogoContainer>
    </Container>
  );
}
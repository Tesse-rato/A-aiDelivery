import React from 'react';

import env from '../environment';

import CopoVerde from '../../../assets/copoVerde.svg';
import CopoBranco from '../../../assets/copoBranco.svg';
import CopoRoxo from '../../../assets/copoRoxo.svg';
import ChocolateVerde from '../../../assets/chocolateVerde.svg';
import ChocolateBranco from '../../../assets/chocolateBranco.svg';
import ChocolateRoxo from '../../../assets/chocolateRoxo.svg';
import DeliveryVerde from '../../../assets/deliveryVerde.svg';
import DeliveryBranco from '../../../assets/deliveryBranco.svg';
import DeliveryRoxo from '../../../assets/deliveryRoxo.svg';

export default props => {
  switch (props.step) {
    case (env.CUPCHOICE): {
      return (
        <>
          <CopoVerde height={80} />
          <ChocolateBranco height={80} />
          <DeliveryBranco height={80} />
        </>
      )
    }
    case (env.FREEADDITIONAL): {
      return (
        <>
          <CopoRoxo height={80} />
          <ChocolateVerde height={80} />
          <DeliveryRoxo height={80} />
        </>
      )
    }
    case (env.ADDITIONALS): {
      return (
        <>
          <CopoRoxo height={80} />
          <ChocolateVerde height={80} />
          <DeliveryRoxo height={80} />
        </>
      )
    }
    case (env.PAYMENT): {
      return (
        <>
          <CopoBranco height={80} />
          <ChocolateBranco height={80} />
          <DeliveryVerde height={80} />
        </>
      )
    }
    default: {
      return (
        <>
          <CopoVerde height={80} />
          <ChocolateVerde height={80} />
          <DeliveryVerde height={80} />
        </>
      )
    }
  }
};
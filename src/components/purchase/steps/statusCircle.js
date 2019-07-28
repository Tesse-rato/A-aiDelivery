import React from 'react';

import { StatusCirclesContainer, StatusCircle } from './styles';

export default props => (
  <StatusCirclesContainer>
    <StatusCircle style={{ backgroundColor: props.animatedColor[0] }} />
    <StatusCircle style={{ backgroundColor: props.animatedColor[1] }} />
    <StatusCircle style={{ backgroundColor: props.animatedColor[2] }} />
  </StatusCirclesContainer>
);
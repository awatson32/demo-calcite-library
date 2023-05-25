import React, { FC } from 'react';
import '@esri/calcite-components/dist/components/calcite-button';
import { CalciteButton } from '@esri/calcite-components-react';

interface ButtonProps {
  label: string
}

const Button: FC<ButtonProps> = ({label}) => (
  <CalciteButton kind='brand'>
    {label}
  </CalciteButton>
);

export default Button;

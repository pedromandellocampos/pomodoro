import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'white'

interface ButtonContainerProps {
  variant: ButtonVariant
}

const buttonVariants = {
  primary: 'purple',
  secondary: 'orange',
  white: '#fff',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  background-color: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
`
import { Link } from 'react-router-native'
import styled, { css } from 'styled-components/native'
import { primary, primaryDark, primaryLight } from '../colors'
import { LinkSmall } from './Text'

const buttonStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;

  border-radius: 12px;
  background-color: ${primary};
  color: ${primaryDark};

  cursor: pointer;

  :hover {
    background-color: ${primaryLight};
  }
`

const ButtonContainer = styled.TouchableOpacity`
  ${buttonStyles}
`

const ButtonLink = styled(Link)`
  ${buttonStyles}
`

export const Button = ({ onClick, to, text }: { onClick?: () => void; to?: string; text: string }) => {
  if (to) {
    return <ButtonLink to={to}><LinkSmall>{text}</LinkSmall></ButtonLink>
  } else {
    return <ButtonContainer onPress={onClick}><LinkSmall>{text}</LinkSmall></ButtonContainer>
  }
}

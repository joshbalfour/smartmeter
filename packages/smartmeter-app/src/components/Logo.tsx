import styled from 'styled-components/native'

const logo = require('../../assets/logo.png')

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'contain',
})`
  width: 225px;
  height: 225px;
`

import styled from 'styled-components/native'
import { body, line, offWhite } from '../colors'
import { textSmallStyles } from './Text'

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: line,
})`
  width: 325px;
  height: 56px;
  border-radius: 16px;
  background-color: ${body};
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 8px;
  padding-bottom: 8px;

  ${textSmallStyles}

  color: ${offWhite};

  text-align: left;
`

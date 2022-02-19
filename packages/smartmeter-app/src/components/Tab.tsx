import React from 'react'
import styled, { css } from 'styled-components/native'
import { LinkXSmall } from './Text'

const TabContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 2px;
  border-bottom-color: transparent;
  border-bottom-style: solid;
  width: 120px;

  justify-content: center;
  padding-bottom: 12px;
  padding-top: 16px;

  ${props => props.active && css`
    border-bottom-color: #FCFCFC;
  `}
`

export const Tab = ({ text, active, onClick } : { text: string; active?: boolean; onClick?: () => void }) => (
  <TabContainer active={active} onPress={onClick}>
    <LinkXSmall>{text}</LinkXSmall>
  </TabContainer>
)

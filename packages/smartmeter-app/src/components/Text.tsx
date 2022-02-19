import styled, { css } from 'styled-components/native'

import { line, offWhite, primary, primaryDark } from '../colors'

export const HugeBold = styled.Text`
  //styleName: Mobile/Display Huge Bold;
  font-family: Poppins_700Bold;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 44px;
  letter-spacing: 0.9999998807907104px;
  text-align: center;

  color: ${offWhite};
`

export const textSmallStyles = css`
  //styleName: Mobile / Text Small;
  font-family: Poppins_400Regular;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.75px;
  text-align: center;

  color: ${line};
`

export const TextSmall = styled.Text`
  ${textSmallStyles}
`

export const LinkSmall = styled(TextSmall)`
  /* Desktop / Link Small */
  color: ${primaryDark};
`

export const LinkXSmall = styled(TextSmall)`
  /* Desktop / Link X-Small */
  font-family: Poppins_600SemiBold;
  font-size: 13px;
  line-height: 22px;

  text-align: center;
  letter-spacing: 0.25px;

  color: ${offWhite};
`
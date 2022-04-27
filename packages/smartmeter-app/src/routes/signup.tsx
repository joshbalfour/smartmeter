import React from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components/native'

import { Button } from '../components/Button'
import { TextInput } from '../components/Input'
import { Logo } from '../components/Logo'
import { Tab } from '../components/Tab'
import { HugeBold, TextSmall } from '../components/Text'
import { useLogin } from '../hooks/useLogin'
import { useRegister } from '../hooks/useRegister'

const Header = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 72px;
  max-width: 258px;
  margin-bottom: 10px;
`

const Container = styled.View`
  align-items: center;
`

const SmallLogo = styled(Logo)`
  width: 84px;
  height: 84px;

  margin-bottom: 23px;
`

const Body = styled.View`
  margin-top: 64px;
  margin-bottom: 44px;

  max-width: 258px;
  align-items: center;
`

const Tabs = styled.View`
  flex-direction: row;
  margin-bottom: 36px;
`
const Footer = styled.View`
  min-width: 327px;
  margin-top: 36px;
`

export const Signup = () => {
  const { login, loading } = useLogin()
  const { register, loading: signupLoading } = useRegister()
  const navigate = useNavigate()

  const [isSignup, setIsSignup] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [password2, setPassword2] = React.useState('')

  return (
    <Container>
      <Header>
        <SmallLogo />
        <HugeBold>Smarty Energy</HugeBold>
        <TextSmall>
          Tell me about yourself to start your smart energy journey.
        </TextSmall>
      </Header>
      <Body>
        <Tabs>
          <Tab active={!isSignup} text="Login" onClick={() => setIsSignup(false)} />
          <Tab active={isSignup} text="Register" onClick={() => setIsSignup(true)} />
        </Tabs>
        {isSignup ? (
          <>
            <TextInput name="email" placeholder="Enter your email" keyboardType="email-address" autoCorrect={false} autoComplete="email" value={email} onChangeText={setEmail} />
            <TextInput name="password" placeholder="Create a Password" secureTextEntry={true} autoCorrect={false} autoComplete="password-new" value={password} onChangeText={setPassword} style={{ marginTop: 25 }} />
            <TextInput name="confirm-password" placeholder="Confirm Password" secureTextEntry={true} autoCorrect={false} autoComplete="password-new" value={password2} onChangeText={setPassword2} style={{ marginTop: 25 }} />
          </>
        ) : (
          <>
            <TextInput name="email" placeholder="Enter your email" keyboardType="email-address" autoCorrect={false} autoComplete="email" value={email} onChangeText={setEmail} />
            <TextInput name="password" placeholder="Enter your Password" secureTextEntry={true} autoCorrect={false} autoComplete="password" style={{ marginTop: 25 }} value={password} onChangeText={setPassword} />
          </>
        )}
        <Footer>
          <Button text={isSignup ? "Create Account" : "Login"} onClick={async () => {
            if (isSignup) {
              await register({ email, password })
            } else {
              await login({ email, password })
            }
            navigate('/dashboard')
          }} />
        </Footer>
      </Body>
    </Container>
  )
}

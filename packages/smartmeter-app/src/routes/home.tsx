import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components/native'

import { Button } from '../components/Button'
import { Logo } from '../components/Logo'
import { HugeBold, TextSmall } from '../components/Text'
import { TextCarousel } from '../components/TextCarousel'
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser'
import { useRefreshToken } from '../hooks/useRefreshToken'
import { Loading } from './loading'

const Header = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 72px;
`

const Body = styled.View`
  margin-top: 64px;
  margin-bottom: 44px;

  max-width: 258px;
  align-items: center;
`

const Title = styled(HugeBold)`
  margin-bottom: 16px;
`

const CarouselText = styled(TextSmall)`
  margin-top: 66px;
`

const Footer = styled.View`
  min-width: 327px;
`

const Container = styled.View`
  align-items: center;
`

export const Home = () => {
  const [index, setIndex] = React.useState(0)
  const { loading, user } = useAuthenticatedUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user])

  if (loading) {
    return <Loading />
  }

  return (
    <Container>
      <Header>
        <Title>Sign Up</Title>
        <TextSmall>Hello, I’m Smarty!</TextSmall>
      </Header>
      <Body>
        <Logo />
        <CarouselText>
          <TextCarousel index={index} items={[
            "I’m here to help you make smarter decisions about your energy usage!",
            "I talk to your smart meter to find out how much you use at different times of the day.",
            "It doesn’t matter who your energy supplier is - you can always count on me!"
          ]} />
        </CarouselText>
      </Body>
      <Footer>
        {index < 2 ? (
          <Button text={"Continue"} onClick={() => {
            setIndex((index + 1) % 3)
          }} />
        ) : (
          <Button text={"Get Started"} to="/signup" />
        )}
      </Footer>
    </Container>
  )
}
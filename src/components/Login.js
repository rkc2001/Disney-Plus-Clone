import React from 'react'
import styled from 'styled-components';
import { auth, provider } from '../firebase';

import { useDispatch } from 'react-redux';
import { setUserLoginDetails } from '../features/user/userSlice';

const Login = (props) => {

  // Same code as Header.js
  const dispatch = useDispatch();

  // Google Authentication Stuff
  const handleAuth = () => {
    
    auth.signInWithPopup(provider)
      .then((result) => {
      // console.log(result);
          setUser(result.user);
        }).catch((error) => {
          alert(error.message);
        });
    }
  
    const setUser = (user) => {
      dispatch(
        setUserLoginDetails({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );
    }

  return (
    <Container>
      <Content>
        <CTA>
          <CTALogoOne src="/images/cta-logo-one.svg" alt=""/>
          <SignUp onClick={handleAuth}>GET ALL THERE</SignUp>
          <Description>Get Premier Access to Raya and the Last Dragon for an additional fee with a Disney+ subscription. As of 03/26/21, the price of Disney+ and The Disney Bundle will increase by $1.</Description>
          <CTALogoTwo src="/images/cta-logo-two.png" alt=""/>
        </CTA>
        <BgImage />
      </Content>
    </Container>
  )
}

// Styled Components - everything that is Login.js related is going to go inside the Login.js file only

const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`;

const Content = styled.div`
  margin-bottom: 10vw;
  width: 100%;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 40px;
  height: 100%;
`;

const BgImage = styled.div`
  height: 100%;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("/images/login-background.jpg");
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -1;
`;

const CTA = styled.div`
  margin-bottom: 2vw;
  max-width: 650px;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 0;
  align-items: center;
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  ${'' /* Animation */}
  transition-timing-function: ease-out;
  transition: opacity 0.2s;
  width: 100%;
`;

const CTALogoOne = styled.img`
  margin-bottom: 12px;
  max-width: 600px;
  min-height: 1px;
  display: block;
  width: 100%;
`;

const SignUp = styled.a`
  font-weight: bold;
  color: #f9f9f9;
  background-color: #0063e5;
  margin-bottom: 12px;
  width: 100%;
  letter-spacing: 1.5px;
  font-size: 18px;
  padding: 16.5px 0;
  border: 1px solid transparent;
  border-radius: 4px;

  &:hover{
    background-color: #0483ee;
  }
`;

const Description = styled.p`
  color: hsla(0, 0%, 95.3%, 1);
  font-size: 11px;
  margin: 0 0 24px;
  letter-spacing: 1.5px;
  line-height: 1.5;
`;

const CTALogoTwo = styled.img`
  margin-bottom: 20px;
  max-width: 600px;
  min-height: 1px;
  display: inline-block;
  vertical-align: bottom;
  width: 100%;
`;

export default Login

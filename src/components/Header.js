import React from 'react'
import styled from 'styled-components';
import { auth, provider } from '../firebase';

import { useDispatch, useSelector } from 'react-redux';

// Dispatch will help us to dispatch actions into the store 
// Selector will allow us to retrieve stuff from the store

import { useHistory } from 'react-router-dom';
import { selectUserName,selectUserPhoto, setUserLoginDetails, setSignOutState } from '../features/user/userSlice';

import { useEffect } from 'react';

const Header = (props) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  //Once logged in, move to home page ... userName updates only then this function rums
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if(user){
        setUser(user)
        history.push('/home')
      }
    })
  }, [userName]);

  // Google Authentication Stuff
  const handleAuth = () => {
    if(!userName){
      auth.signInWithPopup(provider)
      .then((result) => {
        // console.log(result);
        setUser(result.user);
      }).catch((error) => {
        alert(error.message);
      });
    }else if(userName){
      auth.signOut().then(() => {
        dispatch(setSignOutState())
        history.push('/')
      }).catch((error) => {
        alert(error.message);
      });
    }
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
    <Nav>
      <Logo>
        <img src='/images/logo.svg' alt="Disney+" />
      </Logo>

      {/* Check if logged in - yes then show photo and nav menu , no then login button */}
      {
        !userName ? 
        (<Login onClick={handleAuth}>Login</Login>)
        :
        <>     

        {/* Nav Menu */}
        <NavMenu>
          <a href='/home'>
            <img src='/images/home-icon.svg' alt="Home Icon" />
            <span>HOME</span>
          </a>
          <a href='/home'>
            <img src='/images/search-icon.svg' alt="Search Icon" />
            <span>SEARCH</span>
          </a>
          <a href='/home'>
            <img src='/images/watchlist-icon.svg' alt="Home Icon" />
            <span>WATCHLIST</span>
          </a>
          <a href='/home'>
            <img src='/images/original-icon.svg' alt="Home Icon" />
            <span>ORIGINALS</span>
          </a>
          <a href='/home'>
            <img src='/images/movie-icon.svg' alt="Home Icon" />
            <span>MOVIES</span>
          </a>
          <a href='/home'>
            <img src='/images/series-icon.svg' alt="Home Icon" />
            <span>SERIES</span>
          </a>
        </NavMenu>
        
        {/* User logged in - show photo */}
        <SignOut>
          <UserImg src={userPhoto} alt={userName}></UserImg>
          <DropDown>
            <span onClick={handleAuth}>Sign Out</span>
          </DropDown>
        </SignOut>
        </>
      }
        {/* Initially before redux - <Login onClick={handleAuth}>Login</Login> */}

    </Nav>
  )
}

export default Header

const Nav = styled.nav`
  position: fixed; 
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3; 
`;

const Logo = styled.a`
  padding: 0;
  width: 80px; 
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img{
      display: block;
      width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 30px;

  a{
    display: flex;
    align-items: center;
    padding: 0 12px;
  
    img{
      height: 20px;
      width: 20px;
      min-width: 20px;
      z-index: auto;
    }

    span{
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      margin-left: 2px;
      white-space: nowrap;
      position: relative;
    

      /* The line that slides is there always ... when hovered we scale and transform it to get a sliding effect */

      /* Sort of adding another div beneath the menu item */
      &:before{
        /* content: 'hello';
        display: block; */
        background-color: rgb(249, 249, 249);
        border-radius: 0 0 4px 4px;
        bottom: -6px; /* else renders on top of HOME */
        content: '';
        height: 2px;
        left: 0px;  /* important property - where to start */
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }
 
    &:hover {
      span:before{
        transform: scaleX(1); /* makes it go pos 0 to 1 */
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }
    
  @media (max-width: 768px){
    /* On smaller screens, dont show the menu */
    display: none;
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover{
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 105px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;
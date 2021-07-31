import React from 'react'
import styled from 'styled-components';
import ImgSlider from './ImgSlider';
import NewDisney from './NewDisney';
import Originals from './Originals';
import Recommends from './Recommends';
import Trending from './Trending';
import Viewers from './Viewers';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// This'll allow us to use the Firestore DB
import db from '../firebase';

import { setMovies } from '../features/movie/movieSlice';
import { selectUserName } from '../features/user/userSlice.js';

const Home = () => {

  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let recommends = [];
  let newDisneys = [];
  let trending = [];
  let originals = [];

  useEffect(() => {
    db.collection('movies').onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {

        // We can see in the console that we're retrieving movies but they're not shown in their sections
        console.log(recommends);
        //We need to read from here and write to our actual app

        switch(doc.data().type){
          case 'recommend' : 
            recommends = [...recommends, { id: doc.id, ...doc.data()}];
          break;  

          case 'new' : 
            newDisneys = [...newDisneys, { id: doc.id, ...doc.data()}];
          break;  

          case 'original' : 
            originals = [...originals, { id: doc.id, ...doc.data()}];
          break; 

          case 'trending' : 
            trending = [...trending, { id: doc.id, ...doc.data()}];
          break;  
        }
      });

      dispatch(setMovies({
        recommend: recommends,
        newDisney: newDisneys,
        original: originals,
        trending: trending,
        })
      );
    });
  },[userName]);

  
  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  )
}

export default Home;

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  &:after {
    /* Create another div on the flow */
    background: url("/images/home-background.png") center center / cover
    no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

/*
newDisneys.push({id: doc.id, ...doc.data()});

.push() was doing mutation and gave some error
*/
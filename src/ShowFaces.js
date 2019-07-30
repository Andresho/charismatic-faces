import React, { useState, useEffect } from 'react';
// import Face from './Face';
import styled from 'styled-components';
import Drawing from './Drawing';

import eyes from './eyes.json';
import mouths from './mouths.json';

import {
  Link,
} from "react-router-dom";


const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

`;

const Action = styled.div`
  position: absolute;
  top: ${props=>props.top};
  cursor: pointer;
  user-select: none;
  @media (max-width: 600px) {
      font-size: 1.2em;
  }
  @media (min-width: 600px) {
    font-size: 0.9em;
  }
  @media (min-width: 1000px) {
    font-size: 0.5em;
  }
`;
const Face = styled.div`
  width: 60%; 
  height: 60%;
  @media (max-width: 600px) {
    width: 75%;
    height: 75%;
  }
`;

function ShowFaces() {
  const [mouth, setMouth] =               useState(null);
  const [rightEye, setRightEye] =         useState(null);
  const [leftEye, setLeftEye] =           useState(null);
  const [eyesOpenness, setEyesOpenness] = useState(1);

  function changeFace(){  
    const leftNumber =  Math.floor(Math.random()*eyes.length);
    const rightNumber = Math.floor(Math.random()*eyes.length);
    const mouthNumber = Math.floor(Math.random()*mouths.length);

    setMouth( mouths[mouthNumber] );
    setRightEye( eyes[rightNumber] );
    setLeftEye( eyes[leftNumber] );
  }

  function blinkDown() {
    const fn = currentValue=>{
      const newValue = currentValue - 0.1;
      if(newValue>0)      window.setTimeout(blinkDown, 10);
      else                window.setTimeout(blinkUp, 10);
      
      return newValue;
    }

    setEyesOpenness(fn);
  }
  function blinkUp() {
    const fn = currentValue=>{
      const newValue = currentValue + 0.1;
      if(newValue<1)      window.setTimeout(blinkUp, 10);
      else {
        const nextBlinkTime = Math.random()*3750+750;
        window.setTimeout(blinkDown, nextBlinkTime);
      }
      
      return newValue;
    }

    setEyesOpenness(fn);
  }

  useEffect(()=>{
    changeFace();
    const nextBlinkTime = Math.random()*3750+750;
    window.setTimeout(blinkDown, nextBlinkTime);
  },[]);

  return (
    <MainDiv>
      <Action top={'5%'}>
        Click to create a new random face!
      </Action>
      {
        mouth&&
     
          <Face>
            <Drawing rightEye={rightEye} leftEye={leftEye} mouth={mouth} eyesOpenness={eyesOpenness} onClick={changeFace}/>
          </Face>
      }
      
        <Action top={'95%'}>
          <Link to={'/about'} style={{color: 'white', textDecoration: 'none',}}> 
            About
          </Link>
        </Action> 
      
    </MainDiv>
  );
}

export default ShowFaces;
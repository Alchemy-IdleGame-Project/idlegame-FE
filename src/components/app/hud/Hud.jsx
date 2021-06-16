import React from 'react'
import Clicks from './Clicks';
import Clock from './Clock';
import Gold from './Gold';

const Hud = ({gameTime, gold, clicks, gPS}) => {
  return <>
    <Clock gameTime={gameTime} />
    <Gold gold={gold} />
    <Clicks clicks={clicks} /> <br/>
    <p>gold per second: {gPS} </p>
  </> 
};

export default Hud;

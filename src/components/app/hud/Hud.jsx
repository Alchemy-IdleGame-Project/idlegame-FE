import React from 'react'
import Clicks from './Clicks';
import Clock from './Clock';
import Gold from './Gold';
import PropTypes from 'prop-types'

const Hud = ({ gameTime, gold, clicks, gPS }) => {
  const clock = <Clock gameTime={gameTime} />;
  const goldCount = <Gold gold={gold} />;
  const clickCount =  <Clicks clicks={clicks} />;
  const goldPerSecond =  <p>gold per second: {gPS} </p>;
  
  return <>
    {clock}
    {goldCount}
    {clickCount}
    {goldPerSecond}
  </>; 
};

Hud.propTypes = {
  gameTime: PropTypes.number.isRequired,
  gold: PropTypes.number.isRequired,
  clicks: PropTypes.number.isRequired,
  gPS: PropTypes.number.isRequired,
};

export default Hud;

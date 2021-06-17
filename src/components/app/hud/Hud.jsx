import React from 'react'
import Clicks from './Clicks';
import Clock from './Clock';
import Gold from './Gold';
import PropTypes from 'prop-types';

const Hud = ({ gametime, gold, clicks, gPS }) => {
  const clock = <Clock gametime={gametime} />;
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
  gametime: PropTypes.number.isRequired,
  gold: PropTypes.number.isRequired,
  clicks: PropTypes.number.isRequired,
  gPS: PropTypes.number.isRequired,
};

export default Hud;

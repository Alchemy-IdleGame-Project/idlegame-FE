/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import style from '../style.css';

const Clock = ({ gametime }) => {
  let hour, minute, second;

  hour = Math.floor(gametime / 3600);
  minute = Math.floor((gametime - (hour * 3600)) / 60);
  second = gametime - (hour * 3600) - (minute * 60);
  
  if (String(hour).length < 2){
    hour = `0${hour}`;
  }
  if (String(minute).length < 2){
    minute = `0${minute}`;
  }
  if (String(second).length < 2){
    second = `0${second}`;
  }

  return (
    <div className={style.clock}>
      <img src="../../assets/square-clock.png" alt="Game Clock" width="30px"/>
      {hour }:{ minute}:{second}
    </div>
  );
};

Clock.propTypes = {
  gametime: PropTypes.number.isRequired
};

export default Clock;

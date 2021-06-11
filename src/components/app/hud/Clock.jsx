/* eslint-disable max-len */
import React from 'react'
import PropTypes from 'prop-types';

const Clock = ({ gameTime }) => {
  let hour, minute, second;

  hour = Math.floor(gameTime / 3600);
  minute = Math.floor((gameTime - (hour * 3600)) / 60);
  second = gameTime - (hour * 3600) - (minute * 60);
  
  if(String(hour).length < 2){
    hour = `0${hour}`;
  }
  if(String(minute).length < 2){
    minute = `0${minute}`;
  }
  if(String(second).length < 2){
    second = `0${second}`;
  }

  return (
    <div style={{ backgroundColor: "grey", width: "150px", textAlign: "center" }}>
      <img src="../../assets/square-clock.png" alt="Game Clock" width="30px"/>
       {hour }:{ minute}:{second}
    </div>
  );
};

Clock.propTypes = {
  gameTime: PropTypes.number.isRequired
};

export default Clock;

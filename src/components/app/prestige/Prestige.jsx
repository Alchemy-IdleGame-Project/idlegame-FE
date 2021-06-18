/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { incrementPrestige } from '../../../gameUtils/prestigeUtils';

const Prestige = ({ user, prestige,  setPrestige, setUser, setGold, setGoldPerSecond, setGametime, setNumClicks, setDetriment }) => {

  const bamooo = () => {
    incrementPrestige(user, setPrestige, setUser, setGold, setGoldPerSecond, setGametime, setNumClicks, setDetriment);
  };
  
  let btnPrestige = prestige;
  btnPrestige++;
  const prestigeBtn = <button onClick={bamooo}>Prestige { btnPrestige} </button>;
  return (
    <div>
      <p>Prestige Level: {prestige}</p>
      {
        ((user.castle) ? prestigeBtn : '')
      }
    </div>
  );
};

Prestige.propTypes = {
  handlePrestige: PropTypes.func,
  prestige: PropTypes.number,
  castle: PropTypes.bool,
  user: PropTypes.shape({
    castle: PropTypes.bool
  }),
  setPrestige: PropTypes.func,
  setUser: PropTypes.func,
  setGold: PropTypes.func,
  setGoldPerSecond: PropTypes.func,
  setGametime: PropTypes.func,
  setNumClicks: PropTypes.func,
  setDetriment: PropTypes.func,
};
export default Prestige;

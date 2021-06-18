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
  prestige: PropTypes.number.isRequired,
  user: PropTypes.shape({
    castle: PropTypes.bool.isRequired
  }).isRequired,
  setPrestige: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setGold: PropTypes.func.isRequired,
  setGoldPerSecond: PropTypes.func.isRequired,
  setGametime: PropTypes.func.isRequired,
  setNumClicks: PropTypes.func.isRequired,
  setDetriment: PropTypes.func.isRequired,
};
export default Prestige;

/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
<<<<<<< HEAD

const Gold = ({ gold }) => {
  return (
    <p><img width="40px" src="../../../assets/coin-icon-3830.png"/> Current Gold: {gold} </p>
=======
import goldCoin from '../../../../assets/coin-icon-3830.png';

const Gold = ({ gold }) => {
  return (
    <p><img width="40px" src={goldCoin}/> Current Gold: {gold} </p>
>>>>>>> 9517ef50806025d5b4c3b4615d97eee91b1b97ec
  );
};

Gold.propTypes = {
  gold: PropTypes.number.isRequired,
};

export default Gold;

/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import goldCoin from '../../../../assets/coin-icon-3830.png';

const Gold = ({ gold }) => {
  return (
    <p><img width="40px" src={goldCoin}/> Current Gold: {gold} </p>
  );
};

Gold.propTypes = {
  gold: PropTypes.number.isRequired,
};

export default Gold;

/* eslint-disable max-len */
import React from 'react'
import PropTypes from 'prop-types'
import { gold } from 'color-name';

const Gold = ({ gold }) => {
  return (
    <p><img width="40px" src="../../../assets/coin-icon-3830.png"/>Current Gold: {gold} </p>
  );
};

Gold.propTypes = {
  gold: PropTypes.number.isRequired,
};

export default Gold;

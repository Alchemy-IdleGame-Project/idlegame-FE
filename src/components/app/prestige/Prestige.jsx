/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

const Prestige = ({ handlePrestige, prestige, castle }) => {
  let btnPrestige = prestige;
  btnPrestige++;
  const prestigeBtn = <button onClick={handlePrestige}>Prestige { btnPrestige} </button>;
  return (
    <div>
      <p>Prestige level: {prestige}</p>
      {
        ((castle) ? prestigeBtn : '')
      }
    </div>
  );
};

Prestige.propTypes = {
  handlePrestige: PropTypes.func.isRequired,
  prestige: PropTypes.number.isRequired,
  castle: PropTypes.bool.isRequired
};
export default Prestige;

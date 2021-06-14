import React from 'react';
import PropTypes from 'prop-types';

const Prestige = ({ handlePrestige, prestige, castle }) => {

  return (
    <div>
      {
        ((castle) ? <button onClick={handlePrestige}>Prestige</button> : '')
      }
      <p>Prestige level: {prestige} <i>Hover for prestige info</i> </p>
    </div>
  );
};

Prestige.propTypes = {
  handlePrestige: PropTypes.func.isRequired,
  prestige: PropTypes.number.isRequired,
  castle: PropTypes.bool.isRequired
};
export default Prestige;

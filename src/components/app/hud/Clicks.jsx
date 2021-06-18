/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';


const Clicks = ({ clicks }) => {
  return (
    <p>Current Clicks: {clicks} </p>
  );
};

Clicks.propTypes = {
  clicks: PropTypes.number.isRequired,
};

export default Clicks;

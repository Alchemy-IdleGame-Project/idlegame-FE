/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import style from '../style.css';

const UserControls = ({ handleMineClick, handleClicks }) => {
  function handleMineButtonClick(){
    handleMineClick();
    handleClicks();
  }

  return (
    <div className={style.userControls}>
      <button className={style.smallButton}>New Game</button>
      <button className={style.smallButton}>Save Game</button>
      <button className={style.smallButton}>Load Game</button>
      <br/>
      <button className={style.smallButton} onClick={handleMineButtonClick}>Mine Gold</button>
    </div>
  );
};



UserControls.propTypes = {
  handleMineClick: PropTypes.func.isRequired,
  handleClicks: PropTypes.func.isRequired,
};
export default UserControls;

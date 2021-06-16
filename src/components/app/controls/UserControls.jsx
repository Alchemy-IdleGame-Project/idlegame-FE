/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import style from '../style.css';

const UserControls = ({
  handleMineClick,
  handleClicks,
  uploadSave,
  gold,
  user,
  auth,
}) => {
  function handleMineButtonClick() {
    handleMineClick();
    handleClicks();
  }

  function handleSaveButton() {
    
    console.log(user);
    console.log(auth.auth.token, 'this is auth token');
    uploadSave(
      {
        lumberyard: user.lumberyard,
        windmill: user.windmill,
        mine: user.mine,
        watermill: user.watermill,
        sawmill: user.sawmill,
        farm: user.farm,
        blacksmith: user.blacksmith,
        tavern: user.tavern,
        castle: user.castle,
      },
      auth.auth.token
    );
  }

  return (
    <div className={style.userControls}>
      <button className={style.smallButton}>New Game</button>
      <button className={style.smallButton} onClick={handleSaveButton}>
        Save Game
      </button>
      <button className={style.smallButton}>Load Game</button>
      <br />
      <button className={style.smallButton} onClick={handleMineButtonClick}>
        Mine Gold
      </button>
    </div>
  );
};

UserControls.propTypes = {
  handleMineClick: PropTypes.func.isRequired,
  handleClicks: PropTypes.func.isRequired,
  uploadSave: PropTypes.func.isRequired,
  gold: PropTypes.number.isRequired,
  user: PropTypes.shape({
    house: PropTypes.bool.isRequired,
    lumberyard: PropTypes.bool.isRequired,
    windmill: PropTypes.bool.isRequired,
    mine: PropTypes.bool.isRequired,
    watermill: PropTypes.bool.isRequired,
    sawmill: PropTypes.bool.isRequired,
    farm: PropTypes.bool.isRequired,
    blacksmith: PropTypes.bool.isRequired,
    tavern: PropTypes.bool.isRequired,
    castle: PropTypes.bool.isRequired,
  }).isRequired,
  auth: PropTypes.shape({
    auth: PropTypes.shape({
      email: PropTypes.string.isRequired,
      token: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
export default UserControls;

/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import style from '../style.css';
import { uploadSave } from '../../../gameUtils/userUtils';

const UserControls = ({
  handleMineClick,
  handleClicks,
  setLoadUser,
  gold,
  user,
  auth,
  prestige,
  gametime,
  numClicks,
  // newGame
}) => {
  function handleMineButtonClick() {
    handleMineClick();
    handleClicks();
  }
  // you need to add gold, prestige, gametime, num clicks
  function handleSaveButton() { 
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
        gold,
        prestige,
        gametime,
        clicks: numClicks
      },
      auth.auth.token
    );
  }

  async function handleLoadButton() {
    window.location.reload();
    setLoadUser(true);
    
  }

  function handleNewGame() {
    newGame();
  }

  return (
    <div className={style.userControls}>
      <button className={style.smallButton} onClick={handleNewGame}>New Game</button>
      <button className={style.smallButton} onClick={handleSaveButton}>
        Save Game
      </button>
      <button className={style.smallButton} onClick={handleLoadButton}>
        Load Game
      </button>
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
  // newGame: PropTypes.func.isRequired,
  uploadSave: PropTypes.func.isRequired,
  setLoadUser: PropTypes.func.isRequired,
  gold: PropTypes.number.isRequired,
  prestige: PropTypes.number.isRequired,
  gametime: PropTypes.number.isRequired,
  numClicks: PropTypes.number.isRequired,
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

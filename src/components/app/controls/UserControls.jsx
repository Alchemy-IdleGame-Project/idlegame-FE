/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import style from '../style.css';
import { uploadSave, newGame } from '../../../gameUtils/userUtils';

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
  setUser,
  setGold,
  setGoldPerSecond,
  setGametime,
  setNumClicks,
  setPrestige,
  setDetriment,
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
        clicks: numClicks,
      },
      auth.auth.token
    );
  }

  async function handleLoadButton() {
    window.location.reload();
    setLoadUser(true);
  }

  function handleNewGame() {
    newGame(
      setUser,
      setGold,
      setGoldPerSecond,
      setGametime,
      setNumClicks,
      setPrestige,
      setDetriment
    );
  }

  return (
    <div className={style.userControls}>
      <button className={style.smallButton} onClick={handleNewGame}>
        New Game
      </button>
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
  setLoadUser: PropTypes.func.isRequired,
  gold: PropTypes.number.isRequired,
  prestige: PropTypes.number.isRequired,
  gametime: PropTypes.number.isRequired,
  numClicks: PropTypes.number.isRequired,
  setUser: PropTypes.func.isRequired,
  setGoldPerSecond: PropTypes.func.isRequired,
  setGametime: PropTypes.func.isRequired,
  setNumClicks: PropTypes.func.isRequired,
  setPrestige: PropTypes.func.isRequired,
  setDetriment: PropTypes.func.isRequired,
  setGold: PropTypes.func.isRequired,
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

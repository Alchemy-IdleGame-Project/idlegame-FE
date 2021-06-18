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
  handleMineClick: PropTypes.func,
  handleClicks: PropTypes.func,
  newGame: PropTypes.func,
  uploadSave: PropTypes.func,
  setLoadUser: PropTypes.func,
  gold: PropTypes.number,
  prestige: PropTypes.number,
  gametime: PropTypes.number,
  numClicks: PropTypes.number,
  setUser: PropTypes.func,
  setGoldPerSecond: PropTypes.func,
  setGametime: PropTypes.func,
  setNumClicks: PropTypes.func,
  setPrestige: PropTypes.func,
  setDetriment: PropTypes.func,
  setGold: PropTypes.func,
  user: PropTypes.shape({
    house: PropTypes.bool,
    lumberyard: PropTypes.bool,
    windmill: PropTypes.bool,
    mine: PropTypes.bool,
    watermill: PropTypes.bool,
    sawmill: PropTypes.bool,
    farm: PropTypes.bool,
    blacksmith: PropTypes.bool,
    tavern: PropTypes.bool,
    castle: PropTypes.bool,
  }),
  auth: PropTypes.shape({
    auth: PropTypes.shape({
      email: PropTypes.string,
      token: PropTypes.string,
      id: PropTypes.number,
    }),
  }),
};
export default UserControls;

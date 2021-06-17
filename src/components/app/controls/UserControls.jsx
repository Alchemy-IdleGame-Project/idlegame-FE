/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import style from '../style.css';

const UserControls = ({
  handleMineClick,
  handleClicks,
  uploadSave,
  downloadSave,
  setUser,
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
        gold
      },
      auth.auth.token
    );
  }

  async function handleLoadButton() {
    console.log(user, 'this is pre load');
    const saveData = await downloadSave(auth.auth.token);
    setUser({ 
      house: true, 
      lumberyard: saveData.lumberyard,
      windmill: saveData.windmill,
      mine: saveData.mine,
      watermill: saveData.watermill,
      sawmill: saveData.sawmill,
      farm: saveData.farm,
      blacksmith: saveData.blacksmith,
      tavern: saveData.tavern,
      castle: saveData.castle });
    console.log(user, 'this is post load');
    console.log(saveData, 'this is saved data');
  }

  return (
    <div className={style.userControls}>
      <button className={style.smallButton}>New Game</button>
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
  uploadSave: PropTypes.func.isRequired,
  downloadSave: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
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

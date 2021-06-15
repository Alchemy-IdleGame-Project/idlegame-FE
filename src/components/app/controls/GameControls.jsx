/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import style from '../style.css';

const GameControls = ({
  gold,
  unlockBuilding, 
  revealPercent,
  goldRequired,
  user
}) => {



  return (
    <div className={style.gameControls}>
    

      {/* display for the mine button */}
      {
        (gold > (goldRequired.lumberyard * revealPercent)) ?
          <div className={style.something}>
            <button
              value="lumberyard"
              name="lumberyard"
              className={((gold < goldRequired.lumberyard && !user.lumberyard) ? style.almost : ''),
              style.bigButton
              }
              onClick={unlockBuilding}
              disabled={((gold < goldRequired.lumberyard || user.lumberyard) ? true : false)}>Purchase Lumberyard ({`${goldRequired.lumberyard}`}g)
            </button>
            <img className={style.hovertest} src="../../../../assets/lumberyard-info.png" alt="Lumberyard" />
          </div> : ''
      }
    
      {
        (gold > (goldRequired.windmill * revealPercent)) ?
          <button 
            className={
              ((gold < goldRequired.windmill) ? style.almost : ''), 
              style.bigButton} 
            value="windmill" 
            onClick={unlockBuilding} 
            disabled={((gold < goldRequired.windmill || user.windmill) ? true : false)}>Purchase Windmill ({`${goldRequired.windmill}`}g)
          </button> : ''
      }
      {
        (gold > (goldRequired.mine * revealPercent)) ?
          <div className={style.something}>
            <button
              className={((gold < goldRequired.mine) ? style.almost : ''),
              style.bigButton}
              value="mine"
              onClick={unlockBuilding}
              disabled={((gold < goldRequired.mine || user.mine) ? true : false)}>Purchase Mine ({`${goldRequired.mine}`}g)
            </button>
            <span className={style.hovertest1}>+5 gold/sec</span>
          </div> : ''
      }
      {
        (gold > (goldRequired.watermill * revealPercent)) ?
          <button 
            className={((gold < goldRequired.watermill) ? style.almost : ''), 
            style.bigButton} 
            value="watermill" 
            onClick={unlockBuilding} 
            disabled={((gold < goldRequired.watermill || user.watermill) ? true : false)}>Purchase Watermill ({`${goldRequired.watermill}`}g)
          </button> : ''
      }
      {
        (gold > (goldRequired.sawmill * revealPercent)) ?
          <button 
            className={((gold < goldRequired.sawmill) ? style.almost : ''), 
            style.bigButton} 
            value="sawmill" 
            onClick={unlockBuilding} 
            disabled={((gold < goldRequired.sawmill || user.sawmill) ? true : false)}>Purchase Sawmill ({`${goldRequired.sawmill}`}g)
          </button> : ''
      }
      {
        (gold > (goldRequired.farm * revealPercent)) ?
          <button 
            className={((gold < goldRequired.farm) ? style.almost : ''), 
            style.bigButton} 
            value="farm" 
            onClick={unlockBuilding} 
            disabled={((gold < goldRequired.farm || user.farm) ? true : false)}>Purchase Farm ({`${goldRequired.farm}`}g)
          </button> : ''
      }
      {
        (gold > (goldRequired.blacksmith * revealPercent)) ?
          <button 
            className={((gold < goldRequired.blacksmith) ? style.almost : ''), 
            style.bigButton} 
            value="blacksmith" 
            onClick={unlockBuilding} 
            disabled={((gold < goldRequired.blacksmith || user.blacksmith) ? true : false)}>Purchase Blacksmith ({`${goldRequired.blacksmith}`}g)
          </button> : ''
      }
      {
        (gold > (goldRequired.tavern * revealPercent)) ?
          <button 
            className={((gold < goldRequired.tavern) ? style.almost : ''), 
            style.bigButton} 
            value="tavern" 
            onClick={unlockBuilding} 
            disabled={((gold < goldRequired.tavern || user.tavern) ? true : false)}>Purchase Tavern ({`${goldRequired.tavern}`}g)
          </button> : ''
      }
      {
        (gold > (goldRequired.castle * revealPercent)) ?
          <button 
            className={((gold < goldRequired.castle) ? style.almost : ''), 
            style.bigButton} 
            value="castle" 
            onClick={unlockBuilding} 
            disabled={((gold < goldRequired.castle || user.castle) ? true : false)}>Purchase Castle ({`${goldRequired.castle}`}g)
          </button> : ''
      }
    </div>);

};

GameControls.propTypes = {
  gold: PropTypes.number.isRequired,
  clicks: PropTypes.number.isRequired,
  handleClicks: PropTypes.func.isRequired,
  unlockBuilding: PropTypes.func.isRequired,
  revealPercent: PropTypes.number.isRequired,
  goldRequired: PropTypes.shape({
    lumberyard: PropTypes.number.isRequired,
    windmill: PropTypes.number.isRequired,
    mine: PropTypes.number.isRequired,
    watermill: PropTypes.number.isRequired,
    sawmill: PropTypes.number.isRequired,
    farm: PropTypes.number.isRequired,
    blacksmith: PropTypes.number.isRequired,
    tavern: PropTypes.number.isRequired,
    castle: PropTypes.number.isRequired,
  }),
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
};

export default GameControls;

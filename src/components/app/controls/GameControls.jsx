/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import style from '../style.css';
import { unlockBuilding } from '../../../gameUtils/buildingUtils';
<<<<<<< HEAD
=======
import blacksmithInfo from '../../../../assets/info-cards/blacksmith-info.png';
import castleInfo from '../../../../assets/info-cards/castle-info.png';
import farmInfo from '../../../../assets/info-cards/farm-info.png';
import lumberyardInfo from '../../../../assets/info-cards/lumberyard-info.png';
import mineInfo from '../../../../assets/info-cards/mine-info.png';
import sawmillInfo from '../../../../assets/info-cards/sawmill-info.png';
import tavernInfo from '../../../../assets/info-cards/tavern-info.png';
import watermillInfo from '../../../../assets/info-cards/watermill-info.png';
import windmillInfo from '../../../../assets/info-cards/windmill-info.png';
>>>>>>> 9517ef50806025d5b4c3b4615d97eee91b1b97ec

const GameControls = ({
  gold,
  detriment,
  revealPercent,
  goldRequired,
  user, 
  setUser, 
  setGold, 
  setGoldPerSecond, 
  setDetriment
}) => {
 
  const wahoo = (e) => {
    unlockBuilding(e, gold, user, detriment, goldRequired, setUser, setGold, setGoldPerSecond, setDetriment);
  };

  return (
    <div className={style.gameControls}>
      <h2>Purchase Buildings</h2>

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
              onClick={wahoo}
              disabled={((gold < goldRequired.lumberyard || user.lumberyard) ? true : false)}>Purchase Lumberyard ({`${goldRequired.lumberyard}`}g)
            </button>
<<<<<<< HEAD
            <img className={style.hovertest} src="../../../../assets/info-cards/lumberyard-info.png" alt="Lumberyard" />
=======
            <img className={style.hovertest} src={lumberyardInfo} alt="Lumberyard" />
>>>>>>> 9517ef50806025d5b4c3b4615d97eee91b1b97ec
          </div> : ''
      }
    
      {
        (gold > (goldRequired.windmill * revealPercent)) ?
          <div className={style.something}>
            <button
              className={
                ((gold < goldRequired.windmill) ? style.almost : ''),
                style.bigButton}
              value="windmill"
              onClick={wahoo}
              disabled={((gold < goldRequired.windmill || user.windmill) ? true : false)}>Purchase Windmill ({`${goldRequired.windmill}`}g)
            </button>
<<<<<<< HEAD
            <img className={style.hovertest} src="../../../../assets/info-cards/windmill-info.png" alt="windmill" />
=======
            <img className={style.hovertest} src={windmillInfo} alt="windmill" />
>>>>>>> 9517ef50806025d5b4c3b4615d97eee91b1b97ec
          </div> : ''
      }
      {
        (gold > (goldRequired.mine * revealPercent)) ?
          <div className={style.something}>
            <button
              className={((gold < goldRequired.mine) ? style.almost : ''),
              style.bigButton}
              value="mine"
              onClick={wahoo}
              disabled={((gold < goldRequired.mine || user.mine) ? true : false)}>Purchase Mine ({`${goldRequired.mine}`}g)
            </button>
<<<<<<< HEAD
            <img className={style.hovertest} src="../../../../assets/info-cards/mine-info.png" alt="mine" />
=======
            <img className={style.hovertest} src={mineInfo} alt="mine" />
>>>>>>> 9517ef50806025d5b4c3b4615d97eee91b1b97ec
          </div> : ''
      }
      {
        (gold > (goldRequired.watermill * revealPercent)) ?
          <div className={style.something}>
            <button
              className={((gold < goldRequired.watermill) ? style.almost : ''),
              style.bigButton}
              value="watermill"
              onClick={wahoo}
              disabled={((gold < goldRequired.watermill || user.watermill) ? true : false)}>Purchase Watermill ({`${goldRequired.watermill}`}g)
            </button>
<<<<<<< HEAD
            <img className={style.hovertest} src="../../../../assets/info-cards/watermill-info.png" alt="watermill" />
=======
            <img className={style.hovertest} src={watermillInfo} alt="watermill" />
>>>>>>> 9517ef50806025d5b4c3b4615d97eee91b1b97ec
          </div> : ''
      }
      {
        (gold > (goldRequired.sawmill * revealPercent)) ?
          <div className={style.something}>
            <button
              className={((gold < goldRequired.sawmill) ? style.almost : ''),
              style.bigButton}
              value="sawmill"
              onClick={wahoo}
              disabled={((gold < goldRequired.sawmill || user.sawmill) ? true : false)}>Purchase Sawmill ({`${goldRequired.sawmill}`}g)
            </button>
<<<<<<< HEAD
            <img className={style.hovertest} src="../../../../assets/info-cards/sawmill-info.png" alt="sawmill" />
=======
            <img className={style.hovertest} src={sawmillInfo} alt="sawmill" />
>>>>>>> 9517ef50806025d5b4c3b4615d97eee91b1b97ec
          </div> : ''
      }
      {
        (gold > (goldRequired.farm * revealPercent)) ?
          <div className={style.something}>
            <button
              className={((gold < goldRequired.farm) ? style.almost : ''),
              style.bigButton}
              value="farm"
              onClick={wahoo}
              disabled={((gold < goldRequired.farm || user.farm) ? true : false)}>Purchase Farm ({`${goldRequired.farm}`}g)
            </button>
<<<<<<< HEAD
            <img className={style.hovertest} src="../../../../assets/info-cards/farm-info.png" alt="farm" />
=======
            <img className={style.hovertest} src={farmInfo} alt="farm" />
>>>>>>> 9517ef50806025d5b4c3b4615d97eee91b1b97ec
          </div> : ''
      }
      {
        (gold > (goldRequired.blacksmith * revealPercent)) ?
          <div className={style.something}>
            <button
              className={((gold < goldRequired.blacksmith) ? style.almost : ''),
              style.bigButton}
              value="blacksmith"
              onClick={wahoo}
              disabled={((gold < goldRequired.blacksmith || user.blacksmith) ? true : false)}>Purchase Blacksmith ({`${goldRequired.blacksmith}`}g)
            </button>
<<<<<<< HEAD
            <img className={style.hovertest} src="../../../../assets/info-cards/blacksmith-info.png" alt="blacksmith" />
=======
            <img className={style.hovertest} src={blacksmithInfo} alt="blacksmith" />
>>>>>>> 9517ef50806025d5b4c3b4615d97eee91b1b97ec
          </div> : ''
      }
      {
        (gold > (goldRequired.tavern * revealPercent)) ?
          <div className={style.something}>
            <button
              className={((gold < goldRequired.tavern) ? style.almost : ''),
              style.bigButton}
              value="tavern"
              onClick={wahoo}
              disabled={((gold < goldRequired.tavern || user.tavern) ? true : false)}>Purchase Tavern ({`${goldRequired.tavern}`}g)
            </button>
<<<<<<< HEAD
            <img className={style.hovertest} src="../../../../assets/info-cards/tavern-info.png" alt="tavern" />
=======
            <img className={style.hovertest} src={tavernInfo} alt="tavern" />
>>>>>>> 9517ef50806025d5b4c3b4615d97eee91b1b97ec
          </div> : ''
      }
      {
        (gold > (goldRequired.castle * revealPercent)) ?
          <div className={style.something}>
            <button
              className={((gold < goldRequired.castle) ? style.almost : ''),
              style.bigButton}
              value="castle"
              onClick={wahoo}
              disabled={((gold < goldRequired.castle || user.castle) ? true : false)}>Purchase Castle ({`${goldRequired.castle}`}g)
            </button>
<<<<<<< HEAD
            <img className={style.hovertest} src="../../../../assets/info-cards/castle-info.png" alt="castle" />
=======
            <img className={style.hovertest} src={castleInfo} alt="castle" />
>>>>>>> 9517ef50806025d5b4c3b4615d97eee91b1b97ec
          </div> : ''
      }
    </div>);

};

GameControls.propTypes = {
  gold: PropTypes.number,
  clicks: PropTypes.number,
  handleClicks: PropTypes.func,
  unlockBuilding: PropTypes.func,
  revealPercent: PropTypes.number,
  detriment: PropTypes.shape({}),
  goldRequired: PropTypes.shape({
    lumberyard: PropTypes.number,
    windmill: PropTypes.number,
    mine: PropTypes.number,
    watermill: PropTypes.number,
    sawmill: PropTypes.number,
    farm: PropTypes.number,
    blacksmith: PropTypes.number,
    tavern: PropTypes.number,
    castle: PropTypes.number,
  }),
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
  setUser: PropTypes.func,
  setGold: PropTypes.func, 
  setGoldPerSecond: PropTypes.func, 
  setDetriment: PropTypes.func, 
};

export default GameControls;

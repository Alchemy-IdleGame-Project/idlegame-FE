/* eslint-disable no-self-assign */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import GameControls from '../components/app/controls/GameControls';
import Canvas from '../components/app/canvas/Canvas';
import { useInterval } from '../hooks/hooks.js';
import style from '../components/app/style.css';
import Prestige from '../components/app/prestige/Prestige';
import Hud from '../components/app/hud/Hud';
import UserControls from '../components/app/controls/UserControls';
import Detriment from '../components/app/detriment/Detriment';
import PropTypes from 'prop-types';
import { detrimentRoll, shutOffEffect } from '../gameUtils/detrimentUtils';
import { loadBuilding } from '../gameUtils/buildingUtils';
import { downloadSave } from '../gameUtils/userUtils';
import gameTitleImage from '../../assets/gametitle.png';
import goldCoin from '../../assets/gold-coin.png';


export default function Game(props) {
  const [gold, setGold] = useState(0);
  const [goldPerSecond, setGoldPerSecond] = useState(1);
  const [active, setActive] = useState(false);
  const [numClicks, setNumClicks] = useState(0);
  const [gametime, setGametime] = useState(0);
  const [prestige, setPrestige] = useState(0);
  const [loadUser, setLoadUser] = useState(false);
  const revealPercent = 0.66;

  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState({
    house: true,
    lumberyard: false,
    windmill: false,
    mine: false,
    watermill: false,
    sawmill: false,
    farm: false,
    blacksmith: false,
    tavern: false,
    castle: false,
  });

  const [activeTime, setActiveTime] = useState({
    termites: { lastActive: 0, duration: 41 },
    failedCrops: { lastActive: 0, duration: 15 },
    caveIn: { lastActive: 0, duration: 15 },
    flood: { lastActive: 0, duration: 41 },
    osha: { lastActive: 0, duration: 10 },
    peta: { lastActive: 0, duration: 10 },
    bandits: { lastActive: 0, duration: 201 },
    arson: { lastActive: 0, duration: 5 },
  });

  const [detriment, setDetriment] = useState({
    termites: { unlocked: false, active: false },
    failedCrops: { unlocked: false, active: false },
    caveIn: { unlocked: false, active: false },
    flood: { unlocked: false, active: false },
    osha: { unlocked: false, active: false },
    peta: { unlocked: false, active: false },
    bandits: { unlocked: false, active: false },
    arson: { unlocked: false, active: false },
  });

  const goldRequired = {
    lumberyard: 25 * (prestige + 1),
    windmill: 250 * (prestige + 1),
    mine: 2000 * (prestige + 1),
    watermill: 10000 * (prestige + 1),
    sawmill: 50000 * (prestige + 1),
    farm: 100000 * (prestige + 1),
    blacksmith: 500000 * (prestige + 1),
    tavern: 1000000 * (prestige + 1),
    castle: 10000000 * (prestige + 1),
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    Object.keys(user).map((item) => {
      if (user[item]) {
        loadBuilding(
          item,
          gold,
          prestige,
          goldRequired,
          setGoldPerSecond,
          setDetriment
        );
      }
    });
  }, [user, prestige]);

  useEffect(async () => {
    const saveData = await downloadSave(props.auth.auth.token);
    if (saveData) {
      setDetriment({
        termites: { unlocked: false, active: false },
        failedCrops: { unlocked: false, active: false },
        caveIn: { unlocked: false, active: false },
        flood: { unlocked: false, active: false },
        osha: { unlocked: false, active: false },
        peta: { unlocked: false, active: false },
        bandits: { unlocked: false, active: false },
        arson: { unlocked: false, active: false },
      });
      setGoldPerSecond(1);
      setGold(saveData.gold);
      setGametime(saveData.gametime);
      setPrestige(saveData.prestige);
      setNumClicks(saveData.clicks);
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
        castle: saveData.castle,
      });
    }
    setLoadUser(false);
  }, [loadUser]);

  function addToClicks() {
    setNumClicks((prevClicks) => ++prevClicks);
  }

  useEffect(() => {
    if (gametime % 40 === 0) {
      detrimentRoll(
        detriment,
        gametime,
        user,
        setGoldPerSecond,
        setActiveTime,
        setGold,
        setUser
      );
    }
    shutOffEffect(
      detriment,
      gametime,
      activeTime,
      setGoldPerSecond,
      setDetriment
    );
  }, [gametime]);

  function mineGold(prestige) {
    setGold((prevGold) => {
      //starts game if one is not going
      if (active === false) {
        setActive(true);
      }
      if (prestige > 0) {
        prevGold += goldPerSecond / 3 < 1 ? 1 : goldPerSecond / 3;
        return Math.floor(prevGold);
      } else {
        prevGold += goldPerSecond / 3 < 1 ? 1 : goldPerSecond / 3;
        return Math.floor(prevGold);
      }
    });
  }

  function passiveGold(prestige) {
    setGold((prevGold) => {
      //starts game if one is not going
      if (active === false) {
        setActive(true);
      }
      if (prestige > 0) {
        prevGold += goldPerSecond;
        return Math.floor(prevGold);
      } else {
        prevGold += goldPerSecond;
        return Math.floor(prevGold);
      }
    });
  }

  function gameClock() {
    setGametime((prevTime) => {
      prevTime++;
      return prevTime;
    });
  }

  //starts the gold per second loop on load
  useInterval(passiveGold, 1000);

  //starts the gameClock
  useInterval(gameClock, 1000);

  return (
    <div>
      <div className={style.overhead}>
        <UserControls
          handleMineClick={mineGold}
          handleClicks={addToClicks}
          setLoaduser={setLoadUser}
          user={user}
          gold={gold}
          auth={props.auth}
          setLoadUser={setLoadUser}
          prestige={prestige}
          gametime={gametime}
          setUser={setUser}
          setGold={setGold}
          numClicks={numClicks}
          setGoldPerSecond={setGoldPerSecond}
          setGametime={setGametime}
          setNumClicks={setNumClicks}
          setPrestige={setPrestige}
          setDetriment={setDetriment}
        />
        <Prestige
          user={user}
          prestige={prestige}
          setPrestige={setPrestige}
          setUser={setUser}
          setGold={setGold}
          setGoldPerSecond={setGoldPerSecond}
          setGametime={setGametime}
          setNumClicks={setNumClicks}
          setDetriment={setDetriment}
        />
        <h1 className={style.gameTitle}>
<<<<<<< HEAD
          <img src={gameTitleImage} alt="idle isle" />
=======
          <img src="../../assets/gametitle.PNG" alt="idle isle" />
>>>>>>> 9517ef50806025d5b4c3b4615d97eee91b1b97ec
        </h1>
        <div className={style.hud}>
          <Hud
            gold={gold}
            clicks={numClicks}
            gametime={gametime}
            gPS={goldPerSecond}
          />
        </div>
      </div>

      <div className={style.bigbam}>
        <GameControls
          handleMineClick={mineGold}
          handleClicks={addToClicks}
          gold={gold}
          revealPercent={revealPercent}
          goldRequired={goldRequired}
          clicks={numClicks}
          detriment={detriment}
          setUser={setUser}
          setGold={setGold}
          setGoldPerSecond={setGoldPerSecond}
          setDetriment={setDetriment}
          user={user}
        />

        {/* experimenting with being able to have more properties in the user but not passing properties that arent necessary */}
        <Canvas
          gametime={gametime}
          user={user}
        
          active={(active) ? 1 : 0}
          prestige={prestige}
        />
        <Detriment detriment={detriment} />

        <ul className={style.circles}>
         
          <li>
<<<<<<< HEAD
            <img width="100px" src="../../assets/gold-coin.png" />
          </li>
          <li>
            <img width="100px" src="../../assets/gold-coin.png" />
          </li>
          <li>
            <img width="100px" src="../../assets/gold-coin.png" />
          </li>
          <li>
            <img width="100px" src="../../assets/gold-coin.png" />
          </li>
          <li>
            <img width="100px" src="../../assets/gold-coin.png" />
          </li>
          <li>
            <img width="100px" src="../../assets/gold-coin.png" />
          </li>
          <li>
            <img width="100px" src="../../assets/gold-coin.png" />
          </li>
          <li>
            <img width="100px" src="../../assets/gold-coin.png" />
          </li>
          <li>
            <img width="100px" src="../../assets/gold-coin.png" />
=======
            <img width="100px" src={goldCoin} />
          </li>
          <li>
            <img width="100px" src={goldCoin} />
          </li>
          <li>
            <img width="100px" src={goldCoin} />
          </li>
          <li>
            <img width="100px" src={goldCoin} />
          </li>
          <li>
            <img width="100px" src={goldCoin} />
          </li>
          <li>
            <img width="100px" src={goldCoin} />
          </li>
          <li>
            <img width="100px" src={goldCoin} />
          </li>
          <li>
            <img width="100px" src={goldCoin} />
          </li>
          <li>
            <img width="100px" src={goldCoin} />
>>>>>>> 9517ef50806025d5b4c3b4615d97eee91b1b97ec
          </li>
        </ul>
      </div>
    </div>
  );
}
Game.propTypes = {
  auth: PropTypes.shape({
    auth: PropTypes.shape({
      email: PropTypes.string.isRequired,
      token: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

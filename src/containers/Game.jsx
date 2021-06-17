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
import * as request from 'superagent';
import PropTypes from 'prop-types';

export default function Game(props) {
  const [gold, setGold] = useState(50000000);
  const [goldPerSecond, setGoldPerSecond] = useState(1);
  const [active, setActive] = useState(false);
  const [numClicks, setNumClicks] = useState(0);
  const [gametime, setGametime] = useState(0);
  const [prestige, setPrestige] = useState(0);

  // const [activeUser, setActiveUser] = useState();
  // const [signInPrompt, setSignInPrompt] = useState(false);
  // const [save, setSave] = useState('');

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
    termites: { lastActive: 0, duration: 2 },
    failedCrops: { lastActive: 0, duration: 2 },
    caveIn: { lastActive: 0, duration: 2 },
    flood: { lastActive: 0, duration: 2 },
    osha: { lastActive: 0, duration: 2 },
    peta: { lastActive: 0, duration: 2 },
    bandits: { lastActive: 0, duration: 30 },
    arson: { lastActive: 0, duration: 2 },
  });

  const url = process.env.DATABASE_URL;

  const uploadSave = async (built, token) => {
    const response = await request
      .post(`${url}/api/unlocked`)
      .set('Authorization', token)
      .send(built);
    return response.body;
  };

  const downloadSave = async (token) => {
    const response = await request
      .get(`${url}/api/unlocked`)
      .set('Authorization', token);
    return response.body[response.body.length - 1];
  };

  const [loadUser, setLoadUser] = useState(false);

  useEffect(async () => {
    const saveData = await downloadSave(props.auth.auth.token);
    if (typeof saveData !== 'undefined'){
      setGoldPerSecond(1);
      setGold(saveData.gold);
      setGametime(saveData.gametime);
      setPrestige(saveData.prestige);
      setNumClicks(saveData.clicks);
      setUser((prevUser) => {
        prevUser = {
          house: true,
          ...saveData
        };
        let o = {};
        Object.keys(prevUser).map(item => {
          if (typeof prevUser[item] === 'boolean'){
            o = {
              [item]: prevUser[item]
            };
          }
          if (o[item]){
            // setDetriment((prevDet) => {
            //   Object.keys(prevDet).map(item2 => {
            //     prevDet[item2].unlocked = true;
            //   });
            //   return prevDet;
            console.log(item);
            loadBuilding(item);
          }
        }
        );
        return prevUser;
      });
    }
  }, [loadUser]);

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
  const revealPercent = 0.66;

  //anytime we refresh make sure to push the state to the DB
  //window.onbeforeunload= ourFunctionToUpdateDB(user);

  function loadBuilding(item) {
    switch (item) {
      case 'lumberyard': {
        if (gold < goldRequired.lumberyard) return;
        setUser({
          ...user,
          [item]: true,
        });
        setGoldPerSecond(
          (prevGold) => prevGold + goldRequired.lumberyard * 0.1 - 0.5
        );
        setDetriment({
          ...detriment,
          termites: {
            active: false,
            unlocked: true,
          },
        });
        break;
      }
      case 'windmill': {
        if (gold < goldRequired.windmill) return;
        setUser({
          ...user,
          [item]: true,
        });
        setGoldPerSecond((prevGold) => prevGold + goldRequired.windmill * 0.06);
        setDetriment({
          ...detriment,
          failedCrops: {
            active: false,
            unlocked: true,
          },
        });
        break;
      }
      case 'mine': {
        if (gold < goldRequired.mine) return;
        setUser({
          ...user,
          [item]: true,
        });
        setGoldPerSecond((prevGold) => prevGold + goldRequired.mine * 0.01);
        setDetriment({
          ...detriment,
          caveIn: {
            active: false,
            unlocked: true,
          },
        });
        break;
      }
      case 'watermill': {
        if (gold < goldRequired.watermill) return;
        setUser({
          ...user,
          [item]: true,
        });
        setGoldPerSecond(
          (prevGold) => prevGold + goldRequired.watermill * 0.003
        );
        setDetriment({
          ...detriment,
          flood: {
            active: false,
            unlocked: true,
          },
        });
        break;
      }
      case 'sawmill': {
        if (gold < goldRequired.sawmill) return;
        setUser({
          ...user,
          [item]: true,
        });
        setGoldPerSecond((prevGold) => prevGold + goldRequired.sawmill * 0.001);
        setDetriment({
          ...detriment,
          osha: {
            active: false,
            unlocked: true,
          },
        });
        break;
      }
      case 'farm': {
        if (gold < goldRequired.farm) return;
        setUser({
          ...user,
          [item]: true,
        });
        setGoldPerSecond((prevGold) => prevGold + goldRequired.farm * 0.002);
        setDetriment({
          ...detriment,
          peta: {
            active: false,
            unlocked: true,
          },
        });
        break;
      }
      case 'blacksmith': {
        if (gold < goldRequired.blacksmith) return;
        setUser({
          ...user,
          [item]: true,
        });
        setGoldPerSecond(
          (prevGold) => prevGold + goldRequired.blacksmith * 0.001
        );
        setDetriment({
          ...detriment,
          bandits: {
            active: false,
            unlocked: true,
          },
        });
        break;
      }
      case 'tavern': {
        if (gold < goldRequired.tavern) return;
        setUser({
          ...user,
          [item]: true,
        });
        setGoldPerSecond((prevGold) => prevGold + goldRequired.tavern * 0.002);
        setDetriment({
          ...detriment,
          arson: {
            active: false,
            unlocked: true,
          },
        });
        break;
      }
      case 'castle': {
        if (gold < goldRequired.castle) return;
        setUser({
          ...user,
          [item]: true,
        });
        setGoldPerSecond((prevGold) => prevGold + goldRequired.castle * 0.1);
        break;
      }
    }
  }

  function addToClicks() {
    setNumClicks((prevClicks) => ++prevClicks);
  }

  function detrimentRoll() {
    //maps over each key in the detriment object checking for an unlocked value
    Object.keys(detriment).map((item) => {
      //if the prop is unlocked, roll for a chance to activate detriment
      if (detriment[item].unlocked && !detriment[item].active) {
        console.log('how many times do I roll?');
        const roll = Math.ceil(Math.random() * 10);
        if (roll >= 8) {
          detriment[item].active = true;
          //switch case to put into effect in state, our detriment values
          switch (item) {
            //name of detriment
            case 'termites': {
              console.log('activating termites');
              //detriment effect
              setGoldPerSecond((prevGold) => {
                prevGold--;
                return prevGold;
              });
              //time for which the detriment is active
              setActiveTime((prevActive) => {
                prevActive.termites.lastActive = gametime;
                return {
                  ...prevActive,
                };
              });
              console.log(activeTime.termites);
              break;
            }

            case 'failedCrops': {
              console.log('activating crop failure');
              //detriment effect
              setGoldPerSecond((prevGold) => {
                prevGold = prevGold - 10;
                return prevGold;
              });
              //time for which the detriment is active
              setActiveTime((prevActive) => {
                prevActive.failedCrops.lastActive = gametime;
                return {
                  ...prevActive,
                };
              });
              console.log(activeTime.failedCrops);
              break;
            }

            case 'caveIn': {
              console.log('activating cave in Runnnnn');
              //detriment effect
              setGoldPerSecond((prevGold) => {
                prevGold = prevGold - 20;
                return prevGold;
              });
              //grab current time to start detriment timer once it meets the detriment duration, it will shut off
              setActiveTime((prevActive) => {
                prevActive.caveIn.lastActive = gametime;
                return {
                  ...prevActive,
                };
              });
              console.log(activeTime.caveIn);
              break;
            }

            case 'flood': {
              setGold((prevGold) => {
                prevGold = prevGold - 10000;
                prevGold < 0 ? (prevGold = 0) : (prevGold = prevGold);
                return Math.floor(prevGold);
              });
              //grab current time to start detriment timer once it meets the detriment duration, it will shut off
              setActiveTime((prevActive) => {
                prevActive.flood.lastActive = gametime;
                return {
                  ...prevActive,
                };
              });
              console.log(activeTime.flood);
              break;
            }

            case 'osha': {
              console.log('osha is on the grounds');
              //detriment effect
              setGold((prevGold) => {
                prevGold = prevGold - 50000;
                prevGold < 0 ? (prevGold = 0) : (prevGold = prevGold);
                return Math.floor(prevGold);
              });
              setGoldPerSecond((prevGoldPerSecond) => {
                prevGoldPerSecond = prevGoldPerSecond * 0.8;
                return prevGoldPerSecond;
              });
              //grab current time to start detriment timer once it meets the detriment duration, it will shut off
              setActiveTime((prevActive) => {
                prevActive.osha.lastActive = gametime;
                return {
                  ...prevActive,
                };
              });
              console.log(activeTime.flood);
              break;
            }

            case 'peta': {
              console.log('those annoying peta folks are around');
              //detriment effect
              setGoldPerSecond((prevGold) => {
                prevGold = prevGold * 0.9;
                return prevGold;
              });
              //grab current time to start detriment timer once it meets the detriment duration, it will shut off
              setActiveTime((prevActive) => {
                prevActive.peta.lastActive = gametime;
                return {
                  ...prevActive,
                };
              });
              console.log(activeTime.flood);
              break;
            }

            case 'bandits': {
              console.log('bandits, run away ');
              //detriment effect
              setGold((prevGold) => {
                prevGold = prevGold * 0.25;
                return Math.floor(prevGold);
              });
              //grab current time to start detriment timer once it meets the detriment duration, it will shut off
              setActiveTime((prevActive) => {
                prevActive.bandits.lastActive = gametime;
                return {
                  ...prevActive,
                };
              });
              console.log(activeTime.flood);
              break;
            }

            case 'arson': {
              console.log('the tavern has burnt to the ground!');
              //detriment effect
              setUser({ ...user, tavern: false });
              //grab current time to start detriment timer once it meets the detriment duration, it will shut off
              setActiveTime((prevActive) => {
                prevActive.arson.lastActive = gametime;
                return {
                  ...prevActive,
                };
              });
              console.log(user, 'after arson burnt the tavern');
              break;
            }
            default: {
              break;
            }
          }
        } else {
          console.log('rolled less than an 8');
        }
      }
    });
  }

  //if the prop is unlocked and detriment is active, set the detriment back to inactive and remove negative effects
  function shutOffEffect() {
    Object.keys(detriment).map((item) => {
      if (
        detriment[item].unlocked &&
        detriment[item].active &&
        gametime - activeTime[item].duration === activeTime[item].lastActive
      ) {
        console.log(activeTime, 'logging here');
        switch (item) {
          case 'termites': {
            console.log('shutting off termites');
            setDetriment((prevDetriment) => {
              prevDetriment.termites.active = false;
              return prevDetriment;
            });
            setGoldPerSecond((prevGold) => {
              prevGold++;
              return prevGold;
            });
            break;
          }
          case 'failedCrops': {
            setDetriment((prevDetriment) => {
              prevDetriment.failedCrops.active = false;
              return prevDetriment;
            });
            setGoldPerSecond((prevGold) => {
              prevGold++;
              return prevGold;
            });
            break;
          }
          case 'caveIn': {
            setDetriment((prevDetriment) => {
              prevDetriment.caveIn.active = false;
              return prevDetriment;
            });
            setGoldPerSecond((prevGold) => {
              prevGold = prevGold + 20;
              return prevGold;
            });
            break;
          }
          case 'flood': {
            setDetriment((prevDetriment) => {
              prevDetriment.flood.active = false;
              return prevDetriment;
            });
            break;
          }
          case 'osha': {
            setDetriment((prevDetriment) => {
              prevDetriment.osha.active = false;
              return prevDetriment;
            });
            setGoldPerSecond((prevGold) => {
              prevGold = prevGold * 1.25;
              return prevGold;
            });
            break;
          }
          case 'peta': {
            setDetriment((prevDetriment) => {
              prevDetriment.peta.active = false;
              return prevDetriment;
            });
            setGoldPerSecond((prevGold) => {
              prevGold = prevGold * 1.112;
              return Math.floor(prevGold);
            });
            break;
          }
          case 'bandits': {
            setDetriment((prevDetriment) => {
              prevDetriment.bandits.active = false;
              return prevDetriment;
            });
            setGoldPerSecond((prevGold) => {
              prevGold++;
              return prevGold;
            });
            break;
          }
          case 'arson': {
            setDetriment((prevDetriment) => {
              prevDetriment.arson.active = false;
              return prevDetriment;
            });
            setGoldPerSecond((prevGold) => {
              prevGold++;
              return prevGold;
            });
            break;
          }
          default: {
            break;
          }
        }
      }
    });
  }

  useEffect(() => {
    if (gametime % 3 === 0) {
      detrimentRoll();
    }
    shutOffEffect();
  }, [gametime]);

  function mineGold(prestige) {
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

  //starts the mine gold per second loop on load
  useInterval(mineGold, 1000);

  //starts the gameClock
  useInterval(gameClock, 1000);

  function unlockBuilding({ target }) {
    switch (target.value) {
      case 'lumberyard': {
        if (gold < goldRequired.lumberyard) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.lumberyard);
        setGoldPerSecond(
          (prevGold) => prevGold + goldRequired.lumberyard * 0.1 - 0.5
        );
        setDetriment({
          ...detriment,
          termites: {
            active: false,
            unlocked: true,
          },
        });
        break;
      }
      case 'windmill': {
        if (gold < goldRequired.windmill) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.windmill);
        setGoldPerSecond((prevGold) => prevGold + goldRequired.windmill * 0.06);
        setDetriment({
          ...detriment,
          failedCrops: {
            active: false,
            unlocked: true,
          },
        });
        break;
      }
      case 'mine': {
        if (gold < goldRequired.mine) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.mine);
        setGoldPerSecond((prevGold) => prevGold + goldRequired.mine * 0.01);
        setDetriment({
          ...detriment,
          caveIn: {
            active: false,
            unlocked: true,
          },
        });
        break;
      }
      case 'watermill': {
        if (gold < goldRequired.watermill) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.watermill);
        setGoldPerSecond(
          (prevGold) => prevGold + goldRequired.watermill * 0.003
        );
        setDetriment({
          ...detriment,
          flood: {
            active: false,
            unlocked: true,
          },
        });
        break;
      }
      case 'sawmill': {
        if (gold < goldRequired.sawmill) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.sawmill);
        setGoldPerSecond((prevGold) => prevGold + goldRequired.sawmill * 0.001);
        setDetriment({
          ...detriment,
          osha: {
            active: false,
            unlocked: true,
          },
        });
        break;
      }
      case 'farm': {
        if (gold < goldRequired.farm) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.farm);
        setGoldPerSecond((prevGold) => prevGold + goldRequired.farm * 0.002);
        setDetriment({
          ...detriment,
          peta: {
            active: false,
            unlocked: true,
          },
        });
        break;
      }
      case 'blacksmith': {
        if (gold < goldRequired.blacksmith) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.blacksmith);
        setGoldPerSecond(
          (prevGold) => prevGold + goldRequired.blacksmith * 0.001
        );
        setDetriment({
          ...detriment,
          bandits: {
            active: false,
            unlocked: true,
          },
        });
        break;
      }
      case 'tavern': {
        if (gold < goldRequired.tavern) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.tavern);
        setGoldPerSecond((prevGold) => prevGold + goldRequired.tavern * 0.002);
        setDetriment({
          ...detriment,
          arson: {
            active: false,
            unlocked: true,
          },
        });
        break;
      }
      case 'castle': {
        if (gold < goldRequired.castle) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.castle);
        setGoldPerSecond((prevGold) => prevGold + goldRequired.castle * 0.1);
        break;
      }
    }
  }

  function incrementPrestige() {
    if (user.castle) {
      setPrestige((prevPrestige) => {
        prevPrestige++;
        return prevPrestige;
      });
      setUser({
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
      setGold(0);
      setGoldPerSecond(1);
      setGametime(0);
      setNumClicks(0);
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
    }
  }

  function newGame() {
    setUser((prevUser) => {
      prevUser = {
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
      };
      let o = {};
      Object.keys(prevUser).map((item) => {
        if (typeof prevUser[item] === 'boolean') {
          o = {
            [item]: prevUser[item],
          };
        }
        if (o[item]) {
          setDetriment((prevDet) => {
            Object.keys(prevDet).map((item) => {
              prevDet[item].unlocked = false;
            });
            return prevDet;
          });
        }
      });
      return prevUser;
    });
    setGold(0);
    setGoldPerSecond(1);
    setGametime(0);
    setNumClicks(0);
    setPrestige(0);
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
  }

  return (
    <div>
      <div className={style.overhead}>
        <UserControls handleMineClick={mineGold} handleClicks={addToClicks} uploadSave={uploadSave} downloadSave={downloadSave} user={user} setUser={setUser} gold={gold} auth={props.auth} setLoadUser={setLoadUser} prestige={prestige} gametime={gametime} numClicks={numClicks} newGame={newGame}/>
        <Prestige handlePrestige={incrementPrestige} prestige={prestige} castle={user.castle}/>
        <h1 className={style.gameTitle}><img src="../../assets/gametitle.PNG" alt="idle isle" /></h1>
        <div className={style.hud}>
          <Hud
            gold={gold}
            clicks={numClicks}
            gametime={gametime}
            gPS={goldPerSecond}
            handlePrestige={incrementPrestige}
            prestige={prestige}
            castle={user.castle}
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
          unlockBuilding={unlockBuilding}
          user={user}
        />

        {/* experimenting with being able to have more properties in the user but not passing properties that arent necessary */}
        <Canvas
          gametime={gametime}
          user={user}
          active={active}
          prestige={prestige}
        />
        <Detriment detriment={detriment} />

        <ul className={style.circles}>
          <li>
            <li>
              <li>
                <img width="100px" src="../../assets/gold-coin.png" />
              </li>
            </li>
          </li>
          <li></li>
          <li></li>
          <li></li>
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
            <li>
              <li>
                <img width="100px" src="../../assets/gold-coin.png" />
              </li>
            </li>
          </li>
          <li>
            <img width="100px" src="../../assets/gold-coin.png" />
          </li>
          <li>
            <img width="100px" src="../../assets/gold-coin.png" />
          </li>
          <li></li>
          <li>
            <img width="100px" src="../../assets/gold-coin.png" />
          </li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
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

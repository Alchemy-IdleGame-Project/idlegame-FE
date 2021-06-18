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
  const [gold, setGold] = useState(0);
  const [goldPerSecond, setGoldPerSecond] = useState(1);
  const [active, setActive] = useState(false);
  const [numClicks, setNumClicks] = useState(0);
  const [gametime, setGametime] = useState(0);
  const [prestige, setPrestige] = useState(0);
  
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
    bandits: { lastActive: 0, duration: 41 },
    arson: { lastActive: 0, duration: 5 },
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

  useEffect(() => {
    if (!user || !prestige){
      return ;
    }
    Object.keys(user).map(item => {
      if (user[item]){          
        loadBuilding(item);
      }
    });
  }, [user, prestige]);


  useEffect(async () => {
    const saveData = await downloadSave(props.auth.auth.token);
    if (saveData){
      setDetriment({
        termites: { unlocked: false, active: false },
        failedCrops: { unlocked: false, active: false },
        caveIn: { unlocked: false, active: false },
        flood: { unlocked: false, active: false },
        osha: { unlocked: false, active: false },
        peta: { unlocked: false, active: false },
        bandits: { unlocked: false, active: false },
        arson: { unlocked: false, active: false }
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
        console.log(prestige, 'look over here');
        setGoldPerSecond(
          (prevGold) => Math.floor(prevGold + goldRequired.lumberyard * 0.1)
        );
        setDetriment((prevDetriment) => {
          prevDetriment.termites.unlocked = true;
          return prevDetriment;
        });
        break;
      }
      case 'windmill': {
        if (gold < goldRequired.windmill) return;
        setGoldPerSecond((prevGold) => Math.floor(prevGold + goldRequired.windmill * 0.06));
        setDetriment((prevDetriment) => {
          prevDetriment.failedCrops.unlocked = true;
          return prevDetriment;
        });
        break;
      }
      case 'mine': {
        if (gold < goldRequired.mine) return;
        setGoldPerSecond((prevGold) => Math.floor(prevGold + goldRequired.mine * 0.01));
        setDetriment((prevDetriment) => {
          prevDetriment.caveIn.unlocked = true;
          return prevDetriment;
        });
        break;      }
      case 'watermill': {
        if (gold < goldRequired.watermill) return;
        setGoldPerSecond(
          (prevGold) => Math.floor(prevGold + goldRequired.watermill * 0.003)
        );
        setDetriment((prevDetriment) => {
          prevDetriment.flood.unlocked = true;
          return prevDetriment;
        });
        break;      }
      case 'sawmill': {
        if (gold < goldRequired.sawmill) return;
        setGoldPerSecond((prevGold) => Math.floor(prevGold + goldRequired.sawmill * 0.001));
        setDetriment((prevDetriment) => {
          prevDetriment.osha.unlocked = true;
          return prevDetriment;
        });
        break;      }
      case 'farm': {
        if (gold < goldRequired.farm) return;
        setGoldPerSecond((prevGold) => Math.floor(prevGold + goldRequired.farm * 0.002));
        setDetriment((prevDetriment) => {
          prevDetriment.peta.unlocked = true;
          return prevDetriment;
        });
        break;      }
      case 'blacksmith': {
        if (gold < goldRequired.blacksmith) return;
        setGoldPerSecond(
          (prevGold) => Math.floor(prevGold + goldRequired.blacksmith * 0.001)
        );
        setDetriment((prevDetriment) => {
          prevDetriment.bandits.unlocked = true;
          return prevDetriment;
        });
        break;      }
      case 'tavern': {
        if (gold < goldRequired.tavern) return;
        setGoldPerSecond((prevGold) => Math.floor(prevGold + goldRequired.tavern * 0.002));
        setDetriment((prevDetriment) => {
          prevDetriment.arson.unlocked = true;
          return prevDetriment;
        });
        break;      }
      case 'castle': {
        if (gold < goldRequired.castle) return;
        setGoldPerSecond((prevGold) => Math.floor(prevGold + goldRequired.castle * 0.1));
        break;
      }
    }
  }

  function addToClicks() {
    setNumClicks((prevClicks) => ++prevClicks);
  }

  function detrimentRoll() {
    //maps over each key in the detriment object checking for an unlocked value
    Object.keys(detriment).map(item => {
    //if the prop is unlocked, roll for a chance to activate detriment
      if (detriment[item].unlocked && !detriment[item].active){
        
        const roll = Math.ceil(Math.random() * 100);
        if (roll >= 85) {
          detriment[item].active = true;
          //switch case to put into effect in state, our detriment values
          switch (item) {
            //name of detriment
            case 'termites': {
              
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
              
              break;
            }

            case 'failedCrops': {

              
              //detriment effect
              setGoldPerSecond((prevGold) => {
                prevGold = prevGold - 9;
                return prevGold;
              });
              //time for which the detriment is active
              setActiveTime((prevActive) => {
                prevActive.failedCrops.lastActive = gametime;
                return {
                  ...prevActive,
                };
              });
              
              break;
            }

            case 'caveIn': {
              
              //detriment effect
              setGoldPerSecond((prevGold) => {
                prevGold = prevGold - 18;
                return prevGold;
              });
              //grab current time to start detriment timer once it meets the detriment duration, it will shut off
              setActiveTime((prevActive) => {
                prevActive.caveIn.lastActive = gametime;
                return {
                  ...prevActive,
                };
              });
              
              break;
            }

            case 'flood': {
              setGold((prevGold) => {
                prevGold = prevGold - 5000;
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
              
              break;
            }

            case 'osha': {
              
              //detriment effect
              setGold((prevGold) => {
                prevGold = prevGold - 20000;
                prevGold < 0 ? (prevGold = 0) : (prevGold = prevGold);
                return Math.floor(prevGold);
              });
              setGoldPerSecond((prevGoldPerSecond) => {
                prevGoldPerSecond = prevGoldPerSecond * 0.75;
                return prevGoldPerSecond;
              });
              //grab current time to start detriment timer once it meets the detriment duration, it will shut off
              setActiveTime((prevActive) => {
                prevActive.osha.lastActive = gametime;
                return {
                  ...prevActive,
                };
              });
              
              break;
            }

            case 'peta': {
              
              //detriment effect
              setGoldPerSecond((prevGold) => {
                prevGold = prevGold * 0.80;
                return prevGold;
              });
              //grab current time to start detriment timer once it meets the detriment duration, it will shut off
              setActiveTime((prevActive) => {
                prevActive.peta.lastActive = gametime;
                return {
                  ...prevActive,
                };
              });
              
              break;
            }

            case 'bandits': {
              
              //detriment effect
              setGold((prevGold) => {
                prevGold = prevGold * 0.75;
                return Math.floor(prevGold);
              });
              //grab current time to start detriment timer once it meets the detriment duration, it will shut off
              setActiveTime((prevActive) => {
                prevActive.bandits.lastActive = gametime;
                return {
                  ...prevActive,
                };
              });
              
              break;
            }

            case 'arson': {
              //detriment effect
              setUser({ ...user, tavern: false });
              //grab current time to start detriment timer once it meets the detriment duration, it will shut off
              setActiveTime((prevActive) => {
                prevActive.arson.lastActive = gametime;
                return {
                  ...prevActive
                } ;
              });
              setDetriment((prevDetriment) => {
                prevDetriment.arson.unlocked = false;
                return prevDetriment;
              });       
              break;
            }
            default: {
              break;
            }
          }
        }
      }
    });
  }
  //if the prop is unlocked and detriment is active, set the detriment back to inactive and remove negative effects
  function shutOffEffect(){
    Object.keys(detriment).map(item => {
      if (detriment[item].unlocked && 
          detriment[item].active && 
      gametime - activeTime[item].duration === activeTime[item].lastActive){
        
        switch (item){
          case 'termites' :{
            
            setDetriment(prevDetriment => {
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
              prevGold = prevGold + 9;
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
              prevGold = prevGold + 18;
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
              prevGold = prevGold / .75;
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
              prevGold = prevGold / .8;
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
    if (gametime % 40 === 0) {
      detrimentRoll();
    }
    shutOffEffect();
  }, [gametime]);

  function mineGold(prestige) {
    console.log((goldPerSecond / 10));
    setGold((prevGold) => {
      //starts game if one is not going
      if (active === false) {
        setActive(true);
      }
      if (prestige > 0) {
        prevGold += ((goldPerSecond / 3) < 1) ? 1 : (goldPerSecond / 3) ;
        return Math.floor(prevGold);
      } else {
        prevGold += ((goldPerSecond / 3) < 1) ? 1 : (goldPerSecond / 3) ;
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

  //starts the mine gold per second loop on load
  useInterval(passiveGold, 1000);

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
          (prevGold) => Math.floor(prevGold + goldRequired.lumberyard * 0.1)
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
        setGoldPerSecond((prevGold) => Math.floor(prevGold + goldRequired.windmill * 0.06));
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
        setGoldPerSecond((prevGold) => Math.floor(prevGold + goldRequired.mine * 0.01));
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
          (prevGold) => Math.floor(prevGold + goldRequired.watermill * 0.003)
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
        setGoldPerSecond((prevGold) => Math.floor(prevGold + goldRequired.sawmill * 0.001));
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
        setGoldPerSecond((prevGold) => Math.floor(prevGold + goldRequired.farm * 0.002));
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
          (prevGold) => Math.floor(prevGold + goldRequired.blacksmith * 0.001)
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
        setGoldPerSecond((prevGold) => Math.floor(prevGold + goldRequired.tavern * 0.002));
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
        setGoldPerSecond((prevGold) => Math.floor(prevGold + goldRequired.castle * 0.1));
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
      return prevUser;
    });
  }

  return (
    <div>
      <div className={style.overhead}>
        <UserControls handleMineClick={mineGold} handleClicks={addToClicks} uploadSave={uploadSave} user={user} gold={gold} auth={props.auth} prestige={prestige} gametime={gametime} numClicks={numClicks} newGame={newGame}/>
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

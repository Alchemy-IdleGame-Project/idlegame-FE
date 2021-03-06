/* eslint-disable max-len */

export function detrimentRoll(
  detriment,
  gametime,
  user,
  setGoldPerSecond,
  setActiveTime,
  setGold,
  setUser
) {
  //maps over each key in the detriment object checking for an unlocked value
  Object.keys(detriment).map((item) => {
    //if the prop is unlocked, roll for a chance to activate detriment
    if (detriment[item].unlocked && !detriment[item].active) {
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
              prevGold = prevGold - 12000;
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
              prevGold = prevGold * 0.8;
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
            setGoldPerSecond((prevGold) => {
              prevGold = prevGold - 2000;
              return prevGold;
            });
            //detriment effect
            setUser({ ...user, tavern: false });
            //grab current time to start detriment timer once it meets the detriment duration, it will shut off
            setActiveTime((prevActive) => {
              prevActive.arson.lastActive = gametime;
              return {
                ...prevActive,
              };
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
export function shutOffEffect(
  detriment,
  gametime,
  activeTime,
  setGoldPerSecond,
  setDetriment
) {
  Object.keys(detriment).map((item) => {
    if (
      detriment[item].unlocked &&
      detriment[item].active &&
      gametime - activeTime[item].duration === activeTime[item].lastActive
    ) {
      switch (item) {
        case 'termites': {
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
            prevGold = prevGold / 0.75;
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
            prevGold = prevGold / 0.8;
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

/* eslint-disable max-len */
export function loadBuilding(item, gold, prestige, goldRequired, setGoldPerSecond, setDetriment) {
  switch (item) {
    case 'lumberyard': {
     
 
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
     
      setGoldPerSecond((prevGold) => Math.floor(prevGold + goldRequired.windmill * 0.06));
      setDetriment((prevDetriment) => {
        prevDetriment.failedCrops.unlocked = true;
        return prevDetriment;
      });
      break;
    }
    case 'mine': {
     
      setGoldPerSecond((prevGold) => Math.floor(prevGold + goldRequired.mine * 0.01));
      setDetriment((prevDetriment) => {
        prevDetriment.caveIn.unlocked = true;
        return prevDetriment;
      });
      break;      }
    case 'watermill': {
     
      setGoldPerSecond(
        (prevGold) => Math.floor(prevGold + goldRequired.watermill * 0.003)
      );
      setDetriment((prevDetriment) => {
        prevDetriment.flood.unlocked = true;
        return prevDetriment;
      });
      break;      }
    case 'sawmill': {
     
      setGoldPerSecond((prevGold) => Math.floor(prevGold + goldRequired.sawmill * 0.001));
      setDetriment((prevDetriment) => {
        prevDetriment.osha.unlocked = true;
        return prevDetriment;
      });
      break;      }
    case 'farm': {
     
      setGoldPerSecond((prevGold) => Math.floor(prevGold + goldRequired.farm * 0.002));
      setDetriment((prevDetriment) => {
        prevDetriment.peta.unlocked = true;
        return prevDetriment;
      });
      break;      }
    case 'blacksmith': {
     
      setGoldPerSecond(
        (prevGold) => Math.floor(prevGold + goldRequired.blacksmith * 0.001)
      );
      setDetriment((prevDetriment) => {
        prevDetriment.bandits.unlocked = true;
        return prevDetriment;
      });
      break;      }
    case 'tavern': {
     
      setGoldPerSecond((prevGold) => Math.floor(prevGold + goldRequired.tavern * 0.002));
      setDetriment((prevDetriment) => {
        prevDetriment.arson.unlocked = true;
        return prevDetriment;
      });
      break;      }
    case 'castle': {
     
      setGoldPerSecond((prevGold) => Math.floor(prevGold + goldRequired.castle * 0.1));
      break;
    }
  }
}

export function unlockBuilding(e, gold, user, detriment, goldRequired, setUser, setGold, setGoldPerSecond, setDetriment) {
  switch (e.target.value) {
    case 'lumberyard': {
     
      setUser({
        ...user,
        [e.target.value]: true,
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
     
      setUser({
        ...user,
        [e.target.value]: true,
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
     
      setUser({
        ...user,
        [e.target.value]: true,
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
     
      setUser({
        ...user,
        [e.target.value]: true,
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
     
      setUser({
        ...user,
        [e.target.value]: true,
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
     
      setUser({
        ...user,
        [e.target.value]: true,
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
     
      setUser({
        ...user,
        [e.target.value]: true,
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
     
      setUser({
        ...user,
        [e.target.value]: true,
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
     
      setUser({
        ...user,
        [e.target.value]: true,
      });
      setGold((prevGold) => prevGold - goldRequired.castle);
      setGoldPerSecond((prevGold) => Math.floor(prevGold + goldRequired.castle * 0.1));
      break;
    }
  }
}

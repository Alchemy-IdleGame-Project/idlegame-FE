/* eslint-disable max-len */
export function incrementPrestige(user, setPrestige, setUser, setGold, setGoldPerSecond, setGametime, setNumClicks, setDetriment) {
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

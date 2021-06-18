/* eslint-disable max-len */
import * as request from 'superagent';
const url = process.env.DATABASE_URL;

export const uploadSave = async (built, token) => {
  const response = await request
    .post(`${url}/api/unlocked`)
    .set('Authorization', token)
    .send(built);
  return response.body;
};

export const downloadSave = async (token) => {
  const response = await request
    .get(`${url}/api/unlocked`)
    .set('Authorization', token);
  return response.body[response.body.length - 1];
};

export function newGame(
  setUser,
  setGold,
  setGoldPerSecond,
  setGametime,
  setNumClicks,
  setPrestige,
  setDetriment
) {
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
    setGold(500000);
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

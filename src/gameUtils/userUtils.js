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

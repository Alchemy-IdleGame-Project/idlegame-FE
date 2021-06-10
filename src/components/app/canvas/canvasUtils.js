import { layers } from '../../../../assets/MaptheSecond.json';



const spliceyBoi = (array) => {
  const finalArr = [],
    size = 50;
  while(array.length > 0) finalArr.push(array.splice(0, size));
  return finalArr;
};

const convertTiles = (array) => {
  for(let i = 0; i < array.length; i++) {
    const object = array[i];
    if(object.tileset === 'SP-Overworld.png'){
      for(let i = 0; i < object.data.length; i++){
        const a = (Math.trunc(object.data[i]));
        const b = ((isNaN((object.data[i] + '').split('.')[1]) * 8) ? 0 :
          (((object.data[i] + '').split('.')[1]) * 8));
        const tile = a + b;
        object.data[i] = tile;
      }
    } else {
      for(let i = 0; i < object.data.length; i++){
        const a = (Math.trunc(object.data[i]));
        const b = ((object.data[i] + '').split('.')[1]) * 16;
        const tile = a + b;
        object.data[i] = tile;
      }
    }
    array[i] = spliceyBoi(object.data);
  }
  return array;
};
const convertedLayers = convertTiles(layers);
export default convertedLayers;

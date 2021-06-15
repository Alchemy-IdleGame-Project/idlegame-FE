import { layers } from '../../../../assets/MaptheSecond.json';

const tilesetImage = new Image();
const tilesetImage2 = new Image();
tilesetImage.src = '../../../../assets/SP-Overworld.png';
tilesetImage2.src = '../../../../assets/Compilation-Building32x32.png';
const tileSize = 16; // The size of a tile (32×32)
const rowTileCount = 38; // The number of tiles in a row of our background
const colTileCount = 50; // The number of tiles in a column of our background
const imageNumTiles = 8; // The number of tiles per row in the tileset image
const imageNumTiles2 = 16; // The number of tiles per row in the tileset image

export const drawClouds = (ctx, amount) => {
  ctx.strokeStyle = 'rgba(255,255,255,.5)';
  const x = 5 + Math.random() * 800;
  const y = amount * Math.random();

  const a = amount * Math.random();
  const b = amount * Math.random();

  const l = amount * Math.random();
  const m = amount * Math.random();

  
  // Create circular clipping region

  const radiusX = 5 + Math.random() * 50;
  const radiusY = 5 + Math.random() * 50;
  const width = Math.random() * 40;
  const rotation = 5;
  const startAngle = 45;

  ctx.fillStyle = 'rgba(255,255,255,.5)';
  for (let i = x; i < 800; i++){
    ctx.beginPath();
    ctx.arc(x, y, radiusX, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgba()';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000000';
    // ctx.ellipse(x, y, radiusX, radiusY, Math.PI * .25, 0, Math.PI * 1.5);
    
  }
  ctx.stroke();
  // ctx.ellipse(a, b, 100, 200, rotation, startAngle, false);
  // ctx.ellipse(l, m, 100, 200, rotation, startAngle, false);


  // ctx.fillRect(25, 25, 100, 100);
  // ctx.clearRect(45, 45, 60, 60);
  // ctx.strokeRect(x, y, width, width);
  // ctx.strokeRect(x, y, width, width);
  // ctx.strokeRect(x, y, width, width);
  // ctx.strokeRect(x, y, width, width);
  // ctx.strokeRect(x, y, width, width);
  // ctx.strokeRect(x, y, width, width);

  return { x, y, a, b, l, m };
};

const draw = (ctx, array) => {
  for (let r = 0; r < rowTileCount; r++) {
    for (let c = 0; c < colTileCount; c++) {
      const tile = array[r][c];
      const tileRow = (tile / imageNumTiles) | 0; // Bitwise OR operation
      const tileCol = tile % imageNumTiles | 0;
      ctx.drawImage(
        tilesetImage,
        tileCol * tileSize,
        tileRow * tileSize,
        tileSize,
        tileSize,
        c * tileSize,
        r * tileSize,
        tileSize,
        tileSize
      );
    }
  }
};

const draw2 = (ctx, array) => {
  for (let r = 0; r < rowTileCount; r++) {
    for (let c = 0; c < colTileCount; c++) {
      const tile = array[r][c];
      const tileRow = (tile / imageNumTiles2) | 0; // Bitwise OR operation
      const tileCol = tile % imageNumTiles2 | 0;
      ctx.drawImage(
        tilesetImage2,
        tileCol * tileSize,
        tileRow * tileSize,
        tileSize,
        tileSize,
        c * tileSize,
        r * tileSize,
        tileSize,
        tileSize
      );
    }
  }
};

export const drawMap = (ctx) => {
  draw(ctx, tester);
  draw(ctx, tester1);
};

const spliceyBoi = (array) => {
  const finalArr = [],
    size = 50;
  while (array.length > 0) finalArr.push(array.splice(0, size));
  return finalArr;
};

const convertTiles = (array) => {
  for (let i = 0; i < array.length; i++) {
    const object = array[i];
    if (object.tileset === 'SP-Overworld.png') {
      for (let i = 0; i < object.data.length; i++) {
        const a = Math.trunc(object.data[i]);
        const b =
          isNaN((object.data[i] + '').split('.')[1]) * 8
            ? 0
            : (object.data[i] + '').split('.')[1] * 8;
        const tile = a + b;
        object.data[i] = tile;
      }
    } else {
      for (let i = 0; i < object.data.length; i++) {
        const a = Math.trunc(object.data[i]);
        const b = (object.data[i] + '').split('.')[1] * 16;
        const tile = a + b;
        object.data[i] = tile;
      }
    }
    array[i] = spliceyBoi(object.data);
  }
  return array;
};

function firstToUpper(string) {
  const a = string[0].toUpperCase();
  const b = string.substring(1, string.length);
  return a + b;
}

export const drawUnlocked = (ctx, ps) => {
  const user = Object.keys(ps.user);

  user.map(item => {
    
    if(ps.user[item] === true){
    
      
      draw(ctx, eval(`road${firstToUpper(item)}Layer`));    
      draw2(ctx, eval(`${item}Layer`));
    }
  });
};

export const convertedLayers = convertTiles(layers);

const tester = convertedLayers[0];
const tester1 = convertedLayers[2];
const houseLayer = convertedLayers[3];
const lumberyardLayer = convertedLayers[4];
const windmillLayer = convertedLayers[5];
const mineLayer = convertedLayers[6];
const watermillLayer = convertedLayers[7];
const sawmillLayer = convertedLayers[8];
const farmLayer = convertedLayers[9];
const blacksmithLayer = convertedLayers[10];
const tavernLayer = convertedLayers[11];
const castleLayer = convertedLayers[12];
const roadHouseLayer = convertedLayers[13];
const roadLumberyardLayer = convertedLayers[14];
const roadWindmillLayer = convertedLayers[15];
const roadMineLayer = convertedLayers[16];
const roadWatermillLayer = convertedLayers[17];
const roadSawmillLayer = convertedLayers[18];
const roadFarmLayer = convertedLayers[19];
const roadBlacksmithLayer = convertedLayers[20];
const roadTavernLayer = convertedLayers[21];
const roadCastleLayer = convertedLayers[22];

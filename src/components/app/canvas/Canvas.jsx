/* eslint-disable max-len */
import React, { useRef, useEffect } from 'react';
import style from '../style.css';

const Canvas = (props) => {
  const canvasRef = useRef(null);

  const spliceyBoi = (array) => {
    const finalArr = [],
      size = 50;
    while(array.length > 0) finalArr.push(array.splice(0, size));
    return finalArr;
  };

  const { layers } = require('../../../../assets/MaptheSecond.json');
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
  const testGround = convertTiles(layers);
  const tester = testGround[0];
  const tester1 = testGround[2];
  const building = testGround[3];
  const building1 = testGround[4];
  const building2 = testGround[5];
  const building3 = testGround[6];
  const building4 = testGround[7];
  const building5 = testGround[8];
  const building6 = testGround[9];
  const building7 = testGround[10];
  const building8 = testGround[11];
  const building9 = testGround[12];
  const road = testGround[13];
  const road1 = testGround[14];
  const road2 = testGround[15];
  const road3 = testGround[16];
  const road4 = testGround[17];
  const road5 = testGround[18];
  const road6 = testGround[19];
  const road7 = testGround[20];
  const road8 = testGround[21];
  const road9 = testGround[22];

  const tilesetImage = new Image();
  const tilesetImage2 = new Image();
  tilesetImage.src = '../../../../assets/SP-Overworld.png';
  tilesetImage2.src = '../../../../assets/Compilation-Building32x32.png';
  const tileSize = 16; // The size of a tile (32×32)
  const rowTileCount = 38; // The number of tiles in a row of our background
  const colTileCount = 50; // The number of tiles in a column of our background
  const imageNumTiles = 8; // The number of tiles per row in the tileset image
  const imageNumTiles2 = 16; // The number of tiles per row in the tileset image

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

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    // let frameCount = 0;
    let animationFrameId;

    //Our draw came here
    const render = () => {
      // frameCount++;
      draw(context, tester);
      draw(context, tester1);
      draw(context, road);
      draw(context, road1);
      draw(context, road2);
      draw(context, road3);
      draw(context, road4);
      draw(context, road5);
      draw(context, road6);
      draw(context, road7);
      draw(context, road8);
      draw(context, road9);
      draw2(context, building);
      draw2(context, building1);
      draw2(context, building2);
      draw2(context, building3);
      draw2(context, building4);
      draw2(context, building5);
      draw2(context, building6);
      draw2(context, building7);
      draw2(context, building8);
      draw2(context, building9);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    // return () => {
    //   window.cancelAnimationFrame(animationFrameId);
    // };
  }, [draw]);
  return (
    <canvas
      className={style.canvas}
      height="608px"
      width="800px"
      ref={canvasRef}
      {...props}
    />
  );
};

export default Canvas;

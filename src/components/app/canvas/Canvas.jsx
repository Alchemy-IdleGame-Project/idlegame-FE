/* eslint-disable max-len */
import React, { useRef, useEffect } from 'react';
import style from '../style.css';

// const tilesetImage = new Image();
// tilesetImage.src = '../../../../public/tileset_marked.png'
// tilesetImage.onload = drawImage;

const Canvas = (props) => {
  const canvasRef = useRef(null);

  const spliceyBoi = (array) => {
    const finalArr = [],
      size = 50;
    while(array.length > 0) finalArr.push(array.splice(0, size));
    return finalArr;
  };

  function addZeroes(num) {
    const dec = num.split('.')[1];
    const len = dec && dec.length === 2 ? dec.length : 2;
    return Number(num).toFixed(len);
  }

  const { layers } = require('./MaptheSecond.json');
  const convertTiles = (array) => {
    for(let i = 0; i < array.length; i++) {
      const object = array[i];
      if(object.tileset === 'SP-Overworld.png'){
        for(let i = 0; i < object.data.length; i++){
          const a = (Math.trunc(object.data[i]));
          let b = ((isNaN((object.data[i] + '').split('.')[1]) * 8) ? 0 :
            (((object.data[i] + '').split('.')[1]) * 8));
            // ((((object.data[i] + '').split('.')).length === 2) ? 
            //   (((object.data[i] + '').split('.')[1]) * 8).toFixed(2) : 
            //   (((object.data[i] + '').split('.')[1]) * 8)));
            if(`${object.data[i]}`.endsWith('0')) b = Number(`${b}0`).toFixed(1);
            console.log(object.data[i]);
            const tile = a + b;
          object.data[i] = tile;
        }
      }else{
        for(let i = 0; i < object.data.length; i++){
          const a = (Math.trunc(object.data[i]));
          const b = ((object.data[i] + '').split('.')[1])*16;
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
  // console.log(testGround[0], 'look over here');
  // const b = ((6.0 + '').split('.')[1]) * 8;
  // console.log(b, 'this is the problem tile');
  // const a = (Math.trunc(6.1));
  // const b = (6.12= + '').split('.')[1];
  // console.log(a, 'the whole number\n', b, 'the decimal number')
  

  
  
  // console.log(JSON.stringify(changernumber(testGround)));
  // const newGroundArray = spliceyBoi(building);
  // console.log(JSON.stringify(newGroundArray));

  const tilesetImage = new Image();
  const tilesetImage2 = new Image();
  tilesetImage.src = '../../../public/SP-Overworld.png';
  tilesetImage2.src = '../../../public/Compilation-Building32x32.png';
  const tileSize = 16; // The size of a tile (32×32)
  const rowTileCount = 38; // The number of tiles in a row of our background
  const colTileCount = 50; // The number of tiles in a column of our background
  const imageNumTiles = 8; // The number of tiles per row in the tileset image
  const tileSize32 = 32; // The size of a tile (32×32)
  const rowTileCount32 = 19; // The number of tiles in a row of our background
  const colTileCount32 = 25; // The number of tiles in a column of our background
  const imageNumTiles32 = 8; // The number of tiles per row in the tileset image

  // const { data } = ground.layers[0];
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

  const draw32 = (ctx, array) => {
    for (let r = 0; r < rowTileCount32; r++) {
      for (let c = 0; c < colTileCount32; c++) {
        const tile = array[r][c];
        const tileRow = (tile / imageNumTiles32) | 0; // Bitwise OR operation
        const tileCol = tile % imageNumTiles32 | 0;
        ctx.drawImage(
          tilesetImage2,
          tileCol * tileSize32,
          tileRow * tileSize32,
          tileSize32,
          tileSize32,
          c * tileSize32,
          r * tileSize32,
          tileSize32,
          tileSize32
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
      // draw32(context, building);
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

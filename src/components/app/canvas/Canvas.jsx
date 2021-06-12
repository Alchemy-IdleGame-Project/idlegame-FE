/* eslint-disable max-len */
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from '../style.css';
import convertedLayers from './canvasUtils';



const Canvas = (props) => {
  const {
    house, 
    lumberyard, 
    windmill,
    mine,
    watermill,
    sawmill,
    farm,
    blacksmith,
    tavern,
    castle
  } = props.user;

 
  const canvasRef = useRef(null);

  // const { layers } = require('../../../../assets/MaptheSecond.json');
  // const convertedLayers = convertTiles(layers);

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
    
    for(let r = 0; r < rowTileCount; r++) {
      for(let c = 0; c < colTileCount; c++) {
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
   
    for(let r = 0; r < rowTileCount; r++) {
      for(let c = 0; c < colTileCount; c++) {
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
    // let animationFrameId;
    
    //Our draw came here
    const render = () => {
      // frameCount++;
      draw(context, tester);
      draw(context, tester1);
      
      if(house){
        draw(context, roadHouseLayer);
        draw2(context, houseLayer);
      }

      if(lumberyard){
        draw(context, roadLumberyardLayer);
        draw2(context, lumberyardLayer);
      }

      if(windmill){
        draw(context, roadWindmillLayer);
        draw2(context, windmillLayer);
      }

      if(mine){
        draw(context, roadMineLayer);
        draw2(context, mineLayer);
      }
      if(watermill){
        draw(context, roadWatermillLayer);
        draw2(context, watermillLayer);
      }
      if(sawmill){
        draw(context, roadSawmillLayer);
        draw2(context, sawmillLayer);
      }
      if(farm){
        draw(context, roadFarmLayer);
        draw2(context, farmLayer);
      }
      if(blacksmith){
        draw(context, roadBlacksmithLayer);
        draw2(context, blacksmithLayer);
      }
      if(tavern){
        draw(context, roadTavernLayer);
        draw2(context, tavernLayer);
      }
      if(castle){
        draw(context, roadCastleLayer);
        draw2(context, castleLayer);
      }
      
    };
    
    render();

  }, [props.active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    // let frameCount = 0;
    // let animationFrameId;
    
    //Our draw came here
    const render = () => {
      // frameCount++;
      // draw(context, tester);
      // draw(context, tester1);
      
      if(house){
        draw(context, roadHouseLayer);
        draw2(context, houseLayer);
      }

      if(lumberyard){
        draw(context, roadLumberyardLayer);
        draw2(context, lumberyardLayer);
      }

      if(windmill){
        draw(context, roadWindmillLayer);
        draw2(context, windmillLayer);
      }

      if(mine){
        draw(context, roadMineLayer);
        draw2(context, mineLayer);
      }
      if(watermill){
        draw(context, roadWatermillLayer);
        draw2(context, watermillLayer);
      }
      if(sawmill){
        draw(context, roadSawmillLayer);
        draw2(context, sawmillLayer);
      }
      if(farm){
        draw(context, roadFarmLayer);
        draw2(context, farmLayer);
      }
      if(blacksmith){
        draw(context, roadBlacksmithLayer);
        draw2(context, blacksmithLayer);
      }
      if(tavern){
        draw(context, roadTavernLayer);
        draw2(context, tavernLayer);
      }
      if(castle){
        draw(context, roadCastleLayer);
        draw2(context, castleLayer);
        context.drawImage(12, 12);
      }

      // eslint-disable-next-line no-unused-vars
    };
    // const animationFrameId = window.requestAnimationFrame(render);
    
    render();
    return () => {
      // window.cancelAnimationFrame(animationFrameId);
    };
  }, [props.user]);
  
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

Canvas.propTypes = {
  user: PropTypes.shape({
    house: PropTypes.bool.isRequired,
    lumberyard: PropTypes.bool.isRequired,
    windmill: PropTypes.bool.isRequired,
    mine: PropTypes.bool.isRequired,
    watermill: PropTypes.bool.isRequired,
    sawmill: PropTypes.bool.isRequired,
    farm: PropTypes.bool.isRequired,
    blacksmith: PropTypes.bool.isRequired,
    tavern: PropTypes.bool.isRequired,
    castle: PropTypes.bool.isRequired,
  }).isRequired,
  active: PropTypes.bool.isRequired
};

export default Canvas;

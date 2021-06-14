/* eslint-disable max-len */
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from '../style.css';
import { drawUnlocked, drawMap, drawClouds } from './canvasUtils';


const Canvas = (props) => {
  const canvasRef = useRef(null);
  // const { layers } = require('../../../../assets/MaptheSecond.json');
  // const convertedLayers = convertTiles(layers);
  //layers needed to be drawn regardless of user status
 
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    // let frameCount = 0;
    // let animationFrameId;
    
    //draw starts here
    const render = () => {

      //perhaps we can make implimentation to optionally increase frames per second
      // frameCount++;
      // draw(context, tester);
      // draw(context, tester1);
      drawMap(context);
      // drawUnlocked(context, props);//function in canvas utils, renders each layer that is unlocked by the user
      drawClouds(context);
    };
    render();
 
  }, [props.active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    // let frameCount = 0;
    // let animationFrameId;
    
    //draw starts here
    const render = () => {

      //perhaps we can make implimentation to optionally increase frames per second
      // frameCount++;
      // draw(context, tester);
      // draw(context, tester1);
      drawMap(context);
      drawUnlocked(context, props);  //function in canvas
      // drawUnlocked(context, props);//function in canvas utils, renders each layer that is unlocked by the user
      drawClouds(context);
    };
    render();
 
  }, [props.active]); 
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    // let frameCount = 0;
    // let animationFrameId;
    
    //draw starts here
    const render = () => {

      //perhaps we can make implimentation to optionally increase frames per second
      // frameCount++;
      // draw(context, tester);
      // draw(context, tester1);
      drawMap(context);
      drawUnlocked(context, props);  //function in canvas utils,
      // drawUnlocked(context, props);//function in canvas utils, renders each layer that is unlocked by the user
      drawClouds(context);
    };
    render();
 
  }, [props.prestige]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    // let frameCount = 0;
    // let animationFrameId;
    //Our draw came here
    const render = () => {
      // frameCount++;
      drawUnlocked(context, props);  //function in canvas utils, renders each layer that is unlocked by the user
      const cloudCoords = drawClouds(context, props.gameTime);
      // eslint-disable-next-line no-unused-vars
      return cloudCoords;
    };
    // const animationFrameId = window.requestAnimationFrame(render);
    render();
  //  console.log(render(), 'coordinates of each cloud thats been rendered');
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
  user: PropTypes.shape({}).isRequired,
  gameTime: PropTypes.number.isRequired
};

export default Canvas;

/* eslint-disable max-len */
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from '../style.css';
import {convertedLayers, drawUnlocked, drawMap} from './canvasUtils';



const Canvas = (props) => {
  const canvasRef = useRef(null);
  // const { layers } = require('../../../../assets/MaptheSecond.json');
  // const convertedLayers = convertTiles(layers);
  //layers needed to be drawn regardless of user status
  const tester = convertedLayers[0];
  const tester1 = convertedLayers[2];

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    // let frameCount = 0;
    // let animationFrameId;
    

    //draw starts here
    const render = () => {
      // frameCount++;
      // draw(context, tester);
      // draw(context, tester1);
      drawMap(context);
      drawUnlocked(context, props);//function in canvas utils, renders each layer that is unlocked by the user
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
      drawUnlocked(context, props);  //function in canvas utils, renders each layer that is unlocked by the user
      // eslint-disable-next-line no-unused-vars
    };
    // const animationFrameId = window.requestAnimationFrame(render);
    render();
   
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

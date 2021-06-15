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
    
    

    const ctx = canvas.getContext("2d");
    const region = {x: 369, y: 263, w: 100, h: 100};
ctx.fillStyle = "#79f";
ctx.fillRect(region.x, region.y, region.w, region.h);
// create a tool-tip instance:
var t1 = new ToolTip(canvas, region, "This is a tool-tip", 150, 3000);
// The Tool-Tip instance:
function ToolTip(canvas, region, text, width, timeout) {
  var me = this,                                // self-reference for event handlers
      div = document.createElement("div"),      // the tool-tip div
      parent = canvas.parentNode,               // parent node for canvas
      visible = false;                          // current status
  // set some initial styles, can be replaced by class-name etc.
  div.style.cssText = "position:fixed;padding:7px;background:gold;pointer-events:none;width:" + width + "px";
  div.innerHTML = text;
  // show the tool-tip
  this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
      visible = true;                           // lock so it's only shown once
      setDivPos(pos);                           // set position
      parent.appendChild(div);                  // add to parent of canvas
      setTimeout(hide, timeout);                // timeout for hide
    }
  }
  // hide the tool-tip
  function hide() {
    visible = false;                            // hide it after timeout
    parent.removeChild(div);                    // remove from DOM
  }
  // check mouse position, add limits as wanted... just for example:
  function check(e) {
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    if (!visible &&
        pos.x >= region.x && pos.x < region.x + region.w &&
        pos.y >= region.y && pos.y < region.y + region.h) {
      me.show(posAbs);                          // show tool-tip at this pos
    }
    else setDivPos(posAbs);                     // otherwise, update position
  }
  // get mouse position relative to canvas
  function getPos(e) {
    var r = canvas.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
  }
  // update and adjust div position if needed (anchor to a different corner etc.)
  function setDivPos(pos) {
    if (visible){
      if (pos.x < 0) pos.x = 0;
      if (pos.y < 0) pos.y = 0;
      // other bound checks here
      div.style.left = pos.x + "px";
      div.style.top = pos.y + "px";
    }
  }
  // we need to use shared event handlers:
  canvas.addEventListener("mousemove", check);
  canvas.addEventListener("click", check);
}


    //draw starts here
    const render = () => {

      //perhaps we can make implimentation to optionally increase frames per second
      // frameCount++;
      // draw(context, tester);
      // draw(context, tester1);
      drawMap(context);
      drawUnlocked(context, props);//function in canvas utils, renders each layer that is unlocked by the user
      // drawClouds(context);
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
      // drawClouds(context);
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
      // const cloudCoords = drawClouds(context, props.gameTime);
      // eslint-disable-next-line no-unused-vars
      // return cloudCoords;
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
  user: PropTypes.shape({}).isRequired,
  gameTime: PropTypes.number.isRequired,
  prestige: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
};

export default Canvas;

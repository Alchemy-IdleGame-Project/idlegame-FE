/* eslint-disable no-inner-declarations */
/* eslint-disable max-len */

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from '../style.css';
import { drawUnlocked, drawMap } from './canvasUtils';
<<<<<<< HEAD
=======
import blacksmithInfo from '../../../../assets/info-cards/blacksmith-info.png';
import castleInfo from '../../../../assets/info-cards/castle-info.png';
import farmInfo from '../../../../assets/info-cards/farm-info.png';
import lumberyardInfo from '../../../../assets/info-cards/lumberyard-info.png';
import mineInfo from '../../../../assets/info-cards/mine-info.png';
import sawmillInfo from '../../../../assets/info-cards/sawmill-info.png';
import tavernInfo from '../../../../assets/info-cards/tavern-info.png';
import watermillInfo from '../../../../assets/info-cards/watermill-info.png';
import windmillInfo from '../../../../assets/info-cards/windmill-info.png';
import houseInfo from '../../../../assets/info-cards/blankityblanketyblenk.png';
>>>>>>> 9517ef50806025d5b4c3b4615d97eee91b1b97ec

const Canvas = (props) => {
  const canvasRef = useRef(null);
  // const { layers } = require('../../../../assets/MaptheSecond.json');
  // const convertedLayers = convertTiles(layers);
  //layers needed to be drawn regardless of user status

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    

    //draw starts here
    const render = () => {
  
      drawMap(context);
      drawUnlocked(context, props); //function in canvas utils, renders each layer that is unlocked by the user
    };
    render();
  }, [props.active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    //draw starts here
    const render = () => {
    
      drawMap(context);
      drawUnlocked(context, props); //function in canvas utils,
      // drawUnlocked(context, props);//function in canvas utils, renders each layer that is unlocked by the user
    };
    render();
  }, [props.prestige]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    // let frameCount = 0;
    // let animationFrameId;

    const buildingInfo = '';
    // var canvas = document.querySelector("canvas"),
    const ctx = canvas.getContext('2d');
    const region = [
<<<<<<< HEAD
      { name: 'house', x: 369, y: 273, w: 32, h: 32 },
      { name: 'lumberyard', x: 499, y: 321, w: 32, h: 32 },
      { name: 'mine', x: 208, y: 272, w: 32, h: 32 },
      { name: 'watermill', x: 400, y: 416, w: 32, h: 32 },
      { name: 'windmill', x: 400, y: 175, w: 32, h: 32 },
      { name: 'sawmill', x: 464, y: 320, w: 32, h: 32 },
      { name: 'farm', x: 448, y: 207, w: 32, h: 32 },
      { name: 'blacksmith', x: 240, y: 305, w: 32, h: 32 },
      { name: 'tavern', x: 304, y: 384, w: 32, h: 32 },
      { name: 'castle', x: 304, y: 208, w: 32, h: 32 },
      { name: 'tree', x: 332, y: 333, w: 32, h: 32 },
=======
      { name: 'house', x: 369, y: 273, w: 32, h: 32, img: houseInfo },
      { name: 'lumberyard', x: 499, y: 321, w: 32, h: 32, img: lumberyardInfo },
      { name: 'mine', x: 208, y: 272, w: 32, h: 32, img: mineInfo },
      { name: 'watermill', x: 400, y: 416, w: 32, h: 32, img: watermillInfo },
      { name: 'windmill', x: 400, y: 175, w: 32, h: 32, img: windmillInfo },
      { name: 'sawmill', x: 464, y: 320, w: 32, h: 32, img: sawmillInfo },
      { name: 'farm', x: 448, y: 207, w: 32, h: 32, img: farmInfo },
      { name: 'blacksmith', x: 240, y: 305, w: 32, h: 32, img: blacksmithInfo },
      { name: 'tavern', x: 304, y: 384, w: 32, h: 32, img: tavernInfo },
      { name: 'castle', x: 304, y: 208, w: 32, h: 32, img: castleInfo },
      { name: 'tree', x: 332, y: 333, w: 32, h: 32, img: houseInfo },
>>>>>>> 9517ef50806025d5b4c3b4615d97eee91b1b97ec
    ];
    const building = {};

    function unlockToolTip(region, buildingInfo, building) {
      const user = Object.keys(props.user);
      user.map((item) => {
        if (props.user[item] === true) {
          //  `road${firstToUpper(item)}Layer`);
<<<<<<< HEAD
          buildingInfo = `../../../../assets/info-cards/${item}-info.png`;
          for (let i = 0; i < region.length; i++) {
            if (region[i].name === item) {
              if (region[i].name === 'house') break;
=======
          for (let i = 0; i < region.length; i++) {
            if (region[i].name === item) {
              if (region[i].name === 'house') break;
              buildingInfo = region[i].img;
>>>>>>> 9517ef50806025d5b4c3b4615d97eee91b1b97ec
              building = region[i];
              ctx.fillStyle = 'rgba(255, 255, 255, 0)';
              ctx.fillRect(building.x, building.y, building.w, building.h);

              // create a tool-tip instance:
              const t1 = new ToolTip(canvas, building, buildingInfo, 150, 1500);
              // The Tool-Tip instance:
              function ToolTip(canvas, building, img, width, timeout) {
                const me = this, // self-reference for event handlers
                  div = document.createElement('div'), // the tool-tip div
                  parent = canvas.parentNode; // parent node for canvas
                let visible = false; // current status

                // set some initial styles, can be replaced by class-name etc.
                div.style.cssText =
                  'position:fixed;padding:7px;pointer-events:none;width:' +
                  width +
                  'px';
                div.innerHTML = `<img src=${img} />`;

                // show the tool-tip
                this.show = function(pos) {
                  if (!visible) {
                    // ctx.addEventListener('mouseover', () => {
                    // }
                    // );
                    // ignore if already shown (or reset time)

                    visible = true; // lock so it's only shown once
                    setDivPos(pos); // set position
                    parent.appendChild(div); // add to parent of canvas
                    setTimeout(hide, timeout); // timeout for hide
                  }
                };

                // hide the tool-tip
                function hide() {
                  visible = false; // hide it after timeout
                  parent.removeChild(div); // remove from DOM
                }

                // check mouse position, add limits as wanted... just for example:
                function check(e) {
                  const pos = getPos(e),
                    posAbs = { x: e.clientX, y: e.clientY }; // div is fixed, so use clientX/Y
                  if (
                    !visible &&
                    pos.x >= building.x &&
                    pos.x < building.x + building.w &&
                    pos.y >= building.y &&
                    pos.y < building.y + building.h
                  ) {
                    me.show(posAbs); // show tool-tip at this pos
                  } else setDivPos(posAbs); // otherwise, update position
                }

                // get mouse position relative to canvas
                function getPos(e) {
                  const r = canvas.getBoundingClientRect();
                  return { x: e.clientX - r.left, y: e.clientY - r.top };
                }

                // update and adjust div position if needed (anchor to a different corner etc.)
                function setDivPos(pos) {
                  if (visible) {
                    if (pos.x < 0) pos.x = 0;
                    if (pos.y < 0) pos.y = 0;
                    // other bound checks here
                    div.style.left = pos.x + 'px';
                    div.style.top = pos.y + 'px';
                  }
                }

                // we need to use shared event handlers:
                canvas.addEventListener('mousemove', check);
                canvas.addEventListener('click', check);
              }
            }
          }
        }
      });
    }

    //Our draw came here
    const render = () => {
      // frameCount++;
      drawUnlocked(context, props); //function in canvas utils, renders each layer that is unlocked by the user
      unlockToolTip(region, buildingInfo, building);

      // eslint-disable-next-line no-unused-vars
      // return cloudCoords;
    };
    // const animationFrameId = window.requestAnimationFrame(render);
    render();
    //   render(), 'coordinates of each cloud thats been rendered');
  }, [props.user]);

  return (
    <div className={style.canDiv}>
      <canvas
        className={style.canvas}
        height="608px"
        width="800px"
        ref={canvasRef}
        {...props}
      />
    </div>
  );
};

Canvas.propTypes = {
  user: PropTypes.shape({}).isRequired,
  prestige: PropTypes.number.isRequired,
  active: PropTypes.number.isRequired,
};

export default Canvas;

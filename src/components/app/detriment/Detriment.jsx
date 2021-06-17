/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import style from '../style.css';
 
const Detriment = ({ detriment }) => {
  // console.log(detriment);
  return (
    <div className={style.detDiv}>
      <h2>Current detrimental effects are:</h2>
      {Object.keys(detriment).map(item => {
        if (detriment[item].active){
          switch (item) {
            case 'termites' : {
              // console.log(item);
              return <p className={style.activeDetriment}> {item} -1 gold/s </p>;          
            }
            case 'failedCrops' : {
              // console.log(item);
              return <p className={style.activeDetriment}> {item}: -10 gold/s </p>;           
            }
            case 'caveIn' : {
              // console.log(item);
              return <p className={style.activeDetriment}> {item}: -20 gold/s </p>;
            }
            case 'flood' : {
              // console.log(item);
              return <p className={style.activeDetriment}> {item}: -10k gold </p>;
            }
            case 'osha' : {
              // console.log(item);
              return <p className={style.activeDetriment}> {item}: -50k gold -20% gold/s </p>;
            }
            case 'peta' : {
              // console.log(item);
              return <p className={style.activeDetriment}> {item}: -10% gold/s </p>;
            }
            case 'bandits' : {
              // console.log(item);
              return <p className={style.activeDetriment}> {item}: -75% total gold </p>;
            }
            case 'arson' : {
              // console.log(item);
              return <p className={style.activeDetriment}> {item}: Burnt down tavern </p>;
            }
          }
        } else if (!detriment[item].active) {
          switch (item) {
            case 'termites' : {
              // console.log(item);
              return <p className={style.inactiveDetriment}> {item} -1 gold/s </p>;          
            }
            case 'failedCrops' : {
              // console.log(item);
              return <p className={style.inactiveDetriment}> {item}: -10 gold/s </p>;           
            }
            case 'caveIn' : {
              // console.log(item);
              return <p className={style.inactiveDetriment}> {item}: -20 gold/s </p>;
            }
            case 'flood' : {
              // console.log(item);
              return <p className={style.inactiveDetriment}> {item}: -10k gold </p>;
            }
            case 'osha' : {
              // console.log(item);
              return <p className={style.inactiveDetriment}> {item}: -50k gold -20% gold/s </p>;
            }
            case 'peta' : {
              // console.log(item);
              return <p className={style.inactiveDetriment}> {item}: -10% gold/s </p>;
            }
            case 'bandits' : {
              // console.log(item);
              return <p className={style.inactiveDetriment}> {item}: -75% total gold </p>;
            }
            case 'arson' : {
              // console.log(item);
              return <p className={style.inactiveDetriment}> {item}: Burnt down tavern </p>;
            }
          }
        }
      })}
    </div>
  );
};


Detriment.propTypes = {
  detriment: PropTypes.shape({
    termites: PropTypes.shape({
      active: PropTypes.bool.isRequired,
      unlocked: PropTypes.bool.isRequired
    }),
    failedCrops: PropTypes.shape({
      active: PropTypes.bool.isRequired,
      unlocked: PropTypes.bool.isRequired
    }),
    caveIn: PropTypes.shape({
      active: PropTypes.bool.isRequired,
      unlocked: PropTypes.bool.isRequired
    }),
    flood: PropTypes.shape({
      active: PropTypes.bool.isRequired,
      unlocked: PropTypes.bool.isRequired
    }),
    osha: PropTypes.shape({
      active: PropTypes.bool.isRequired,
      unlocked: PropTypes.bool.isRequired
    }),
    peta: PropTypes.shape({
      active: PropTypes.bool.isRequired,
      unlocked: PropTypes.bool.isRequired
    }),
    bandits: PropTypes.shape({
      active: PropTypes.bool.isRequired,
      unlocked: PropTypes.bool.isRequired
    }),
    arson: PropTypes.shape({
      active: PropTypes.bool.isRequired,
      unlocked: PropTypes.bool.isRequired
    }),
  })
};
export default Detriment;

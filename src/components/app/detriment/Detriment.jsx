/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import style from '../style.css';

const Detriment = ({ detriment }) => {
  function capitalizer(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div className={style.detDiv}>
      <h2>Detrimental Effects:</h2>
      {Object.keys(detriment).map((item) => {
        if (detriment[item].active) {
          switch (item) {
            case 'termites': {
              return (
                <p key={item} style={{ minWidth : '305px' }}className={style.activeDetriment}> {capitalizer(item)}: <span style={{ color: 'gold' }}>-1</span> gold/s </p>
              );
            }
            case 'failedCrops': {
              return (
                <p key={item}style={{ minWidth : '305px' }}className={style.activeDetriment}> Failed Crops: <span style={{ color: 'gold' }}>-9</span> gold/s </p>
              );
            }
            case 'caveIn': {
              return (
                <p key={item}style={{ minWidth : '305px' }}className={style.activeDetriment}> Cave-in: <span style={{ color: 'gold' }}>-18</span> gold/s </p>
              );
            }
            case 'flood': {
              return (
                <p key={item}style={{ minWidth : '305px' }}className={style.activeDetriment}> {capitalizer(item)}: <span style={{ color: 'gold' }}>-5k</span> gold </p>
              );
            }
            case 'osha': {
              return (
                <p key={item}style={{ minWidth : '305px' }}className={style.activeDetriment}>
                  {' '}
                  {item.toUpperCase()}: <span style={{ color: 'gold' }}>-12k</span> gold <span style={{ color: 'gold' }}>-25%</span> gold/s{' '}
                </p>
              );
            }
            case 'peta': {
              return (
                <p key={item}style={{ minWidth : '305px' }}className={style.activeDetriment}> {item.toUpperCase()}: <span style={{ color: 'gold' }}>-20%</span> gold/s </p>
              );
            }
            case 'bandits': {
              return (
                <p key={item}style={{ minWidth : '305px' }}className={style.activeDetriment}>
                  {' '}
                  {capitalizer(item)}: <span style={{ color: 'gold' }}>-25%</span> total gold{' '}
                </p>
              );
            }
            case 'arson': {
              return (
                <p key={item}style={{ minWidth : '305px' }}className={style.activeDetriment}>
                  {' '}
                  {capitalizer(item)}: <span style={{ color: 'red' }}>Burnt down tavern{' '}</span> 
                </p>
              );
            }
          }
        } else if (!detriment[item].active) {
          switch (item) {
            case 'termites': {
              return (
                <p key={item}style={{ minWidth : '305px' }}className={style.inactiveDetriment}> {capitalizer(item)}: <span style={{ color: 'gold' }}>-1</span> gold/s </p>
              );
            }
            case 'failedCrops': {
              return (
                <p key={item}style={{ minWidth : '305px' }}className={style.inactiveDetriment}> Failed Crops: <span style={{ color: 'gold' }}>-9</span> gold/s </p>
              );
            }
            case 'caveIn': {
              return (
                <p key={item}style={{ minWidth : '305px' }}className={style.inactiveDetriment}> Cave-in: <span style={{ color: 'gold' }}>-18</span> gold/s </p>
              );
            }
            case 'flood': {
              return (
                <p key={item}style={{ minWidth : '305px' }}className={style.inactiveDetriment}> {capitalizer(item)}: <span style={{ color: 'gold' }}>-5k</span> gold </p>
              );
            }
            case 'osha': {
              return (
                <p key={item}style={{ minWidth : '305px' }}className={style.inactiveDetriment}>
                  {' '}
                  {item.toUpperCase()}: <span style={{ color: 'gold' }}>-20k</span> gold <span style={{ color: 'gold' }}>-25% </span>gold/s{' '}
                </p>
              );
            }
            case 'peta': {
              return (
                <p key={item}style={{ minWidth : '305px' }} className={style.inactiveDetriment}>
                  {item.toUpperCase()}: <span style={{ color: 'gold' }}>-20%</span> gold/s 
                </p>
              );
            }
            case 'bandits': {
              return (
                <p key={item}style={{ minWidth : '305px' }}className={style.inactiveDetriment}>
                  {' '}
                  {capitalizer(item)}: <span style={{ color: 'gold' }}>-25%</span> total gold{' '}
                </p>
              );
            }
            case 'arson': {
              return (
                <p key={item}style={{ minWidth : '305px' }}className={style.inactiveDetriment}>
                  {' '}
                  {capitalizer(item)}: Burnt down tavern{' '}
                </p>
              );
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
      unlocked: PropTypes.bool.isRequired,
    }),
    failedCrops: PropTypes.shape({
      active: PropTypes.bool.isRequired,
      unlocked: PropTypes.bool.isRequired,
    }),
    caveIn: PropTypes.shape({
      active: PropTypes.bool.isRequired,
      unlocked: PropTypes.bool.isRequired,
    }),
    flood: PropTypes.shape({
      active: PropTypes.bool.isRequired,
      unlocked: PropTypes.bool.isRequired,
    }),
    osha: PropTypes.shape({
      active: PropTypes.bool.isRequired,
      unlocked: PropTypes.bool.isRequired,
    }),
    peta: PropTypes.shape({
      active: PropTypes.bool.isRequired,
      unlocked: PropTypes.bool.isRequired,
    }),
    bandits: PropTypes.shape({
      active: PropTypes.bool.isRequired,
      unlocked: PropTypes.bool.isRequired,
    }),
    arson: PropTypes.shape({
      active: PropTypes.bool.isRequired,
      unlocked: PropTypes.bool.isRequired,
    }),
  }),
};
export default Detriment;

/* eslint-disable max-len */
import React from 'react';
import style from '../style.css';
import { profiles } from '../../../../assets/Profiles.json';


const ProfileCard = () => {
  const array = profiles.map(item => {
    return <li key={item.name}>     
      <div className={style.profileTop}>
        <h2>{item.name}</h2>
        <img src={item.imgSrc}/>
      </div>
      <div className={style.profileBio}>
        <p>{item.bio}</p>
      </div>
      <div className={style.socials}>
        <ul>   
          <li>
            
            <img src={item.contact[0].icon}/>
            <span>{item.contact[0].contactType}:</span>
            {/* //how to open an email to this address */}
            <span> {item.contact[0].address}</span>
          </li>    
          <li>
            <img src={item.contact[1].icon}/>
            <span>{item.contact[1].contactType}:</span>
            <span>   
              <a href={item.contact[1].link} >
              Check it out</a> 
            </span>        
          </li>
          <li>
            {/*  */}
          </li>
          <li>
          <img src={item.contact[2].icon}/>
            <span>{item.contact[2].contactType}:</span>
            <span>
              <a href={item.contact[2].link} alt={item.contact[2].linkDisplay}> 
                {item.contact[2].linkDisplay}</a>
            </span>
            <img src={item.contact[3].icon}/>
            <span>{item.contact[3].contactType}:</span>
            <span>
              <a href={item.contact[3].link} alt={item.contact[2].linkDisplay}> 
                {item.contact[3].linkDisplay}</a>
            </span>
          </li>
        </ul>
      </div>
    </li>;
  });
  return (
    <ul className={style.cards}>
      { array[0] }
      { array[1] }
      { array[2] }
      { array[3] }
    </ul>
  );
};

export default ProfileCard;

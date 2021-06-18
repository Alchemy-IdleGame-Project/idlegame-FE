/* eslint-disable max-len */
import React from 'react';
import style from '../style.css';
import profiles from '../../../../assets/Profiles.js';


const ProfileCard = () => {

  const profileImg = [
    '../../../../assets/profileImg/minhProfile.jpg', 
    '../../../../assets/profileImg/edmondProfile.png', 
    '../../../../assets/profileImg/vanceProfile.jpg', 
    '../../../../assets/profileImg/domProfile.jpg'];

  const array = profiles.map((item, index) => {
    return (
      <li className={style.outerLi} key={item.name}>
        <div className={style.profileTop}>
          <h2>{item.name}</h2>

          <img className={style.profImg} src={profileImg[index]} />

          <div className={style.socials}>
            <div className={style.email}>
              <img
                width="35px"
                height="35px"
                src="../../../../assets/profileIcons/emailIcon.png"
              />
              {/* <span>{item.contact[0].contactType}:</span> */}
              <span> {item.contact[0].address}</span>
            </div>

            {/* //how to open an email to this address */}
            <div className={style.resume}>
              <img
                width="35px"
                height="35px"
                src="../../../../assets/profileIcons/resumeIcon.png"
              />
              <span>{item.contact[1].contactType}:</span>
              <span>
                <a href={item.contact[1].link}>Check it out</a>
              </span>
            </div>

            <div className={style.linkedIn}>
              <img
                width="35px"
                height="30px"
                src="../../../../assets/profileIcons/linkedInIcon.png"
              />
              <span>{item.contact[2].contactType}:</span>
              <span>
                <a
                  href={item.contact[2].link}
                  alt={item.contact[2].linkDisplay}
                >
                  {item.contact[2].linkDisplay}
                </a>
              </span>
            </div>

            <div className={style.github}>
              <img
                width="35px"
                height="35px"
                margin="23px"
                src="../../../../assets/profileIcons/githubIcon.png"
              />
              <span>{item.contact[3].contactType}:</span>
              <span>
                <a
                  href={item.contact[3].link}
                  alt={item.contact[2].linkDisplay}
                >
                  {item.contact[3].linkDisplay}
                </a>
              </span>
            </div>
          </div>
        </div>

        <div className={style.profileBio}>
          <p>{item.bio}</p>
        </div>
      </li>
    );
  });
  return (
    <ul className={style.cards}>
      {array[0]}
      {array[1]}
      {array[2]}
      {array[3]}
    </ul>
  );
};

export default ProfileCard;

/* eslint-disable max-len */
import React from 'react';
import style from '../style.css';
import profiles from '../../../../assets/Profiles.js';
import minhImage from '../../../../assets/profileImg/minhProfile.jpg';
import edmondImage from '../../../../assets/profileImg/edmondProfile.png';
import vanceImage from '../../../../assets/profileImg/vanceProfile.jpg';
import domImage from '../../../../assets/profileImg/domProfile.jpg';
import emailImage from '../../../../assets/profileIcons/emailIcon.png';
import githubImage from '../../../../assets/profileIcons/githubIcon.png';
import linkedInImage from '../../../../assets/profileIcons/linkedInIcon.png';
import resumeImage from '../../../../assets/profileIcons/resumeIcon.png';

const ProfileCard = () => {

  const profileImg = [
    minhImage,
    edmondImage,
    vanceImage, 
    domImage];


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
                src={emailImage}
              />
              <span> {item.contact[0].address}</span>
            </div>
            <div className={style.resume}>
              <img
                width="35px"
                height="35px"
                src={resumeImage}
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
                src={linkedInImage}
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
                src={githubImage}
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

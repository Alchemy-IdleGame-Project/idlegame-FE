/* eslint-disable max-len */
import React from 'react';
import style from '../style.css';
import profiles from '../../../../assets/Profiles.js';
import minhImage from '../../../../assets/profileImg/minhProfile.jpg';
import edmondImage from '../../../../assets/profileImg/edmondProfile.png';
import vanceImage from '../../../../assets/profileImg/vanceProfile.jpg';
import domImage from '../../../../assets/profileImg/domProfile.jpg';
<<<<<<< HEAD
import emailIcon from '../../../../assets/profileIcons/emailIcon.png';
import resumeIcon from '../../../../assets/profileIcons/resumeIcon.png';
import linkedInIcon from '../../../../assets/profileIcons/linkedInIcon.png';
import githubIcon from '../../../../assets/profileIcons/githubIcon.png';
=======
>>>>>>> 9517ef50806025d5b4c3b4615d97eee91b1b97ec

const ProfileCard = () => {

  const profileImg = [
<<<<<<< HEAD
   minhImage,
  edmondImage,
vanceImage, domImage];
=======
    minhImage,
    edmondImage,
    vanceImage, 
    domImage];
>>>>>>> 9517ef50806025d5b4c3b4615d97eee91b1b97ec

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
                src={emailIcon}
              />
              {/* <span>{item.contact[0].contactType}:</span> */}
              <span> {item.contact[0].address}</span>
            </div>

            {/* //how to open an email to this address */}
            <div className={style.resume}>
              <img
                width="35px"
                height="35px"
                src={resumeIcon}
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
                src={linkedInIcon}
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
                src={githubIcon}
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

import React from 'react';
import background from '../../assets/titlebackground.png';
import ProfileCard from '../components/app/about/ProfileCard';
import style from '../components/app/style.css';

const TitlePage = () => {
  const titleStyle = {
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    backgroundPosition: 'center',
    // overflow: 'hidden',
    height: '90vh',
    // width: '100vw',
    // backgroundSize: '100%'
  };
  return (
    <div style={titleStyle}>  
        <ProfileCard />
    </div>
  );
};

export default TitlePage;

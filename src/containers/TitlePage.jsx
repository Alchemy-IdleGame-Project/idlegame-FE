import React from 'react';
import background from '../../assets/titlebackground.png';

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
    </div>
  );
};

export default TitlePage;

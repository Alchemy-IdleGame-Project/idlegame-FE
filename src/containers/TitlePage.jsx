import React from 'react';
import background from '../../assets/titlebackground.png';

const TitlePage = () => {
  const titleStyle = {
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    overflow: 'hidden',
    height: '3000px',
    width: '3000px',
    backgroundBlendMode: 'lighten',


  };
  return (
    <div style={titleStyle}>
    </div>
  );
};

export default TitlePage;

import React from 'react';
import background from '../../assets/titlebackground.png';

const TitlePage = () => {
  const titleStyle = {
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '90vh',
  };
  return (
    <div style={titleStyle}>  
        
    </div>
  );
};

export default TitlePage;

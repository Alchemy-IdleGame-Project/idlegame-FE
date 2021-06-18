<<<<<<< HEAD
import React from 'react';
=======
import React, { useState } from 'react';
>>>>>>> 9517ef50806025d5b4c3b4615d97eee91b1b97ec
import PropTypes from 'prop-types';
import style from '../app/style.css';


const Logout = (props) => {
  const [loggedOut, setLoggedOut] = useState(false);
  
<<<<<<< HEAD
  const handleLogout = () => {
    localStorage.removeItem();
=======
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('AUTH');
>>>>>>> 9517ef50806025d5b4c3b4615d97eee91b1b97ec
    setLoggedOut(true);
  };
  if (loggedOut){
    props.history.push('/');
  }

  return (
<<<<<<< HEAD
    <div>
      <button onClick={handleLogout} className={style.smallButton}>
        Log Out
      </button>
    </div>
=======
    <button onClick={handleLogout} className={style.smallButton}>
      Log Out
    </button>
>>>>>>> 9517ef50806025d5b4c3b4615d97eee91b1b97ec
  );
};

Logout.propTypes = {
  history: PropTypes.object.isRequired
};

export default Logout;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from '../app/style.css';


const Logout = (props) => {
  const [loggedOut, setLoggedOut] = useState(false);
  
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('AUTH');
    setLoggedOut(true);
  };
  if (loggedOut){
    props.history.push('/');
  }

  return (
    <button onClick={handleLogout} className={style.smallButton}>
      Log Out
    </button>
  );
};

Logout.propTypes = {
  history: PropTypes.object.isRequired
};

export default Logout;

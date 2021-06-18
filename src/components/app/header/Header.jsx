import React, { useState }from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from '../style.css';
import Logout from '../../login/Logout';

export default function Header() {
 
  const handleLogout = () => {
    console.log('you got here');
    localStorage.removeItem('AUTH');
  };

  return (
    <div className={style.header}>
      <div className={style.headerButton}>
        <Link to={'/'}>Home</Link>
      </div>
      <div className={style.headerButton}>
        <Link to={'/register'}>Sign Up</Link>
      </div>
      <div className={style.headerButton}>
        <Link to={'/login'}>Log In</Link>
      </div>
      <div className={style.headerButton}>
        <Link to={'/'} onClick={handleLogout}>Log Out</Link>
      </div>
      <div className={style.headerButton}>
        <Link to={'/about'}>About the Developers</Link>
      </div>
    </div>
  );
}
Logout.propTypes = {
  history: PropTypes.object.isRequired
};
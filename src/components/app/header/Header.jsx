<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';
import style from '../style.css';

export default function Header() {
=======
import React, { useState }from 'react';
import { Link } from 'react-router-dom';
import style from '../style.css';


export default function Header() {
 
  const handleLogout = () => {
    localStorage.removeItem('AUTH');
  };

>>>>>>> 9517ef50806025d5b4c3b4615d97eee91b1b97ec
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
<<<<<<< HEAD
        <Link to={'/'}>Log Out</Link>
=======
        <Link to={'/'} onClick={handleLogout}>Log Out</Link>
>>>>>>> 9517ef50806025d5b4c3b4615d97eee91b1b97ec
      </div>
      <div className={style.headerButton}>
        <Link to={'/about'}>About the Developers</Link>
      </div>
    </div>
  );
}

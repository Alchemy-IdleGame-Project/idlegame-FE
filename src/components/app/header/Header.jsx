import React from 'react';
import { Link } from 'react-router-dom';
import style from '../style.css';

export default function Header() {
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
        <Link to={'/'}>Log Out</Link>
      </div>
      <div className={style.headerButton}>
        <Link to={'/about'}>About the Developers</Link>
      </div>

    </div>
  );
}

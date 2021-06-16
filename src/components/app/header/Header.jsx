import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div>
      <div>
        <Link to={'/'}>Home</Link>
        <Link to={'/register'}>Sign Up</Link>
        <Link to={'/login'}>Log In</Link>
      </div>
    </div>
  );
}

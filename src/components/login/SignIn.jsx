import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as request from 'superagent';
import style from '../app/style.css';


const SignIn = (props) => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
  });
  const url = process.env.DATABASE_URL;

  async function signIn(username, password) {
    //this is a placeholder
    const res = await request
      .post(`${url}/auth/signin`)
      .send({ password, email: username });
    return res.body;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = await signIn(userInfo.username, userInfo.password);
    props.handleAuth(auth);
    props.history.push('/game');
  };

  const handleUsername = (e) => {
    setUserInfo({
      ...userInfo,
      username: e.target.value,
    });
  };

  const handlePassword = (e) => {
    setUserInfo({
      ...userInfo,
      password: e.target.value,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label >Username: 
            <input value={userInfo.username} onChange={handleUsername} />
          </label>
        </div>
        <div>
          <label>Password: 
            <input value={userInfo.password} onChange={handlePassword}/>
          </label>
        </div>
        <button className={style.smallButton}>
          Log In
        </button>
      </form>
    </div>
  );
};

SignIn.propTypes = {
  handleAuth: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default SignIn;

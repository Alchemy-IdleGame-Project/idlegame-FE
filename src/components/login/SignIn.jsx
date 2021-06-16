import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as request from 'superagent';


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
          <label >Username</label>
          <input value={userInfo.username} onChange={handleUsername} />
        </div>
        <div>
          <label>Password</label>
          <input value={userInfo.password} onChange={handlePassword}/>
        </div>
        <button>
          Log In
        </button>
      </form>
    </div>
  );
};

SignIn.propTypes = {
  handleAuth: PropTypes.func.isRequired,
  history: PropTypes.string.isRequired
};

export default SignIn;

import React, { useState } from 'react';
import * as request from 'superagent';
import PropTypes from 'prop-types';
import style from '../app/style.css';

const Register = (props) => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
  });
  const url = process.env.DATABASE_URL;

  async function signUp(username, password) {
    //this is a placeholder
    const res = await request
      .post(`${url}/auth/signup`)
      .send({ password, email: username });
    return res.body;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = await signUp(userInfo.username, userInfo.password);
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
          <label>Username: 
            <input value={userInfo.username} onChange={handleUsername} />
          </label>
        </div>
        <div>
          <label>Password: 
            <input value={userInfo.password} onChange={handlePassword}/>
          </label>
        </div>
        <button className={style.smallButton}>
          Register
        </button>
      </form>
    </div>
  );
};


Register.propTypes = {
  handleAuth: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default Register;

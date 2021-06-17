import React, { useState } from 'react';
import * as request from 'superagent';
import PropTypes from 'prop-types';



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
    console.log(res.body);
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
          <label >Username</label>
          <input value={userInfo.username} onChange={handleUsername} />
        </div>
        <div>
          <label>Password</label>
          <input value={userInfo.password} onChange={handlePassword}/>
        </div>
        <button>
          Register
        </button>
      </form>
    </div>
  );
};


Register.propTypes = {
  handleAuth: PropTypes.func.isRequired,
  history: PropTypes.string.isRequired
};

export default Register;

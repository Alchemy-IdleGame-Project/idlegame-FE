import React, { useState } from 'react';
import * as request from 'superagent';

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
  });
  const url = 'placeholder';

  async function signUp(username, password) {
    //this is a placeholder
    const res = await request
      .post(`${url}/auth/signup`)
      .send({ username, password });
    return res.body;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(userInfo.username, userInfo.password);
    // this.props.history.push('/game');
  };

  const handleUsername = (e) => {
    setUserInfo({
      username: e.target.value,
    });
  };

  const handlePassword = (e) => {
    setUserInfo({
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

export default Register;

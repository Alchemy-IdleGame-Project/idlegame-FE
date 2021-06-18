import React from 'react';
import PropTypes from 'prop-types';
import style from '../app/style.css';


const Logout = (props) => {
  const [loggedOut, setLoggedOut] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem();
    setLoggedOut(true);
  };
  if (loggedOut){
    props.history.push('/');
  }

  return (
    <div>
      <button onClick={handleLogout} className={style.smallButton}>
        Log Out
      </button>
    </div>
  );
};

Logout.propTypes = {
  history: PropTypes.object.isRequired
};

export default Logout;

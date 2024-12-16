import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    // localStorage.removeItem('role');

    navigate('/login');
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2>Logging you out...</h2>
      <p>Please wait...</p>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    textAlign: "center",
  },
};

export default Logout;

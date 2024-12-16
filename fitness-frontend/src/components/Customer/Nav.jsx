import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import extractUserInfoFromToken from '../../utils/tokenUtils';

function Nav() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [showProgramOptions, setShowProgramOptions] = useState(false);
  const [showSettingsOptions, setShowSettingsOptions] = useState(false);
  const navRef = useRef(null);
  const [userName, setUserName] = useState('');  // Initialize with an empty string or any default value
  const [userEmail, setUserEmail] = useState('');

  const toggleNavVisibility = () => setIsNavVisible(!isNavVisible);
  const toggleProgramOptions = () => setShowProgramOptions(!showProgramOptions);
  const toggleSettingsOptions = () => setShowSettingsOptions(!showSettingsOptions);

  const handleClickOutside = (event) => {
    if (
      isNavVisible && 
      navRef.current && 
      !navRef.current.contains(event.target) &&
      !event.target.closest('button') // Exclude clicks on the toggle button
    ) {
      setIsNavVisible(false);
    }
  };

  // Register the click event listener outside of useEffect
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNavVisible]); // only re-run when isNavVisible changes

  useEffect(() => {
    const { role, email } = extractUserInfoFromToken(localStorage.getItem("token"));
    
    // Fetch user data with the email parameter
    axios.get('http://localhost:8080/api/user/fetch-user', {
      params: { email: email }
    })
    .then((res) => {
      setUserName(res.data.name);  // Set the username from the API response
      setUserEmail(res.data.email);  // Set the email from the API response
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, []);

  return (
    <>
      {/* Toggle Button */}
      <button 
        style={styles.toggleButton} 
        onClick={toggleNavVisibility}
      >
        {isNavVisible ? '◀' : '▶'}
      </button>

      {isNavVisible && (
        <nav ref={navRef} style={styles.nav}>
          <div style={styles.logo}>
            <span style={styles.logoText}>WellFit</span>
          </div>

          {/* Desktop Vertical Navigation */}
          <div style={styles.navItems}>
            <Link to="/customer/dashboard" style={styles.link}>
              <i style={styles.icon}>🏠</i>
              Dashboard
            </Link>

            <div style={styles.settingsContainer}>
              <div 
                style={styles.link} 
                onClick={toggleProgramOptions}
              >
                <i style={styles.icon}>💪</i>
                Programs {showProgramOptions ? '▲' : '▼'}
              </div>
              {showProgramOptions && (
                <div style={styles.dropdown}>
                  <Link to="/customer/available-programs" style={styles.dropdownLink}>
                    Book Program
                  </Link>
                  <Link to="/customer/my-programs" style={styles.dropdownLink}>
                    My Programs
                  </Link>
                </div>
              )}
            </div>

            <div style={styles.settingsContainer}>
              <div 
                style={styles.link} 
                onClick={toggleSettingsOptions}
              >
                <i style={styles.icon}>⚙️</i>
                Settings {showSettingsOptions ? '▲' : '▼'}
              </div>
              {showSettingsOptions && (
                <div style={styles.dropdown}>
                  <Link to="/customer/profile" style={styles.dropdownLink}>
                    Profile
                  </Link>
                  {/*<Link to="/customer/goals" style={styles.dropdownLink}>
                    Fitness Goals
                  </Link>
                  <Link to="/customer/preferences" style={styles.dropdownLink}>
                    Preferences
                  </Link>*/}
                </div>
              )}
            </div>

            {/*<Link to="/customer/progress" style={styles.link}>
              <i style={styles.icon}>📊</i>
              Progress Tracker
            </Link>*/}

            <Link to="/customer/logout" style={styles.logoutLink}>
              <i style={styles.icon}>🚪</i>
              Logout
            </Link>
          </div>

          {/* User Profile Section */}
          <div style={styles.userProfile}>
            <div style={styles.avatarPlaceholder}>
              <span style={styles.avatarText}>{userName.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <div style={styles.userName}>{userName}</div>
              <div style={styles.userEmail}>{userEmail}</div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

const styles = {
  toggleButton: {
    position: 'fixed',
    left: '10px',
    top: '10px',
    zIndex: 1000,
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '18px',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  },
  nav: {
    width: '280px',
    height: '100vh',
    backgroundColor: '#f4f7f6',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    color: '#2c3e50',
    fontFamily: 'Nunito, Arial, sans-serif',
    position: 'fixed',
    left: '0',
    top: '0',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease',
    zIndex: 999,
  },
  logo: {
    textAlign: 'center',
    marginBottom: '30px',
    borderBottom: '1px solid #e0e6e3',
    paddingBottom: '20px',
  },
  logoText: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#2ecc71',
  },
  navItems: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  link: {
    color: '#2c3e50',
    textDecoration: 'none',
    margin: '10px 0',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
    borderRadius: '8px',
  },
  icon: {
    marginRight: '12px',
    fontSize: '20px',
  },
  settingsContainer: {
    marginBottom: '10px',
  },
  dropdown: {
    backgroundColor: '#e8f5e9',
    padding: '10px',
    borderRadius: '8px',
    marginTop: '5px',
  },
  dropdownLink: {
    display: 'block',
    color: '#2c3e50',
    textDecoration: 'none',
    padding: '8px 12px',
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  logoutLink: {
    color: '#e74c3c',
    textDecoration: 'none',
    margin: '10px 0',
    fontSize: '16px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
    borderRadius: '8px',
    marginTop: 'auto',
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: '#e8f5e9',
    borderRadius: '10px',
    marginTop: '20px',
  },
  avatarPlaceholder: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#2ecc71',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '15px',
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
  },
  userName: {
    fontWeight: '700',
    color: '#2c3e50',
  },
  userEmail: {
    fontSize: '14px',
    color: '#7f8c8d',
  },
};

export default Nav;

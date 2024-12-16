import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  const [showTrainerOptions, setShowTrainerOptions] = useState(false);
  const [showProgramOptions, setShowProgramOptions] = useState(false);
  const [showSettingsOptions, setShowSettingsOptions] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu toggle

  // Toggle Trainer options on hover
  const handleTrainerMouseEnter = () => setShowTrainerOptions(true);
  const handleTrainerMouseLeave = () => setShowTrainerOptions(false);

  //Toggle Program options on hover
  const handleProgramMouseEnter = () => setShowProgramOptions(true);
  const handleProgramMouseLeave = () => setShowProgramOptions(false);

  // Toggle Settings options on hover
  const handleSettingsMouseEnter = () => setShowSettingsOptions(true);
  const handleSettingsMouseLeave = () => setShowSettingsOptions(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav style={styles.nav}>
      {/* Desktop Navigation */}
      <div style={styles.navItems}>
        <Link to="/admin/dashboard" style={styles.link}>Dashboard</Link>

        <div
          style={styles.settingsContainer}
          onMouseEnter={handleTrainerMouseEnter}
          onMouseLeave={handleTrainerMouseLeave}
        >
          <span style={styles.link}>Trainers</span>
          {showTrainerOptions && (
            <div style={styles.dropdown}>
              <Link to="/admin/create-trainer" style={styles.dropdownLink}>Create</Link>
              <Link to="/admin/all-users" style={styles.dropdownLink}>View</Link>
            </div>
          )}
        </div>

        <div
          style={styles.settingsContainer}
          onMouseEnter={handleProgramMouseEnter}
          onMouseLeave={handleProgramMouseLeave}
        >
          <span style={styles.link}>Programs</span>
          {showProgramOptions && (
            <div style={styles.dropdown}>
              <Link to="/admin/create-program" style={styles.dropdownLink}>Create</Link>
              <Link to="/admin/all-programs" style={styles.dropdownLink}>View</Link>
            </div>
          )}
        </div>

        <div
          style={styles.settingsContainer}
          onMouseEnter={handleSettingsMouseEnter}
          onMouseLeave={handleSettingsMouseLeave}
        >
          <span style={styles.link}>Settings</span>
          {showSettingsOptions && (
            <div style={styles.dropdown}>
              <Link to="/admin/profile" style={styles.dropdownLink}>Profile</Link>
            </div>
          )}
        </div>

        <Link to="/logout" style={styles.link}>Logout</Link>
      </div>

      {/* Mobile Menu Toggle */}
      <div style={styles.mobileMenuIcon} onClick={toggleMobileMenu}>
        <span style={styles.menuIconLine}></span>
        <span style={styles.menuIconLine}></span>
        <span style={styles.menuIconLine}></span>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div style={styles.mobileNav}>
          <Link to="/admin/dashboard" style={styles.mobileLink}>Dashboard</Link>
          <div style={styles.mobileDropdown}>
            <span style={styles.mobileLink}>Trainer</span>
            <div style={styles.mobileDropdownMenu}>
              <Link to="/admin/create-trainer" style={styles.mobileDropdownLink}>Create</Link>
              <Link to="/admin/all-users" style={styles.mobileDropdownLink}>View</Link>
            </div>
          </div>
          <div style={styles.mobileDropdown}>
            <span style={styles.mobileLink}>Settings</span>
            <div style={styles.mobileDropdownMenu}>
              <Link to="/admin/profile" style={styles.mobileDropdownLink}>Profile</Link>
            </div>
          </div>
          <Link to="/logout" style={styles.mobileLink}>Logout</Link>
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
  },
  navItems: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    margin: '0 15px',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'color 0.3s ease',
  },
  linkHover: {
    color: '#4CAF50',
  },
  settingsContainer: {
    position: 'relative',
    display: 'inline-block',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: '0',
    backgroundColor: '#333',
    padding: '10px',
    borderRadius: '4px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
  },
  dropdownLink: {
    display: 'block',
    color: '#fff',
    textDecoration: 'none',
    padding: '8px 12px',
    fontSize: '14px',
    fontWeight: '400',
    transition: 'background-color 0.3s ease',
  },
  dropdownLinkHover: {
    backgroundColor: '#555',
  },

  // Mobile Styles
  mobileMenuIcon: {
    display: 'none',
    flexDirection: 'column',
    cursor: 'pointer',
    padding: '10px',
    justifyContent: 'space-around',
    height: '30px',
    width: '30px',
    backgroundColor: 'transparent',
    border: 'none',
    zIndex: 1001,
  },
  menuIconLine: {
    height: '3px',
    width: '25px',
    backgroundColor: '#fff',
  },
  mobileNav: {
    position: 'absolute',
    top: '60px',
    right: '0',
    backgroundColor: '#333',
    width: '250px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    borderRadius: '8px',
    zIndex: 1000,
  },
  mobileLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
    padding: '10px 0',
    display: 'block',
    transition: 'color 0.3s ease',
  },
  mobileDropdown: {
    marginBottom: '15px',
  },
  mobileDropdownMenu: {
    paddingLeft: '20px',
    marginTop: '10px',
  },
  mobileDropdownLink: {
    display: 'block',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '8px 0',
    transition: 'background-color 0.3s ease',
  },
};

export default Nav;

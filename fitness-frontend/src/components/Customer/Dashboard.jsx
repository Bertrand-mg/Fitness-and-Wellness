import React from 'react';

function Dashboard() {
  return (
    <main style={styles.main}>
      <h2 style={styles.heading}>Overview</h2>
      <p style={styles.paragraph}>Here you can manage your account, view analytics, and more.</p>
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Analytics</h3>
        <p style={styles.cardContent}>Coming soon...</p>
      </div>
      {/* <div style={styles.card}>
        <h3 style={styles.cardTitle}>Tasks</h3>
        <p style={styles.cardContent}>No pending tasks.</p>
      </div> */}
    </main>
  );
}

const styles = {
  main: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f4f6f9',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    height: '600px',
    width: '1000px',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
  },
  paragraph: {
    textAlign: 'center',
    fontSize: '1.1rem',
    color: '#555',
    marginBottom: '40px',
    maxWidth: '900px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    margin: '20px 0',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardTitle: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '10px',
  },
  cardContent: {
    fontSize: '1rem',
    color: '#666',
  },
  cardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
  },
};

export default Dashboard;

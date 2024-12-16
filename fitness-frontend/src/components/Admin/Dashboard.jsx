import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPrograms, setTotalPrograms] = useState(0);  // For storing total number of programs
  const [inactiveUsers, setInactiveUsers] = useState(50); // Mock inactive users for now

  // Mock data for bookings (you can replace it with real data fetched from an API)
  const [bookingData, setBookingData] = useState({
    labels: ['2024-12-15', '2024-12-16', '2024-12-14', '2024-12-13', '2024-12-12'],
    datasets: [
      {
        label: 'Bookings by Date',
        data: [5, 8, 3, 7, 4],  // Number of bookings made on each date
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    // Fetch user data (total users)
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/user/all-users', {
          params: {
            page: 0,
            size: 10,
          },
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        setTotalUsers(response.data.totalElements);  // Set the total number of users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    // Fetch program data (total programs)
    const fetchPrograms = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/programs/all-programs', {
          params: {
            page: 0,
            size: 10,
          },
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        setTotalPrograms(response.data.totalElements);  // Set the total number of programs
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    // Call both fetch functions on component mount
    fetchUsers();
    fetchPrograms();
  }, []); // Empty dependency array to run the effect once on mount

  return (
    <main style={styles.main}>
      <h2 style={styles.heading}>Dashboard Overview</h2>
      <p style={styles.paragraph}>Manage your account, view program analytics, and more.</p>

      {/* Program Users Info Cards */}  
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Users</h3>
          <p style={styles.cardContent}>{totalUsers}</p>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Programs</h3>
          <p style={styles.cardContent}>{totalPrograms}</p>
        </div>
      </div>

      {/* Booking Data Chart */}
      <div style={styles.chartContainer}>
        <h3 style={styles.chartTitle}>Bookings Made by Date</h3>
        <Bar
          data={bookingData} // Data to be displayed
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Bookings per Day',
                font: {
                  size: 18,
                },
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    return `Bookings: ${context.raw}`;
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Date',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Number of Bookings',
                },
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </main>
  );
}

const styles = {
  main: {
    padding: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
    height: 'auto',
    minHeight: '700px',
    width: '100%',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2.2rem',
    color: '#2c3e50',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  paragraph: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#7f8c8d',
    marginBottom: '40px',
    maxWidth: '900px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '30px',
    gap: '20px',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    margin: '10px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    width: '32%',
    minWidth: '280px',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: '1.6rem',
    color: '#34495e',
    marginBottom: '15px',
    fontWeight: '600',
  },
  cardContent: {
    fontSize: '1.4rem',
    color: '#2ecc71',  // Green for numbers to highlight them
    fontWeight: 'bold',
  },
  chartContainer: {
    marginTop: '40px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  chartTitle: {
    textAlign: 'center',
    fontSize: '1.8rem',
    color: '#34495e',
    marginBottom: '20px',
  }
};

export default Dashboard;

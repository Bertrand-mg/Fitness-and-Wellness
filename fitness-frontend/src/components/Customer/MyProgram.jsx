import React, { useState, useEffect } from 'react';
import axios from 'axios';
import extractUserInfoFromToken from '../../utils/tokenUtils';

const styles = {
  main: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
    padding: '2rem',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '2rem',
    fontSize: '2.5rem',
    fontWeight: '700',
  },
  searchInput: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1.5rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#2c3e50',
  },
  cardText: {
    color: '#34495e',
    marginBottom: '0.5rem',
  },
  cancelButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  cancelButtonHover: {
    backgroundColor: '#c0392b',
  },
  emptyState: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: '1.5rem',
    padding: '2rem',
  },
};

function MyPrograms() {
  const [bookedPrograms, setBookedPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredCancel, setHoveredCancel] = useState(null);

  // Fetch booked programs from the API
  useEffect(() => {
    const fetchBookedPrograms = async () => {
      try {
        const token = localStorage.getItem("token");
        const { role, email } = extractUserInfoFromToken(token);

        const response = await axios.get('http://localhost:8080/api/bookings/user-bookings', {
          params: {
            email: email,
            page: currentPage,
            size: pageSize,
          },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setBookedPrograms(response.data.content);
        setFilteredPrograms(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching booked programs:', error);
        alert('Failed to load booked programs');
      }
    };

    fetchBookedPrograms();
  }, [currentPage, pageSize]);

  // Handle search term change
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setFilteredPrograms(bookedPrograms);
    } else {
      const filtered = bookedPrograms.filter((program) =>
        program.programName.toLowerCase().includes(value.toLowerCase())
      );

      setFilteredPrograms(filtered);
    }
  };

  // Handle program cancellation
  const onCancelProgram = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/bookings/${bookingId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setBookedPrograms(prev => prev.filter(program => program.bookingId !== bookingId));
      setFilteredPrograms(prev => prev.filter(program => program.bookingId !== bookingId));

      alert('Program successfully canceled');
    } catch (error) {
      console.error('Error canceling program:', error);
      alert('Failed to cancel the program');
    }
  };

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <h2 style={styles.heading}>My Booked Programs</h2>
        
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search booked programs by name..."
          style={styles.searchInput}
        />

        {filteredPrograms.length === 0 ? (
          <div style={styles.emptyState}>
            No booked programs found
          </div>
        ) : (
          <div style={styles.cardsContainer}>
            {filteredPrograms.map((program) => (
              <div 
                key={program.bookingId} 
                style={{
                  ...styles.card,
                  ...(hoveredCard === program.bookingId ? styles.cardHover : {})
                }}
                onMouseEnter={() => setHoveredCard(program.bookingId)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <h3 style={styles.cardTitle}>{program.programName}</h3>
                <p style={styles.cardText}><strong>Trainer:</strong> {program.userName}</p>
                <p style={styles.cardText}><strong>Price:</strong> {program.programPrice}</p>
                <p style={styles.cardText}><strong>Booking Date:</strong> {new Date(program.bookingDate).toLocaleDateString()}</p>
                <button 
                  onClick={() => onCancelProgram(program.bookingId)}
                  style={{
                    ...styles.cancelButton,
                    ...(hoveredCancel === program.bookingId ? styles.cancelButtonHover : {})
                  }}
                  onMouseEnter={() => setHoveredCancel(program.bookingId)}
                  onMouseLeave={() => setHoveredCancel(null)}
                >
                  Cancel Program
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default MyPrograms;
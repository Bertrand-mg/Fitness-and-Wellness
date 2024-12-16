import React, { useEffect, useState } from 'react';
import axios from 'axios';
import extractUserInfoFromToken from '../../utils/tokenUtils';

function AvailableProgram() {
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch programs from the API
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/programs/all-programs', {
          params: {
            page: currentPage,
            size: pageSize,
          },
        });
        setPrograms(response.data.content);
        setFilteredPrograms(response.data.content); // Set filtered data initially
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    fetchPrograms();
  }, [currentPage, pageSize]);

  // Handle page changes
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handle page size changes
  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(0); // Reset to the first page when page size changes
  };

  // Handle search term change
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter programs based on the search term
    const filtered = programs.filter((program) =>
      program.name.toLowerCase().includes(value.toLowerCase()) ||
      program.description.toLowerCase().includes(value.toLowerCase()) ||
      program.price.toString().includes(value)
    );

    setFilteredPrograms(filtered);
  };

  const onRowAction = async (program) => {
    try {
        const {role,email} =extractUserInfoFromToken(localStorage.getItem("token"));
      const response = await axios.post('http://localhost:8080/api/bookings/newbook', {
        email: email,
        programId: program.id,
      });

      alert(`Successfully booked the program: ${program.name}`);

    } catch (error) {
      console.error('Error booking program:', error);
      alert('There was an error booking the program.');
    }
  };

  return (
    <div className="manage-program-container" style={styles.manageProgramContainer}>
      <div className="manage-program-header" style={styles.manageProgramHeader}>
        <h2 style={styles.pageTitle}>Available Programs</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search programs..."
          style={styles.searchInput}
        />
      </div>

      <div className="table-wrapper" style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Description</th>
              <th style={styles.tableHeader}>Price</th>
              <th style={styles.tableHeader}>Trainer</th>
              <th style={styles.tableHeader}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrograms.map((program) => (
              <tr key={program.id} style={styles.tableRow}>
                <td style={styles.tableCell}>{program.name}</td>
                <td style={styles.tableCell}>{program.description}</td>
                <td style={styles.tableCell}>{program.price}</td>
                <td style={styles.tableCell}>{program.userName}</td>
                <td style={styles.tableCell}>
                    <button onClick={() => onRowAction(program)} style={styles.actionButton}>
                        Book Now
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container" style={styles.paginationContainer}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          style={styles.paginationButton}
        >
          Previous
        </button>
        <span style={styles.paginationText}>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          style={styles.paginationButton}
        >
          Next
        </button>
      </div>

      <div className="page-size-selector" style={styles.pageSizeSelector}>
        <label htmlFor="pageSize" style={styles.pageSizeLabel}>Page size:</label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={handlePageSizeChange}
          style={styles.pageSizeSelect}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
}

const styles = {
  manageProgramContainer: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  manageProgramHeader: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  pageTitle: {
    color: '#2ecc71',
    fontWeight: '600',
    marginBottom: '15px',
  },
  tableWrapper: {
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
    minWidth: '600px',
    boxShadow: '0 2px 3px rgba(0, 0, 0, 0.1)',
  },
  tableHeader: {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #2ecc71',
    backgroundColor: '#f0f4f0',
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  tableRow: {
    transition: 'background-color 0.3s ease',
  },
  tableCell: {
    padding: '12px',
    borderBottom: '1px solid #e0e0e0',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
  },
  paginationButton: {
    padding: '8px 16px',
    border: 'none',
    backgroundColor: '#2ecc71',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '14px',
    transition: 'background-color 0.3s ease',
  },
  paginationText: {
    fontSize: '16px',
    color: '#2ecc71',
  },
  pageSizeSelector: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  pageSizeLabel: {
    color: '#2ecc71',
    marginRight: '10px',
  },
  pageSizeSelect: {
    padding: '6px 12px',
    fontSize: '14px',
    border: '1px solid #2ecc71',
    borderRadius: '4px',
    color: '#2ecc71',
    backgroundColor: 'white',
  },
  searchInput: {
    padding: '8px',
    fontSize: '16px',
    width: '100%',
    maxWidth: '400px',
    marginTop: '10px',
    marginBottom: '20px',
    borderRadius: '4px',
    border: '1px solid #2ecc71',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  actionButton: {
    backgroundColor: '#2ecc71',
    color: 'white',
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default AvailableProgram;
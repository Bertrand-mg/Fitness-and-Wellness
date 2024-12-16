import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManageTrainer() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user/all-users', {
          params: {
            page: currentPage,
            size: pageSize,
          },
        });
        setUsers(response.data.content);
        setFilteredUsers(response.data.content); // Set filtered data initially
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
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

    // Filter users based on the search term
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase()) ||
      user.email.toLowerCase().includes(value.toLowerCase()) ||
      user.role.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredUsers(filtered);
  };

  return (
    <div className="manage-trainer-container" style={styles.manageTrainerContainer}>
      <div className="manage-trainer-header" style={styles.manageTrainerHeader}>
        <h2>Manage Trainers</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search trainers..."
          style={styles.searchInput}
        />
      </div>

      <div className="table-wrapper" style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Email</th>
              <th style={styles.tableHeader}>Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td style={styles.tableCell}>{user.name}</td>
                <td style={styles.tableCell}>{user.email}</td>
                <td style={styles.tableCell}>{user.role}</td>
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
        <label htmlFor="pageSize">Page size:</label>
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
  manageTrainerContainer: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  manageTrainerHeader: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  tableWrapper: {
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
    minWidth: '600px', // To prevent shrinking too much on small screens
    border: '1px solid #ddd', // Border for the entire table
  },
  tableHeader: {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #007bff', // Bottom border for table headers
    backgroundColor: '#f4f4f4',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: '12px',
    borderBottom: '1px solid #ddd', // Bottom border for table cells
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
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '14px',
  },
  paginationText: {
    fontSize: '16px',
  },
  pageSizeSelector: {
    display: 'flex',
    alignItems: 'center',
  },
  pageSizeSelect: {
    padding: '6px 12px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginLeft: '10px',
  },
  searchInput: {
    padding: '8px',
    fontSize: '16px',
    width: '100%',
    maxWidth: '400px',
    marginTop: '10px',
    marginBottom: '20px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  // Styling for mobile responsiveness
  '@media (max-width: 768px)': {
    table: {
      fontSize: '14px',
    },
    paginationContainer: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    pageSizeSelector: {
      marginTop: '10px',
    },
    'manage-trainer-header h2': {
      fontSize: '20px',
    },
  },
  '@media (max-width: 480px)': {
    table: {
      fontSize: '12px',
    },
    paginationButton: {
      padding: '6px 12px',
      fontSize: '12px',
    },
    pageSizeSelect: {
      padding: '4px 8px',
      fontSize: '12px',
    },
  },
};

export default ManageTrainer;

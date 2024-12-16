import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManageProgram() {
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

  return (
    <div className="manage-program-container" style={styles.manageProgramContainer}>
      <div className="manage-program-header" style={styles.manageProgramHeader}>
        <h2>Manage programs</h2>
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
            </tr>
          </thead>
          <tbody>
            {filteredPrograms.map((program) => (
              <tr key={program.id}>
                <td style={styles.tableCell}>{program.name}</td>
                <td style={styles.tableCell}>{program.description}</td>
                <td style={styles.tableCell}>{program.price}</td>
                <td style={styles.tableCell}>{program.userName}</td>
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
  manageProgramContainer: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  manageProgramHeader: {
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
    minWidth: '600px',
    border: '1px solid #ddd',
  },
  tableHeader: {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #007bff',
    backgroundColor: '#f4f4f4',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
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
};

export default ManageProgram;

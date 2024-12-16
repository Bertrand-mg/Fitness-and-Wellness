import React, { useEffect, useState } from 'react';
import { createprogram, fetchTrainer } from '../../services/api';

function CreateProgram() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    trainer: '',
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [trainers, setTrainers] = useState([]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    // Fetch trainer data using the fetchTrainer function
    fetchTrainer("TRAINER")
      .then((response) => {
        setTrainers(response.data); // Assuming API returns an array of User objects
      })
      .catch((error) => {
        console.error('Error fetching trainers:', error);
      });
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulating form submission (you can replace this with the actual API call)
      const response = await createprogram(formData); // Replace with your API call
      setSuccessMessage('Form data submitted:', response.data);
      setErrorMessage("");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setErrorMessage("Server Error: Trainer creation failed.");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Create Program</h2>

      {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
      {successMessage && <p style={styles.success}>{successMessage}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Program Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Program Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Program Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Trainer:
            <select
              name="trainer"
              value={formData.trainer} // Bind to formData's `trainer` field
              onChange={handleChange}
              required
              style={styles.input}
            >
              <option value="" disabled>
                Select a trainer
              </option>
              {trainers.map((trainer) => (
                <option key={trainer.id} value={trainer.id}>
                  {trainer.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="submit"
          style={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f6f9',
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    margin: '50px auto',
  },
  header: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formGroup: {
    width: '100%',
    marginBottom: '15px',
  },
  label: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '5px',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  inputFocus: {
    borderColor: '#4CAF50',
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  errorMessage: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '20px',
  },
  success: {
    color: 'green',
    fontSize: '14px',
    marginBottom: '20px',
  },
  linkText: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#555',
  },
  link: {
    color: '#4CAF50',
    textDecoration: 'none',
  },
};

export default CreateProgram

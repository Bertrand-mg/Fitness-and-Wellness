import React, { useEffect, useState } from 'react';
import { userprofile, updateuserprofile } from "../../services/api";
import { extractUserInfoFromToken } from "../../utils/tokenUtils";

function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentpassword: "",
    newpassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateuserprofile(formData);
      console.log("Response:", response.data);
      setSuccessMessage("Profile updated successfully!");
      setErrorMessage("");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setErrorMessage("Update failed. Please check your input.");
      setSuccessMessage("");
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const { role, email } = extractUserInfoFromToken(token);
        const response = await userprofile(email);
        setFormData({
          ...formData,
          email: response.data.email,
          name: response.data.name,
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Update Your Profile</h2>
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      {successMessage && <p style={styles.success}>{successMessage}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
            disabled
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="currentpassword" style={styles.label}>Current Password</label>
          <input
            type="password"
            name="currentpassword"
            value={formData.currentpassword}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="newpassword" style={styles.label}>New Password</label>
          <input
            type="password"
            name="newpassword"
            value={formData.newpassword}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.submitButton}>
          Update Profile
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8f9fa',
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
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
    padding: '10px',
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
  submitButtonHover: {
    backgroundColor: '#45a049',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '20px',
  },
  success: {
    color: 'green',
    fontSize: '14px',
    marginBottom: '20px',
  },
};

export default Profile;

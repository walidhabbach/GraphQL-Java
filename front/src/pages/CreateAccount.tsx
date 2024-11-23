import { useState } from 'react';
import {  useMutation } from '@apollo/client';
import { CREATE_ACCOUNT } from '../api/graphql/mutations';



const CreateAccount = () => {
  const [type, setType] = useState('COURANT');
  const [addTransaction, { data, loading, error }] = useMutation(CREATE_ACCOUNT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTransaction({
      variables: {   
        compte: {
          solde: 0,
          type: type,
        },
      },
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Account</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
    
        <div style={styles.inputGroup}>
          <label style={styles.label}>Type</label>
          <select
            style={styles.select}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="COURANT">COURANT</option>
            <option value="EPARGNE">EPARGNE</option>
          </select>
        </div>
        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Add Account'}
        </button>
      </form>
      {data && <p style={styles.success}>Account added successfully!</p>}
      {error && <p style={styles.error}>Error: {error.message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f7f9fc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    fontSize: '1.8rem',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  select: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  success: {
    marginTop: '20px',
    color: '#28a745',
    fontWeight: 'bold',
  },
  error: {
    marginTop: '20px',
    color: '#dc3545',
    fontWeight: 'bold',
  },
};

export default CreateAccount;
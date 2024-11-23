import { useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_COMPTE_STATS ,GET_ACCOUNTS} from '../api/graphql/queries';
import {  DELETE_ACCOUNT} from '../api/graphql/mutations';

import AccountsStatCard  from '../components/AccountsStatCard';
 
 
 
export default  function ComptesList (){
  const { loading, error, data, refetch } = useQuery(GET_ACCOUNTS);
  const { loading: statsLoading, error: statsError, data: statsData } = useQuery(GET_COMPTE_STATS);
   const [deleteCompte] = useMutation(DELETE_ACCOUNT);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCompte, setSelectedCompte] = useState(null);

  const openModal = (compte) => {
    setSelectedCompte(compte);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCompte(null);
    setModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteCompte({ variables: { id: selectedCompte.id } });
      refetch(); // Refresh the data
      closeModal();
    } catch (err) {
      console.error("Error deleting compte:", err);
    }
  };

  if (loading || statsLoading) {
    return <p>Loading...</p>;
  }

  if (error || statsError) {
    return <p>Error: {error?.message || statsError?.message}</p>;
  }
  return (
    <div style={styles.container}> 
       <div>
      {statsData && statsData.compteStats ? (
        <AccountsStatCard  data={statsData.compteStats} />
      ) : (
        <p>No account statistics available</p>
      )}
    </div>
      <h2 style={styles.heading}>Comptes List</h2>
      <div style={styles.cardContainer}>
        {data.allComptes.map((compte) => (
          <div key={compte.id} style={styles.card}>
            <h3 style={styles.cardHeading}>Compte ID: {compte.id}</h3>
            <p><strong>Solde:</strong> {compte.solde.toFixed(2)} DH</p>
            <p><strong>Date:</strong> {new Date(compte.dateCreation).toLocaleDateString()}</p>
            <p><strong>Type:</strong> {compte.type}</p>
            <div style={styles.buttonContainer}>
              <Link to={`/transactions/${compte.id}`} style={styles.linkButton}>
                Voir Transactions
              </Link>
              <button
                style={styles.deleteButton}
                onClick={() => openModal(compte)}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay} role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <div style={styles.modal}>
          <h3 id="modalTitle" style={styles.modalHeader}>Confirmation</h3>
          <p id="modalDescription" style={styles.modalText}>
            Êtes-vous sûr de vouloir supprimer le compte ID: {selectedCompte.id} ?
          </p>
          <div style={styles.modalActions}>
            <button style={styles.cancelButton} onClick={closeModal}>
              Annuler
            </button>
            <button style={styles.confirmButton} onClick={handleDelete}>
              Confirmer
            </button>
          </div>
        </div>
      </div>
      
      )}
    </div>
  );
}
const styles = {
  container: { 
    margin: '0 auto', 
    fontFamily: "'Roboto', Arial, sans-serif",
    backgroundColor: '#f4f7fa',
    minHeight: '100vh' 
  },
  heading: {
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '30px',
    color: '#333',
    fontWeight: '600',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px', 
    padding: '15px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', 
    cursor: 'pointer',
    color: '#6c757d', // Set text color to gray
  },
  cardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  cardHeading: {
    fontSize: '1.4rem',
    color: '#007bff',
    marginBottom: '15px',
    fontWeight: '500',
  },
  deleteButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#dc3545', // Danger red color
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  deleteButtonHover: {
    backgroundColor: '#c82333',
  },
  viewButton: {
    marginTop: '15px',
    padding: '12px 20px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
    transition: 'background-color 0.3s ease',
  },  
  linkButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff', // Primary blue color
    border: 'none',
    borderRadius: '5px',
    textDecoration: 'none',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  viewButtonHover: {
    backgroundColor: '#0056b3',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px', // Space between buttons
    justifyContent: 'flex-end', // Align buttons to the right (adjust as needed)
    marginTop: '15px',
  },modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '300px',
    width: '90%',
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
    animation: 'fadeIn 0.3s ease-out',
    textAlign: 'center',
  },
  modalHeader: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#333',
  },
  modalText: {
    fontSize: '1rem',
    marginBottom: '20px',
    color: '#555',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  },
  cancelButton: {
    padding: '10px 15px',
    fontSize: '1rem',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  confirmButton: {
    padding: '10px 15px',
    fontSize: '1rem',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  }, 
   
  modalHeading: {
    fontSize: '1.8rem',
    color: '#333',
    marginBottom: '20px',
  },
  
   
  cancelButtonHover: {
    backgroundColor: '#5a6268',
  },
  
  confirmButtonHover: {
    backgroundColor: '#218838',
  },
  

  // Media queries for responsive design
  '@media screen and (max-width: 768px)': {
    container: {
      padding: '10px',
    },
    heading: {
      fontSize: '2rem',
      marginBottom: '20px',
    },
    grid: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // Fewer columns on smaller screens
    },
    card: {
      padding: '15px',
    },
    cardHeading: {
      fontSize: '1.4rem',
    },
    deleteButton: {
      padding: '10px 15px',
    },
    viewButton: {
      padding: '10px 15px',
    },
    buttonContainer: {
      flexDirection: 'column', // Stack buttons vertically on smaller screens
      gap: '10px',
    },
  },

  '@media screen and (max-width: 480px)': {
    container: {
      padding: '5px',
    },
    heading: {
      fontSize: '1.6rem',
      marginBottom: '15px',
    },
    grid: {
      gridTemplateColumns: '1fr', // Single column layout on very small screens
    },
    card: {
      padding: '10px',
    },
    cardHeading: {
      fontSize: '1.3rem',
    },
    deleteButton: {
      padding: '8px 12px',
    },
    viewButton: {
      padding: '8px 12px',
    },
  },
}; 

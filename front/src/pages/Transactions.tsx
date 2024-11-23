import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { GET_TRANSACTION_STATS_ACCOUNT_ID, GET_TRANSACTIONS_BY_ACCOUNT } from '../api/graphql/queries';
import TransactionsStatsCard from '../components/TransactionsStatsCard';

 
const Transactions  = () => {
  const { compteId } = useParams();
  const { loading, error, data } = useQuery(GET_TRANSACTIONS_BY_ACCOUNT, {
    variables: { compteId: compteId },
  });
  const { loading: statsLoading, error: statsError, data: statsData } = useQuery(GET_TRANSACTION_STATS_ACCOUNT_ID, {
    variables: { compteId: compteId },
  });
console.log(statsData)
 
if (loading || statsLoading) {
  return <p>Loading...</p>;
}

if (error || statsError) {
  return <p>Error: {error?.message || statsError?.message}</p>;
}
  const transactions = data.transactionsByCompteId;
   return (
    <div style={styles.container}>
     
    <div>
      {statsData && statsData.transactionStatsByCompteId ? (
        <TransactionsStatsCard  data={statsData.transactionStatsByCompteId} />
      ) : (
        <p>No transation statistics available</p>
      )}
    </div>
      <h2 style={styles.header}>
        Transactions pour le compte ID: {compteId}
      </h2>
      {transactions.length === 0 ? (
        <p>Aucune transaction trouvée pour ce compte.</p>
      ) : (
        <div style={styles.cardContainer}>
          {transactions.map((transaction) => (
            <div key={transaction.id} style={styles.card}>
              <h3 style={styles.cardHeader}>
                Transaction ID: {transaction.id}
              </h3>
              <p style={styles.cardText}>
                <strong>Montant:</strong> ${transaction.montant.toFixed(2)}
              </p>
              <p style={styles.cardText}>
                <strong>Type:</strong> {transaction.type}
              </p>
              <p style={styles.cardText}>
                <strong>Date:</strong> {new Date(transaction.dateTransaction).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    margin: '0 auto', 
    fontFamily: "'Roboto', Arial, sans-serif",
    backgroundColor: '#f4f7fa',
    minHeight: '100vh' 
  },
  header: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '10px',  
    padding: '15px',
    width: '300px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
    textAlign: 'left',
  },
  cardHeader: {
    fontSize: '1.2rem',
    color: '#007bff',
    marginBottom: '10px',
  },
  cardText: {
    fontSize: '1rem',
    margin: '5px 0',
    color: '#555',
  },
};

export default Transactions;
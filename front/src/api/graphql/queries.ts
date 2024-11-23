import { gql } from '@apollo/client';

// Query to get all accounts
export const GET_ACCOUNTS = gql`
  query GetAccounts {
    allComptes {
      id
      solde
      dateCreation
      type
    }
  }
`;

export const GET_COMPTE_STATS = gql`
  query GetStats {
    compteStats {
      count
      sum
      average
    }
  }
`;
export const GET_TRANSACTION_STATS = gql`
query GetTransactionStats{
  transactionStats {
    count
    sumDepots
    sumRetraits
  }
}
`;
export const GET_TRANSACTION_STATS_ACCOUNT_ID = gql`
query GetTransactionStatsByCompteId($compteId: ID!){
   transactionStatsByCompteId(compteId:$compteId) {
    count
    sumDepots
    sumRetraits
  }
}`;
// Query to get all transactions
export const GET_ALL_TRANSACTIONS = gql`
  query GetAllTransactions {
    allTransactions {
      id
      montant
      date
      description
      compte {
        id
        solde
      }
    }
  }
`;

// Query to get transactions by a specific account ID
export const GET_TRANSACTIONS_BY_ACCOUNT = gql`
  query GetTransactionsByAccount($compteId: ID!) {
    transactionsByCompteId(compteId: $compteId) {
      id
      montant
       dateTransaction
      description
      type
      compte {
        id
        solde
      }
    }
  }
`;
 
// Query to get comptes filtered by type
export const GET_COMPTES_BY_TYPE = gql`
  query GetComptesByType($type: TypeCompte!) {
    comptesByType(type: $type) {
      id
      solde
      dateCreation
      type
    }
  }
`;
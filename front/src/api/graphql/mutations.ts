import { gql } from '@apollo/client';

// Mutation to save a new account
export const CREATE_ACCOUNT = gql`
  mutation SaveCompte($compte: CompteRequest!) {
    saveCompte(compte: $compte) {
      id
      solde
      dateCreation
      type
    }
  }
`;

// Mutation to delete an account
export const DELETE_ACCOUNT = gql`
  mutation DeleteCompte($id: ID!) {
    deleteCompte(id: $id) {
      id
      solde
      dateCreation
      type
    }
  }
`;
export const CREATE_TRANSACTION = gql`
  mutation AddTransaction($transaction: TransactionRequest!) {
    addTransaction(transaction: $transaction) {
      id
      montant
      type
      compte {
        id
        solde
      }
    }
  }
`;
 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ComptesList from './pages/ComptesList';
import TransactionsPage from './pages/Transactions';
 import CreateTransaction from './pages/CreateTransaction'; 
import Navigation from './Navigation';
import { ApolloProvider } from '@apollo/client'
import {client} from './api/apollo/client'
import { useState } from 'react';
import CreateAccount from './pages/CreateAccount';

function App() {
  const [count, setCount] = useState(0)

  return (
    <ApolloProvider client={client}> 
      <Router>
        <Navigation /> 
        <Routes>
          <Route path="/" element={<ComptesList />} />
          <Route path="/transactions/:compteId" element={<TransactionsPage />} />
          <Route path="/transaction" element={<CreateTransaction />} />
          <Route path="/account" element={<CreateAccount />} />

         </Routes>
      </Router>
     </ApolloProvider>
  )
}

export default App

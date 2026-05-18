import { useState } from 'react';
import Header from './components/Header';
import Balance from './components/Balance';
import IncomeExpenses from './components/IncomeExpenses';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import Chart from './components/Chart';
import Login from './components/Login';
import Register from './components/Register';
import { GlobalProvider } from './context/GlobalState';
import './index.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [page, setPage] = useState('login');

  const handleLogin = (token, username) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  if (!token) {
    return page === 'login'
      ? <Login onLogin={handleLogin} switchToRegister={() => setPage('register')} />
      : <Register switchToLogin={() => setPage('login')} />;
  }

  return (
    <GlobalProvider>
      <div className="container">
        <button onClick={handleLogout} style={{float:'right', margin:'10px'}}>Logout</button>
        <Header />
        <Balance />
        <IncomeExpenses />
        <Chart />
        <TransactionList />
        <AddTransaction />
      </div>
    </GlobalProvider>
  );
}

export default App;
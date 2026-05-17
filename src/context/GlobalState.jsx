import { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const GlobalContext = createContext();

const reducer = (state, action) => {
  switch(action.type) {
    case 'GET_TRANSACTIONS':
      return { ...state, transactions: action.payload, loading: false };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'DELETE_TRANSACTION':
      return { ...state, transactions: state.transactions.filter(t => t._id !== action.payload) };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    transactions: [], loading: true, error: null
  });

  const getTransactions = async () => {
    try {
      const res = await axios.get('https://expensetrack-backend-jvkr.onrender.com/api/v1/transactions');
      dispatch({ type: 'GET_TRANSACTIONS', payload: res.data.data });
    } catch (err) {
      dispatch({ type: 'GET_TRANSACTIONS', payload: [] });
    }
  };

  const addTransaction = async (transaction) => {
    try {
      const res = await axios.post('https://expensetrack-backend-jvkr.onrender.com/api/v1/transactions', transaction);
      dispatch({ type: 'ADD_TRANSACTION', payload: res.data.data });
    } catch (err) { console.log(err); }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`https://expensetrack-backend-jvkr.onrender.com/api/v1/transactions/${id}`);
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    } catch (err) { console.log(err); }
  };

  useEffect(() => { getTransactions(); }, []);

  return (
    <GlobalContext.Provider value={{
      transactions: state.transactions,
      loading: state.loading,
      addTransaction,
      deleteTransaction
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
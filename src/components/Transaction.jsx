import { useGlobalContext } from '../context/GlobalState';
const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useGlobalContext();
  const sign = transaction.amount < 0 ? '-' : '+';
  return (
    <li className={`transaction-item ${transaction.amount < 0 ? 'minus' : 'plus'}`}>
      <div>
        <h4>{transaction.text}</h4>
        <small style={{ color: '#718096' }}>{new Date(transaction.createdAt).toLocaleDateString()}</small>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontWeight: 800, color: transaction.amount < 0 ? '#e74c3c' : '#2ecc71' }}>
          {sign}₹{Math.abs(transaction.amount)}
        </span>
        <button className="delete-btn" onClick={() => deleteTransaction(transaction._id)}>✕</button>
      </div>
    </li>
  );
};
export default Transaction;
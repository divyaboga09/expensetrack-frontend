import { useGlobalContext } from '../context/GlobalState';

const categoryColors = {
  food: '#f59e0b',
  transport: '#3b82f6',
  entertainment: '#8b5cf6',
  shopping: '#ec4899',
  health: '#10b981',
  salary: '#6c63ff',
  other: '#64748b'
};

const categoryEmojis = {
  food: '🍕',
  transport: '🚗',
  entertainment: '🎬',
  shopping: '🛍️',
  health: '💊',
  salary: '💰',
  other: '📦'
};

const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useGlobalContext();
  const sign = transaction.amount < 0 ? '-' : '+';
  const color = categoryColors[transaction.category] || '#64748b';
  const emoji = categoryEmojis[transaction.category] || '📦';

  return (
    <li className="transaction-item" style={{ borderLeftColor: color }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '1.5rem' }}>{emoji}</span>
        <div>
          <h4>{transaction.text}</h4>
          <small style={{ color: '#718096' }}>
            {new Date(transaction.createdAt).toLocaleDateString()}
          </small>
        </div>
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
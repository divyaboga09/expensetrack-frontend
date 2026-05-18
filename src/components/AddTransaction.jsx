import { useState } from 'react';
import { useGlobalContext } from '../context/GlobalState';

const categories = [
  { value: 'food', label: '🍕 Food' },
  { value: 'transport', label: '🚗 Transport' },
  { value: 'entertainment', label: '🎬 Entertainment' },
  { value: 'shopping', label: '🛍️ Shopping' },
  { value: 'health', label: '💊 Health' },
  { value: 'salary', label: '💰 Salary' },
  { value: 'other', label: '🔮 Other' },
];

const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense');

  const { addTransaction } = useGlobalContext();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || !amount || !category) {
      return alert('Please fill in all fields including category!');
    }
    const finalAmount =
      type === 'expense' ? -Math.abs(+amount) : Math.abs(+amount);
    addTransaction({ text, amount: finalAmount, category });
    setText('');
    setAmount('');
    setCategory('');
    setType('expense');
  };

  return (
    <div className="form-card">
      <h3>Add New Transaction</h3>

      {/* Income / Expense Toggle */}
      <div className="form-control">
        <label>Type</label>
        <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
          <button
            type="button"
            onClick={() => setType('expense')}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '15px',
              background: type === 'expense' ? '#e74c3c' : '#ddd',
              color: type === 'expense' ? 'white' : '#333',
            }}
          >
            💸 Expense
          </button>
          <button
            type="button"
            onClick={() => setType('income')}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '15px',
              background: type === 'income' ? '#2ecc71' : '#ddd',
              color: type === 'income' ? 'white' : '#333',
            }}
          >
            💰 Income
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="form-control">
        <label>Description</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. Grocery shopping"
        />
      </div>

      {/* Category */}
      <div className="form-control">
        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select-input"
        >
          <option value="" disabled>-- Select a category --</option>
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Amount */}
      <div className="form-control">
        <label>Amount (₹)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount e.g. 800"
          min="0"
        />
      </div>

      <button
        className="btn"
        onClick={onSubmit}
        style={{
          background: type === 'expense' ? '#e74c3c' : '#2ecc71',
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginTop: '10px',
        }}
      >
        {type === 'expense' ? '➕ Add Expense' : '➕ Add Income'}
      </button>
    </div>
  );
};

export default AddTransaction;
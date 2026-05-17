import { useState } from 'react';
import { useGlobalContext } from '../context/GlobalState';
const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const { addTransaction } = useGlobalContext();
  const onSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || !amount) return alert('Please fill in both fields!');
    addTransaction({ text, amount: +amount });
    setText(''); setAmount('');
  };
  return (
    <div className="form-card">
      <h3>Add New Transaction</h3>
      <div className="form-control">
        <label>Description</label>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="e.g. Grocery shopping"/>
      </div>
      <div className="form-control">
        <label>Amount (₹)</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Negative(-500) for expense, positive(1000) for income"/>
      </div>
      <button className="btn" onClick={onSubmit}>+ Add Transaction</button>
    </div>
  );
};
export default AddTransaction;
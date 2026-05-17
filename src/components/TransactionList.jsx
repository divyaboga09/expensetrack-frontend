import { useGlobalContext } from '../context/GlobalState';
import Transaction from './Transaction';
const TransactionList = () => {
  const { transactions, loading } = useGlobalContext();
  if (loading) return <p className="empty">Loading...</p>;
  return (
    <div className="section-card">
      <h3>Transaction History</h3>
      {transactions.length === 0 ? (
        <p className="empty">No transactions yet. Add one below! 👇</p>
      ) : (
        <ul className="list">
          {transactions.map(t => <Transaction key={t._id} transaction={t} />)}
        </ul>
      )}
    </div>
  );
};
export default TransactionList;
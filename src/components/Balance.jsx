import { useGlobalContext } from '../context/GlobalState';
const Balance = () => {
  const { transactions } = useGlobalContext();
  const total = transactions.reduce((acc, t) => acc + t.amount, 0).toFixed(2);
  return (
    <div className="balance-card">
      <h3>YOUR BALANCE</h3>
      <h1>₹{Math.abs(total)}</h1>
    </div>
  );
};
export default Balance;
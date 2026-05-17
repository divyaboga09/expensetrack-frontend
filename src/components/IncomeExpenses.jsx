import { useGlobalContext } from '../context/GlobalState';
const IncomeExpenses = () => {
  const { transactions } = useGlobalContext();
  const income = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0).toFixed(2);
  const expense = transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0).toFixed(2);
  return (
    <div className="inc-exp-container">
      <div><p>💚 Income</p><h4 className="money plus">₹{income}</h4></div>
      <div><p>❤️ Expense</p><h4 className="money minus">₹{Math.abs(expense)}</h4></div>
    </div>
  );
};
export default IncomeExpenses;
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGlobalContext } from '../context/GlobalState';

const COLORS = {
  food: '#f59e0b',
  transport: '#3b82f6',
  entertainment: '#8b5cf6',
  shopping: '#ec4899',
  health: '#10b981',
  salary: '#6c63ff',
  other: '#64748b'
};

const Chart = () => {
  const { transactions } = useGlobalContext();

  const expenses = transactions.filter(t => t.amount < 0);

  if (expenses.length === 0) return null;

  const categoryData = expenses.reduce((acc, t) => {
    const cat = t.category || 'other';
    const existing = acc.find(item => item.name === cat);
    if (existing) {
      existing.value += Math.abs(t.amount);
    } else {
      acc.push({ name: cat, value: Math.abs(t.amount) });
    }
    return acc;
  }, []);

  const categoryEmojis = {
    food: '🍕', transport: '🚗', entertainment: '🎬',
    shopping: '🛍️', health: '💊', salary: '💰', other: '📦'
  };

  return (
    <div className="section-card">
      <h3>📊 Spending by Category</h3>
      {categoryData.length === 0 ? (
        <p className="empty">Add some expenses to see the chart!</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={({ name, percent }) => `${categoryEmojis[name]} ${(percent * 100).toFixed(0)}%`}
            >
              {categoryData.map((entry, index) => (
                <Cell key={index} fill={COLORS[entry.name] || '#64748b'} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `₹${value}`} />
            <Legend formatter={(value) => `${categoryEmojis[value]} ${value}`} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Chart;
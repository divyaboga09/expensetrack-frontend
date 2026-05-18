import { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin, switchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
  'https://expensetrack-backend-jvkr.onrender.com/api/users/login',
  { username, password }
);
      onLogin(res.data.token, res.data.username);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>Login</button>
      <p>No account? <span onClick={switchToRegister}>Register</span></p>
    </div>
  );
};

export default Login;
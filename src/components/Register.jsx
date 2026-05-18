import { useState } from 'react';
import axios from 'axios';

const Register = ({ switchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async () => {
    if (!username.trim() || !password.trim()) {
      setIsError(true);
      return setMsg('Please fill in both fields');
    }
    if (password.length < 5) {
      setIsError(true);
      return setMsg('Password must be at least 5 characters');
    }
    try {
      await axios.post(
        'https://expensetrack-backend-jvkr.onrender.com/api/v1/auth/register',
        { username, password }
      );
      setIsError(false);
      setMsg('Registered! Please login.');
      setTimeout(() => switchToLogin(), 1500);
    } catch (err) {
      setIsError(true);
      setMsg(err.response?.data?.error || 'Registration failed. Try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {msg && (
        <p style={{ color: isError ? 'red' : 'green', fontSize: '14px' }}>
          {msg}
        </p>
      )}
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Register</button>
      <p>Have account? <span onClick={switchToLogin}>Login</span></p>
    </div>
  );
};

export default Register;
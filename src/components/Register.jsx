import { useState } from 'react';
import axios from 'axios';

const Register = ({ switchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/v1/auth/register', { username, password });
      setMsg('Registered! Please login.');
    } catch (err) {
      setMsg(err.response?.data?.error || 'Error');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {msg && <p>{msg}</p>}
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>Register</button>
      <p>Have account? <span onClick={switchToLogin}>Login</span></p>
    </div>
  );
};

export default Register;
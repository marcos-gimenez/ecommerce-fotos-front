import { useState } from 'react';
import { adminLogin } from '../../services/adminAuth';
import '../../styles/admin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      const { token } = await adminLogin(email, password);
      localStorage.setItem('adminToken', token);
      window.location.href = '/admin';
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Login</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button className="admin-submit" type="submit">
          Ingresar
        </button>

        {error && <p className="admin-error">{error}</p>}
      </form>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { getOrders } from '../../api/orders';

export default function Sales() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch(err => setError(err.message));
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '40px auto' }}>
      <h2>Ventas</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table width="100%" border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Email</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o._id}>
              <td>{o.email}</td>
              <td>{new Date(o.createdAt).toLocaleString()}</td>
              <td>${o.total}</td>
              <td>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

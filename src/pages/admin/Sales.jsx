import { useEffect, useState } from "react";
import { getOrders } from "../../api/orders";
import { useNavigate } from 'react-router-dom';
import "../../styles/adminSales.css";

export default function Sales() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="admin-sales">
      <h2>Ventas</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {orders.length === 0 ? (
        <div className="sales-empty">No hay ventas todavía</div>
      ) : (
        <table className="sales-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o.email}</td>
                <td>{new Date(o.createdAt).toLocaleString()}</td>
                <td className="order-total">${o.total}</td>
                <td>
                  <span className={`order-status ${o.status}`}>{o.status}</span>
                </td>
                <td>
                  <button
                    className="sales-view-btn"
                    onClick={() => navigate(`/admin/sales/${o._id}`)}
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

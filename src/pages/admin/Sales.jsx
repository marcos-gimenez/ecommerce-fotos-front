import { useEffect, useState } from "react";
import { getOrders } from "../../api/orders";
import { useNavigate } from "react-router-dom";
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

      {error && <p className="admin-error">{error}</p>}

      {orders.length === 0 ? (
        <div className="sales-empty">No hay ventas todavía</div>
      ) : (
        <>
          {/* DESKTOP */}
          <table className="sales-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>WhatsApp</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  <td>{o.email}</td>
                  <td>
                    <a
                      href={`https://wa.me/${o.phone}`}
                      target="_blank"
                      rel="noreferrer"
                      className="sales-whatsapp"
                    >
                      {o.phone}
                    </a>
                  </td>
                  <td>{new Date(o.createdAt).toLocaleString()}</td>
                  <td className="order-total">${o.total}</td>
                  <td>
                    <span className={`order-status ${o.status}`}>
                      {o.status}
                    </span>
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

          {/* MOBILE */}
          <div className="sales-mobile">
            {orders.map((o) => (
              <div key={o._id} className="sale-card">
                <div className="row">
                  <span>Email</span>
                  <span>{o.email}</span>
                </div>

                {o.phone && (
                  <div className="row">
                    <span>WhatsApp</span>
                    <span>{o.phone}</span>
                  </div>
                )}

                <div className="row">
                  <span>Fecha</span>
                  <span>{new Date(o.createdAt).toLocaleString()}</span>
                </div>

                <div className="row">
                  <span>Total</span>
                  <span>${o.total}</span>
                </div>

                <div className="row">
                  <span>Estado</span>
                  <span className={`order-status ${o.status}`}>{o.status}</span>
                </div>

                <button
                  className="sales-view-btn full"
                  onClick={() => navigate(`/admin/sales/${o._id}`)}
                >
                  Ver detalle
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

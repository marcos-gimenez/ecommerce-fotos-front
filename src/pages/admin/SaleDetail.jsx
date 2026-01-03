import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderDetail } from '../../api/orders';
import AdminPage from '../../components/AdminPage';
import '../../styles/adminSaleDetail.css';

export default function SaleDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getOrderDetail(id)
      .then(setOrder)
      .catch(err => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <AdminPage>
        <div className="sale-detail">{error}</div>
      </AdminPage>
    );
  }

  if (!order) {
    return (
      <AdminPage>
        <div className="sale-detail">Cargando venta…</div>
      </AdminPage>
    );
  }

  return (
    <AdminPage>
      <div className="sale-detail">
        <div className="sale-header">
          <h2>Detalle de venta</h2>
          <div className="sale-meta">
            {order.email} · ${order.total} ·
            <span className={`sale-status ${order.status}`}>
              {order.status}
            </span>
          </div>
        </div>

        <div className="sale-items">
          <h3>Archivos comprados</h3>

          <div className="sale-grid">
            {order.items.map(i => (
              <div key={i.id} className="sale-item">
                {i.type === 'image' ? (
                  <img src={i.preview} alt="" />
                ) : (
                  <video src={i.preview} />
                )}

                <div className="sale-item-body">
                  <div className="sale-price">${i.price}</div>
                  <div className="sale-folder">{i.folder}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminPage>
  );
}

const API_URL = import.meta.env.VITE_API_URL;

export async function getOrders() {
  const token = localStorage.getItem('adminToken');

  const res = await fetch(`${API_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Error cargando ventas');
  }

  return res.json();
}

export async function getOrderDetail(orderId) {
  const token = localStorage.getItem('adminToken');

  const res = await fetch(`${API_URL}/orders/${orderId}/admin`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Error cargando detalle');
  }

  return res.json();
}


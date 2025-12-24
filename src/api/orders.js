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

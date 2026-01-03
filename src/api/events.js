const API_URL = import.meta.env.VITE_API_URL;

export async function getEvents() {
  const res = await fetch(`${API_URL}/events`);
  if (!res.ok) throw new Error('Error cargando eventos');
  return res.json();
}

export async function deleteEvent(eventId) {
  const token = localStorage.getItem('adminToken');

  const res = await fetch(`${API_URL}/events/${eventId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Error eliminando evento');
  }

  return res.json();
}

const API_URL = import.meta.env.VITE_API_URL;

export async function uploadMedia(formData) {
  const res = await fetch(`${API_URL}/media`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Error subiendo media');
  }

  return res.json();
}

export async function getMediaByEvent(eventId) {
  const res = await fetch(`${API_URL}/media?event=${eventId}`);
  if (!res.ok) throw new Error('Error cargando media');
  return res.json();
}

export async function deleteMedia(id) {
  const res = await fetch(`${API_URL}/media/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Error borrando media');
  }

  return res.json();
}
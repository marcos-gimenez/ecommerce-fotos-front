const API_URL = import.meta.env.VITE_API_URL;

// ===============================
// SUBIR MEDIA (PROTEGIDO)
// ===============================
export async function uploadMedia(formData) {
  const token = localStorage.getItem('adminToken');

  const res = await fetch(`${API_URL}/media`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Error subiendo media');
  }

  return res.json();
}

// ===============================
// OBTENER MEDIA POR EVENTO (PÚBLICO)
// ===============================
export async function getMediaByEvent(eventId) {
  const res = await fetch(`${API_URL}/media?event=${eventId}`);
  if (!res.ok) throw new Error('Error cargando media');
  return res.json();
}

// ===============================
// BORRAR MEDIA (PROTEGIDO)
// ===============================
export async function deleteMedia(id) {
  const token = localStorage.getItem('adminToken');

  const res = await fetch(`${API_URL}/media/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Error borrando media');
  }

  return res.json();
}

// ===============================
// BORRAR CARPETA COMPLETA (PROTEGIDO)  ✅ NUEVO
// ===============================
export async function deleteFolder(eventId, folder) {
  const token = localStorage.getItem('adminToken');

  const res = await fetch(`${API_URL}/media/folder`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ eventId, folder }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Error eliminando carpeta');
  }

  return res.json();
}

export async function updateMedia(id, data) {
  const token = localStorage.getItem('adminToken');

  const res = await fetch(`${API_URL}/media/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Error editando media');
  }

  return res.json();
}


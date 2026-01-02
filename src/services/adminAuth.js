const API_URL = import.meta.env.VITE_API_URL;

export async function adminLogin(email, password) {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Error de login');
  }

  return res.json(); // { token }
}

export function adminLogout() {
  localStorage.removeItem('adminToken');
}
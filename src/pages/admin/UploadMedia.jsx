import { useEffect, useState } from 'react';
import { getEvents } from '../../api/events';
import { uploadMedia } from '../../api/media';

export default function UploadMedia() {
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState('');
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch(() => setMessage('Error cargando eventos'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!eventId || !file) {
      setMessage('Seleccioná evento y archivo');
      return;
    }

    const formData = new FormData();
    formData.append('event', eventId);
    formData.append('file', file);
    formData.append('price', price || 0);

    try {
      setLoading(true);
      await uploadMedia(formData);
      setMessage('✅ Archivo subido correctamente');
      setFile(null);
      setPrice('');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto' }}>
      <h2>Subir foto / video</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Evento</label>
          <select
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
          >
            <option value="">Seleccionar evento</option>
            {events.map((ev) => (
              <option key={ev._id} value={ev._id}>
                {ev.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Archivo</label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div>
          <label>Precio</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Subiendo...' : 'Subir'}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

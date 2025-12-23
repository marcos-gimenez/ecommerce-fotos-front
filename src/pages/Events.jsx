import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/events`)
      .then((res) => res.json())
      .then(setEvents);
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '40px auto' }}>
      <h1>Eventos</h1>

      <ul>
        {events.map((ev) => (
          <li key={ev._id}>
            <a href={`/event/${ev._id}`}>
              {ev.title} – {new Date(ev.date).toLocaleDateString()}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

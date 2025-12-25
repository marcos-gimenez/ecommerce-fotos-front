// import { useEffect, useState } from 'react';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Events() {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     fetch(`${API_URL}/events`)
//       .then((res) => res.json())
//       .then(setEvents);
//   }, []);

//   return (
//     <div style={{ maxWidth: 900, margin: '40px auto' }}>
//       <h1>Eventos</h1>

//       <ul>
//         {events.map((ev) => (
//           <li key={ev._id}>
//             <a href={`/event/${ev._id}`}>
//               {ev.title} – {new Date(ev.date).toLocaleDateString()}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/events.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/events`)
      .then((res) => res.json())
      .then(setEvents);
  }, []);

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Eventos</h1>

        <div className="event-grid">
          {events.map((ev) => (
            <Link
              key={ev._id}
              to={`/event/${ev._id}`}
              className="event-card"
            >
              {/* Placeholder visual por ahora */}
              <div className="event-image-placeholder">
                <span>{ev.title.charAt(0)}</span>
              </div>

              <div className="event-info">
                <h3>{ev.title}</h3>
                <p>{new Date(ev.date).toLocaleDateString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

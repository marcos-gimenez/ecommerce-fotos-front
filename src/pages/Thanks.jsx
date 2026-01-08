// import { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Thanks() {
//   const { orderId } = useParams();
//   const [data, setData] = useState(null);
//   const [status, setStatus] = useState('loading'); // loading | ok | pending | error

//   useEffect(() => {
//     fetch(`${API_URL}/orders/${orderId}/thanks`)
//       .then(async (res) => {
//         if (res.status === 403) {
//           setStatus('pending');
//           return;
//         }
//         if (!res.ok) {
//           throw new Error('Error');
//         }
//         const json = await res.json();
//         setData(json);
//         setStatus('ok');
//       })
//       .catch(() => setStatus('error'));
//   }, [orderId]);

//   if (status === 'loading') {
//     return <p style={{ textAlign: 'center', marginTop: 40 }}>Cargando...</p>;
//   }

//   if (status === 'pending') {
//     return (
//       <div style={{ maxWidth: 600, margin: '40px auto' }}>
//         <h2>Pago pendiente</h2>
//         <p>
//           Tu pago todavía no fue confirmado.  
//           Si ya pagaste, esperá unos segundos y recargá esta página.
//         </p>
//         <button onClick={() => window.location.reload()}>
//           Reintentar
//         </button>
//       </div>
//     );
//   }

//   if (status === 'error') {
//     return (
//       <div style={{ maxWidth: 600, margin: '40px auto' }}>
//         <h2>Error</h2>
//         <p>No pudimos obtener tu pedido.</p>
//         <Link to="/">Volver al inicio</Link>
//       </div>
//     );
//   }

//   // OK
//   return (
//     <div style={{ maxWidth: 800, margin: '40px auto' }}>
//       <h2>¡Gracias por tu compra!</h2>
//       <p>
//         Pedido <strong>{data.orderId}</strong>
//       </p>

//       <h3>Descargas</h3>

//       <ul>
//         {data.downloads.map((d) => (
//           <li key={d.id} style={{ marginBottom: 10 }}>
//             <a href={d.url} target="_blank" rel="noreferrer">
//               Descargar {d.type}
//             </a>
//           </li>
//         ))}
//       </ul>

//       <p style={{ marginTop: 20 }}>
//          Los links expiran. Guardá tus archivos.
//       </p>

//       <Link to="/">Volver al inicio</Link>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/thanks.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function Thanks() {
  const { orderId } = useParams();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ok | pending | error

  useEffect(() => {
    fetch(`${API_URL}/orders/${orderId}/thanks`)
      .then(async (res) => {
        if (res.status === 403) {
          setStatus("pending");
          return;
        }
        if (!res.ok) {
          throw new Error("Error");
        }
        const json = await res.json();
        setData(json);
        setStatus("ok");
      })
      .catch(() => setStatus("error"));
  }, [orderId]);

  if (status === "loading") {
    return (
      <div className="thanks-container">
        <p className="thanks-loading">Cargando tu pedido…</p>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="thanks-container">
        <h2 className="thanks-title">Pago pendiente</h2>

        <p className="thanks-text">
          Tu pago todavía no fue confirmado.
          <br />
          Si ya pagaste, esperá unos segundos y recargá esta página.
        </p>

        <button
          className="thanks-retry"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="thanks-container">
        <h2 className="thanks-title error">Ocurrió un error</h2>

        <p className="thanks-text">
          No pudimos obtener tu pedido.
        </p>

        <Link to="/" className="thanks-back">
          Volver al inicio
        </Link>
      </div>
    );
  }

  // ✅ OK
  return (
    <div className="thanks-container">
      <h2 className="thanks-title">¡Gracias por tu compra!</h2>

      <p className="thanks-order">
        Pedido <strong>{data.orderId}</strong>
      </p>

      {/* ✅ NUEVO MENSAJE */}
      <p className="thanks-text">
        También te enviamos estos links por <strong>mail</strong>.        
      </p> {/*falta agregar esto: y <strong> WhatsApp</strong>. */}

      <div className="thanks-note">
        <p>
          Los archivos se descargan <strong>sin marca de agua</strong> y en
          <strong> alta resolución</strong>.
        </p>
        <p className="thanks-warning">
          ⚠️ Los links expiran. Guardá tus archivos.
        </p>
      </div>

      <div className="thanks-downloads">
        <h3>Descargas</h3>

        <ul>
          {data.downloads.map((d) => (
            <li key={d.id}>
              <a
                href={d.url}
                target="_blank"
                rel="noreferrer"
                onContextMenu={(e) => e.preventDefault()} // 🚫 clic derecho
              >
                Descargar {d.type}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <Link to="/" className="thanks-back primary">
        Volver al inicio
      </Link>
    </div>
  );
}

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/eventDetail.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [media, setMedia] = useState([]);
  const { addItem, removeItem, cart } = useCart();

  useEffect(() => {
    fetch(`${API_URL}/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data.event);
        setMedia(data.media);
      });
  }, [id]);

  if (!event) return <p>Cargando...</p>;

  //   return (
  //   <div className="container">
  //     <h1 className="page-title">{event.title}</h1>
  //     <p className="event-date">
  //       {new Date(event.date).toLocaleDateString()}
  //     </p>

  //     {/* 🔜 acá irán las carpetas */}
  //     {/* <FolderFilter /> */}

  //     <div className="media-grid">
  //       {media.map((m) => {
  //         const inCart = cart.find((i) => i._id === m._id);

  //         return (
  //           <div
  //             key={m._id}
  //             className={`media-card ${inCart ? 'selected' : ''}`}
  //           >
  //             {m.resource_type === "image" ? (
  //               <img src={m.secure_url} alt="" />
  //             ) : (
  //               <video src={m.secure_url} />
  //             )}

  //             <div className="media-overlay">
  //               <span className="media-price">${m.price}</span>

  //               <button
  //                 onClick={() => addItem(m)}
  //                 disabled={inCart}
  //                 className="media-btn"
  //               >
  //                 {inCart ? "Agregado" : "Agregar"}
  //               </button>
  //             </div>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   </div>
  // );

  return (
    <div className="container">
      {/*  Volver */}
      <button className="back-btn" onClick={() => window.history.back()}>
        ← Volver
      </button>

      <h1 className="page-title">{event.title}</h1>
      <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>

      {/* <h2 className="section-title">Archivos en esta colección</h2> */}

      <div className="media-grid">
        {media.map((m) => {
          const inCart = cart.find((i) => i._id === m._id);

          return (
            <div
              key={m._id}
              className={`media-card ${inCart ? "selected" : ""}`}
              onContextMenu={(e) => e.preventDefault()} // 🚫 click derecho
            >
              {/* Imagen / video */}
              {m.resource_type === "image" ? (
                // <img
                //   src={m.preview_url}
                //   alt=""
                //   className="media-img watermark"
                // />
                <img
                  src={m.preview_url}
                  alt=""
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              ) : (
                <video src={m.secure_url} className="media-img" />
              )}

              {/* Overlay */}
              <div className="media-overlay">
                <span className="media-price">${m.price}</span>

                <button
                  className={`media-btn ${inCart ? "in-cart" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    inCart ? removeItem(m._id) : addItem(m);
                  }}
                >
                  {inCart ? "✓ En carrito" : "🛒 Añadir"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

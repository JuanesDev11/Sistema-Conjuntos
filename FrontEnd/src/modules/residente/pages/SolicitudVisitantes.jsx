import { useState, useEffect } from "react";

export default function SolicitudVisitantes() {
  const [visitantes, setVisitantes] = useState([]);

  // Agregar ruta
  useEffect(() => {
    fetch('', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setVisitantes(data);
      });
  }, []);

  const actualizarEstado = async (id, nuevoEstado) => {
    const res = await fetch('', { 
      method: "PATCH", //o put
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ estadoVisitante: nuevoEstado }),
    });

    if (!res.ok) throw new Error("Error al guardar en la bd");

    setVisitantes((prev) =>
      prev.map((visitante) =>
        visitante.id === id
          ? { ...visitante, estadoVisitante: nuevoEstado }
          : visitante
      )
    );
  };

  return (
    <div>
      {visitantes.length === 0 ? (
      <p className="text">No hay solicitudes de visitantes.</p>
      ) : (
      <ul className="text">
        {visitantes.map((visitante) => (
          <li key={visitante.id}>
            <div>
              <span>{visitante.nombreVisitante} </span>
              <span>{visitante.apellidoVisitante}</span>
            </div>
            <div>
              <button onClick={() => actualizarEstado(visitante.id, true)}>
                Aceptar
              </button>
              <button onClick={() => actualizarEstado(visitante.id, false)}>
                Rechazar
              </button>
            </div>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}
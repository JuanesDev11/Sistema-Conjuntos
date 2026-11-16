import { useState, useEffect } from "react";

export default function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const [usuarioId, setUsuarioId] = useState(null); // ID del usuario en sesión

  // Agregar rutas
  useEffect(() => {
    //ID del usuario 
    fetch('', { credentials: 'include' })
      .then(res => res.json())
      .then(user => setUsuarioId(user.id));

    // Reservas
    fetch('', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setReservas(data));
  }, []);

  const filtrarReservas = () => {
    return reservas.filter((reserva) => reserva.propietario_id === usuarioId);
  };

  const misReservas = filtrarReservas();

  return (
    <div>
      {misReservas.length === 0 ? (
        <p className="text">No tienes espacios reservados.</p>
      ) : (
        <ul className="text">
          {misReservas.map((reserva) => (
            <li key={reserva.id}>
              <div>
                <span>{reserva.nombre_espacio} - </span>
                <span>Día: {reserva.fecha} - </span>
                <span>Hora: {reserva.hora}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
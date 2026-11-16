import { useState, useEffect } from "react";

export default function ApartarEspacio() {
  const [espacios, setEspacios] = useState([]);
  const [espacioSeleccionado, setEspacioSeleccionado] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  //Agregar ruta
  useEffect(() => {
    fetch('', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setEspacios(data);
      });
  }, []);

  const guardarReserva = async () => {
    if (!espacioSeleccionado || !fecha || !hora) {
      alert("Por favor completa el espacio, la fecha y la hora.");
      return;
    }

    const res = await fetch('', { 
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        espacio_id: Number(espacioSeleccionado),
        fecha: fecha,
        hora: hora,
        estado: false, // ocupado
      }),
    });

    if (!res.ok) throw new Error("Error al guardar la reserva en la bd");

    setEspacios((prev) =>
      prev.map((espacio) =>
        espacio.id === Number(espacioSeleccionado)
          ? { ...espacio, disponible: false }
          : espacio
      )
    );
    setEspacioSeleccionado("");
    setFecha("");
    setHora("");
  };

  return (
    <div className="text">
      <div>
        <label htmlFor="espacio">Selecciona un espacio: </label>
        <select
          value={espacioSeleccionado}
          onChange={(e) => setEspacioSeleccionado(e.target.value)}
        >
          <option value="" disabled>
            Elige una opción
          </option>

          {espacios.map((espacio) => (
            <option
              key={espacio.id}
              value={espacio.id}
              disabled={espacio.disponible === false}
            >
              {espacio.nombre} {espacio.disponible === false ? "(Ocupado)" : ""}
            </option>
          ))}
        </select>
      </div>
      <div>
      <div>
        <label htmlFor="fecha">Día: </label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="hora">Hora: </label>
        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />
      </div>
      </div>

      <button onClick={guardarReserva}>
        Guardar
      </button>
    </div>
  );
}
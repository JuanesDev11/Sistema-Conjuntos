import { useState, useEffect } from "react";

export default function PersonasActivas() {
  const [users, setUsers] = useState([]);

  // Agregar ruta 
  useEffect(() => {
    fetch('', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setUsers(data);
      });
  }, []);

  const registrarSalida = async (id) => {
    const horaActual = new Date().toTimeString().split(" ")[0];

    // Agregar ruta antes del /${id}
    const res = await fetch(`/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ horaSalida: horaActual }),
    });

    if (!res.ok) throw new Error("Error al registrar la salida");

    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, horaSalida: horaActual } : user
      )
    );
  };

  const usersActivos = users.filter(
    (user) =>
      user.horaSalida === null &&
      (user.type === "trabajador" || user.estadoVisitante === true)
  );

  return (
    <div className="text">
      {usersActivos.length === 0 ? (
        <p>No hay personas externas en este momento.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Fecha</th>
              <th>Hora de Ingreso</th>
              <th>Destino</th>
              <th>Motivo de Ingreso</th>
              <th>Vehículo</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {usersActivos.map((user) => (
              <tr key={user.id}>
                <td>{user.type}</td>
                <td>{user.nombre}</td>
                <td>{user.apellido}</td>
                <td>{user.day}</td>
                <td>{user.horaIngreso}</td>
                <td>{user.destino}</td>
                <td>{user.motivoIngreso}</td>
                <td>{user.vehiculo === null ? "No aplica" : user.vehiculo}</td>
                <td>
                  <button onClick={() => registrarSalida(user.id)}>
                    Registrar salida
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
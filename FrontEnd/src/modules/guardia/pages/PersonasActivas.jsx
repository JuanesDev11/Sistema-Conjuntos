
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, UsersRound } from "lucide-react";

import Fondo from "../../../assets/images/Fondo.png";
import "./PersonasActivas.css";

export default function PersonasActivas() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const volver = () => {
    navigate(-1);
  };

  // Consultar personas registradas
  useEffect(() => {
    // Pendiente: agregar la URL del endpoint
    fetch("", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  // Registrar salida
  const registrarSalida = async (id) => {
    const horaActual = new Date().toTimeString().split(" ")[0];

    // Pendiente: agregar la URL antes de /${id}
    const res = await fetch(`/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ horaSalida: horaActual }),
    });

    if (!res.ok) {
      throw new Error("Error al registrar la salida");
    }

    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, horaSalida: horaActual }
          : user
      )
    );
  };

  // Filtrar personas que siguen dentro del edificio
  const usersActivos = users.filter(
    (user) =>
      user.horaSalida === null &&
      (user.type === "trabajador" || user.estadoVisitante === true)
  );

  return (
    <div className="personas-container">

      {/* Imagen lateral */}
      <div className="personas-imagen">
        <img src={Fondo} alt="Edificio Aurora" />
      </div>

      {/* Contenido principal */}
      <section className="personas-contenido">

        {/* Botón volver */}
        <button
          type="button"
          className="personas-volver"
          onClick={volver}
        >
          <ArrowLeft size={20} />
          <span>Volver</span>
        </button>

        {/* Encabezado */}
        <div className="personas-header">
          <UsersRound className="personas-icono" />

          <h1>Personas activas</h1>
          <h2>Panel del guardia</h2>

          <div className="personas-linea"></div>

          <p>
            Consulta los visitantes y trabajadores que
            se encuentran actualmente dentro del edificio Aurora.
          </p>
        </div>

        {/* Panel principal */}
        <div className="personas-panel">

          {usersActivos.length === 0 ? (
            <div className="personas-estado">
              <UsersRound className="personas-estado-icono" />

              <h3>No hay personas activas</h3>

              <p>
                No hay personas externas registradas
                dentro del edificio en este momento.
              </p>
            </div>
          ) : (
            <div className="personas-tabla-contenedor">
              <table className="personas-tabla">
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Fecha</th>
                    <th>Hora de ingreso</th>
                    <th>Destino</th>
                    <th>Motivo de ingreso</th>
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
                      <td>
                        {user.vehiculo === null
                          ? "No aplica"
                          : user.vehiculo}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="personas-salida"
                          onClick={() => registrarSalida(user.id)}
                        >
                          Registrar salida
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}

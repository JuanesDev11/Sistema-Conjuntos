
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ClipboardList,
  CalendarDays,
  Clock3,
  Building2,
  Inbox,
  AlertCircle
} from "lucide-react";

import Fondo from "../../../assets/images/Fondo.png";
import "./MisReservas.css";

// Agregar las rutas reales cuando esté listo el backend
const URL_USUARIO = "";
const URL_RESERVAS = "";

export default function MisReservas() {
  const navigate = useNavigate();

  const [reservas, setReservas] = useState([]);
  const [usuarioId, setUsuarioId] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Evitamos consultar rutas vacías
    if (!URL_USUARIO || !URL_RESERVAS) return;

    const controlador = new AbortController();

    const obtenerMisReservas = async () => {
      setCargando(true);
      setError("");

      try {
        // Consultar usuario en sesión
        const respuestaUsuario = await fetch(URL_USUARIO, {
          credentials: "include",
          signal: controlador.signal
        });

        if (!respuestaUsuario.ok) {
          throw new Error("No se pudo consultar el usuario");
        }

        const usuario = await respuestaUsuario.json();

        if (usuario.id == null) {
          throw new Error("No se encontró el ID del usuario");
        }

        // Consultar reservas
        const respuestaReservas = await fetch(URL_RESERVAS, {
          credentials: "include",
          signal: controlador.signal
        });

        if (!respuestaReservas.ok) {
          throw new Error("No se pudieron consultar las reservas");
        }

        const datosReservas = await respuestaReservas.json();

        if (!Array.isArray(datosReservas)) {
          throw new Error("Formato de reservas incorrecto");
        }

        if (!controlador.signal.aborted) {
          setUsuarioId(usuario.id);
          setReservas(datosReservas);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("No fue posible cargar tus reservas.");
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    };

    obtenerMisReservas();

    return () => controlador.abort();
  }, []);

  // Filtrar reservas del usuario actual
  const misReservas = reservas.filter(
    (reserva) =>
      String(reserva.propietario_id) === String(usuarioId) &&
      usuarioId !== null
  );

  const backendConfigurado = Boolean(
    URL_USUARIO && URL_RESERVAS
  );

  return (
    <div className="misreservas-container">

      {/* Imagen lateral */}
      <div className="misreservas-imagen">
        <img src={Fondo} alt="Edificio Aurora" />
      </div>

      {/* Contenido principal */}
      <section className="misreservas-contenido">

        {/* Botón volver */}
        <button
          type="button"
          className="misreservas-volver"
          onClick={() => navigate("/residente/Reservas")}
        >
          <ArrowLeft size={20} />
          Volver
        </button>

        {/* Encabezado */}
        <div className="misreservas-header">
          <ClipboardList className="misreservas-icono" />

          <h1>Mis reservas</h1>
          <h2>Panel del residente</h2>

          <div className="misreservas-linea"></div>

          <p>
            Consulta los espacios comunes que has
            reservado en el edificio Aurora.
          </p>
        </div>

        {/* Panel de reservas */}
        <div className="misreservas-panel">

          {error ? (
            <div className="misreservas-estado">
              <AlertCircle className="misreservas-estado-icono" />
              <p>{error}</p>
            </div>
          ) : cargando ? (
            <div className="misreservas-estado">
              <p>Cargando tus reservas...</p>
            </div>
          ) : !backendConfigurado ? (
            <div className="misreservas-estado">
              <Inbox className="misreservas-estado-icono" />
              <h3>Mis reservas</h3>
              <p>
                La consulta de reservas estará disponible
                cuando conectemos el backend.
              </p>
            </div>
          ) : misReservas.length === 0 ? (
            <div className="misreservas-estado">
              <Inbox className="misreservas-estado-icono" />
              <h3>No tienes espacios reservados</h3>
              <p>
                Cuando realices una reserva,
                podrás consultar sus detalles aquí.
              </p>
            </div>
          ) : (
            <div className="misreservas-lista">
              {misReservas.map((reserva) => (
                <article
                  className="misreservas-tarjeta"
                  key={reserva.id}
                >
                  <div className="misreservas-tarjeta-titulo">
                    <Building2 size={26} />

                    <h3>
                      {reserva.nombre_espacio}
                    </h3>
                  </div>

                  <div className="misreservas-detalles">
                    <div className="misreservas-detalle">
                      <CalendarDays size={20} />

                      <div>
                        <span>Fecha</span>
                        <strong>{reserva.fecha}</strong>
                      </div>
                    </div>

                    <div className="misreservas-detalle">
                      <Clock3 size={20} />

                      <div>
                        <span>Hora</span>
                        <strong>{reserva.hora}</strong>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
}


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  UsersRound,
  Inbox,
  UserRound,
  Check,
  X
} from "lucide-react";

import Fondo from "../../../assets/images/Fondo.png";
import "./SolicitudVisitantes.css";

// Configurar cuando estén disponibles los endpoints
const URL_SOLICITUDES = "";
const URL_ACTUALIZAR = "";

export default function SolicitudVisitantes() {
  const navigate = useNavigate();

  const [visitantes, setVisitantes] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [procesandoId, setProcesandoId] = useState(null);

  // Consultar solicitudes pendientes
  useEffect(() => {
    if (!URL_SOLICITUDES) return;

    const controlador = new AbortController();

    const obtenerSolicitudes = async () => {
      setCargando(true);
      setError("");

      try {
        const res = await fetch(URL_SOLICITUDES, {
          credentials: "include",
          signal: controlador.signal
        });

        if (!res.ok) {
          throw new Error("Error al consultar las solicitudes");
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Formato de solicitudes incorrecto");
        }

        if (!controlador.signal.aborted) {
          setVisitantes(data);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setError("No se pudieron cargar las solicitudes.");
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    };

    obtenerSolicitudes();

    return () => controlador.abort();
  }, []);

  // Aceptar o rechazar una solicitud
  const actualizarEstado = async (id, nuevoEstado) => {
    if (!URL_ACTUALIZAR) {
      setError(
        "La actualización de solicitudes aún no está conectada al servidor."
      );
      return;
    }

    setProcesandoId(id);
    setError("");

    try {
      // Ajustar la URL según la ruta que defina el backend
      const res = await fetch(`${URL_ACTUALIZAR}/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          estadoVisitante: nuevoEstado
        })
      });

      if (!res.ok) {
        throw new Error("Error al guardar en la base de datos");
      }

      // Quitar la solicitud de la lista de pendientes
      setVisitantes((prev) =>
        prev.filter((visitante) => visitante.id !== id)
      );
    } catch (error) {
      setError("No se pudo actualizar la solicitud. Intenta nuevamente.");
    } finally {
      setProcesandoId(null);
    }
  };

  return (
    <div className="solicitudes-container">

      {/* Imagen lateral */}
      <div className="solicitudes-imagen">
        <img src={Fondo} alt="Edificio Aurora" />
      </div>

      <section className="solicitudes-contenido">

        {/* Botón volver */}
        <button
          type="button"
          className="solicitudes-volver"
          onClick={() => navigate("/residente")}
        >
          <ArrowLeft size={20} />
          Volver
        </button>

        {/* Encabezado */}
        <div className="solicitudes-header">
          <UsersRound className="solicitudes-icono" />

          <h1>Solicitudes de visitas</h1>
          <h2>Panel del residente</h2>

          <div className="solicitudes-linea"></div>

          <p>
            Administra las solicitudes de ingreso
            de tus visitantes.
          </p>
        </div>

        {/* Lista de solicitudes */}
        <div className="solicitudes-panel">

          {error && (
            <p className="solicitudes-error" role="alert">
              {error}
            </p>
          )}

          {cargando ? (
            <p className="solicitudes-cargando">
              Cargando solicitudes...
            </p>
          ) : visitantes.length === 0 ? (

            <div className="solicitudes-vacio">
              <Inbox className="solicitudes-vacio-icono" />

              <h3>No hay solicitudes de visitantes</h3>

              <p>
                Cuando recibas una solicitud de visita,
                aparecerá aquí para que puedas
                aceptarla o rechazarla.
              </p>
            </div>

          ) : (

            <div className="solicitudes-lista">
              {visitantes.map((visitante) => (
                <div
                  className="solicitud-tarjeta"
                  key={visitante.id}
                >
                  <div className="solicitud-persona">
                    <UserRound className="solicitud-persona-icono" />

                    <div>
                      <h3>
                        {visitante.nombreVisitante}{" "}
                        {visitante.apellidoVisitante}
                      </h3>
                      <p>Solicitud pendiente</p>
                    </div>
                  </div>

                  <div className="solicitud-acciones">
                    <button
                      type="button"
                      className="solicitud-aceptar"
                      disabled={procesandoId !== null}
                      onClick={() =>
                        actualizarEstado(visitante.id, true)
                      }
                    >
                      <Check size={20} />
                      Aceptar
                    </button>

                    <button
                      type="button"
                      className="solicitud-rechazar"
                      disabled={procesandoId !== null}
                      onClick={() =>
                        actualizarEstado(visitante.id, false)
                      }
                    >
                      <X size={20} />
                      Rechazar
                    </button>
                  </div>
                </div>
              ))}
            </div>

          )}

        </div>
      </section>
    </div>
  );
}

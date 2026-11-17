
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarPlus,
  Building2,
  CalendarDays,
  Clock3,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

import Fondo from "../../../assets/images/Fondo.png";
import "./ApartarEspacio.css";

// Agregar las rutas reales cuando esté listo el backend
const URL_ESPACIOS = "";
const URL_RESERVAS = "";

export default function ApartarEspacio() {
  const navigate = useNavigate();

  const [espacios, setEspacios] = useState([]);
  const [espacioSeleccionado, setEspacioSeleccionado] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const [cargando, setCargando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [popup, setPopup] = useState(null);

  // Consultar los espacios del edificio
  useEffect(() => {
    if (!URL_ESPACIOS) return;

    const controlador = new AbortController();

    const obtenerEspacios = async () => {
      setCargando(true);

      try {
        const res = await fetch(URL_ESPACIOS, {
          credentials: "include",
          signal: controlador.signal
        });

        if (!res.ok) {
          throw new Error("No se pudieron obtener los espacios");
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Formato de espacios incorrecto");
        }

        if (!controlador.signal.aborted) {
          setEspacios(data);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setPopup({
            tipo: "error",
            titulo: "Error de conexión",
            mensaje: "No se pudieron cargar los espacios disponibles."
          });
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    };

    obtenerEspacios();

    return () => controlador.abort();
  }, []);

  // Guardar una reserva
  const guardarReserva = async (e) => {
    e.preventDefault();

    if (!espacioSeleccionado || !fecha || !hora) {
      setPopup({
        tipo: "error",
        titulo: "¡Campos incompletos!",
        mensaje: "Selecciona un espacio, una fecha y una hora."
      });
      return;
    }

    const espacio = espacios.find(
      (item) => item.id === Number(espacioSeleccionado)
    );

    if (!espacio || espacio.disponible === false) {
      setPopup({
        tipo: "error",
        titulo: "Espacio no disponible",
        mensaje: "Selecciona un espacio que esté disponible."
      });
      return;
    }

    if (!URL_RESERVAS) {
      setPopup({
        tipo: "error",
        titulo: "Conexión pendiente",
        mensaje: "El servicio de reservas aún no está conectado al backend."
      });
      return;
    }

    setGuardando(true);

    try {
      const res = await fetch(URL_RESERVAS, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          espacio_id: Number(espacioSeleccionado),
          fecha: fecha,
          hora: hora,
          estado: false
        })
      });

      if (!res.ok) {
        throw new Error("Error al guardar la reserva");
      }

      // Conservamos la actualización local de disponibilidad
      setEspacios((prev) =>
        prev.map((item) =>
          item.id === Number(espacioSeleccionado)
            ? { ...item, disponible: false }
            : item
        )
      );

      setEspacioSeleccionado("");
      setFecha("");
      setHora("");

      setPopup({
        tipo: "exito",
        titulo: "¡Reserva registrada!",
        mensaje: "Tu reserva se guardó correctamente."
      });
    } catch (error) {
      setPopup({
        tipo: "error",
        titulo: "No se pudo guardar",
        mensaje: "Ocurrió un error al registrar la reserva."
      });
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="apartar-container">

      {/* Imagen lateral */}
      <div className="apartar-imagen">
        <img src={Fondo} alt="Edificio Aurora" />
      </div>

      <section className="apartar-contenido">

        {/* Botón volver */}
        <button
          type="button"
          className="apartar-volver"
          onClick={() => navigate("/residente/Reservas")}
        >
          <ArrowLeft size={20} />
          Volver
        </button>

        {/* Encabezado */}
        <div className="apartar-header">
          <CalendarPlus className="apartar-icono" />

          <h1>Apartar espacio</h1>
          <h2>Reserva de espacios comunes</h2>

          <div className="apartar-linea"></div>

          <p>
            Selecciona el espacio que deseas reservar
            y elige la fecha y la hora.
          </p>
        </div>

        {/* Formulario */}
        <form
          className="apartar-formulario"
          onSubmit={guardarReserva}
          noValidate
        >
          <div className="apartar-campo">
            <label htmlFor="espacio">Espacio común</label>

            <div className="apartar-input">
              <Building2 className="apartar-input-icono" />

              <select
                id="espacio"
                value={espacioSeleccionado}
                onChange={(e) =>
                  setEspacioSeleccionado(e.target.value)
                }
                disabled={cargando || guardando}
              >
                <option value="">
                  {cargando
                    ? "Cargando espacios..."
                    : "Selecciona un espacio"}
                </option>

                {espacios.map((espacio) => (
                  <option
                    key={espacio.id}
                    value={espacio.id}
                    disabled={espacio.disponible === false}
                  >
                    {espacio.nombre}
                    {espacio.disponible === false
                      ? " (Ocupado)"
                      : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="apartar-campo">
            <label htmlFor="fecha">Fecha de reserva</label>

            <div className="apartar-input">
              <CalendarDays className="apartar-input-icono" />

              <input
                id="fecha"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                disabled={guardando}
              />
            </div>
          </div>

          <div className="apartar-campo">
            <label htmlFor="hora">Hora de reserva</label>

            <div className="apartar-input">
              <Clock3 className="apartar-input-icono" />

              <input
                id="hora"
                type="time"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                disabled={guardando}
              />
            </div>
          </div>

          <button
            type="submit"
            className="apartar-guardar"
            disabled={guardando || cargando}
          >
            <CalendarPlus size={21} />
            {guardando ? "Guardando..." : "Guardar reserva"}
          </button>
        </form>
      </section>

      {/* Ventana emergente */}
      {popup && (
        <div className="apartar-popup-overlay">
          <div
            className="apartar-popup"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="apartar-popup-titulo"
            aria-describedby="apartar-popup-mensaje"
          >
            {popup.tipo === "exito" ? (
              <CheckCircle2 className="apartar-popup-exito" />
            ) : (
              <AlertCircle className="apartar-popup-error-icono" />
            )}

            <h2 id="apartar-popup-titulo">
              {popup.titulo}
            </h2>

            <p id="apartar-popup-mensaje">
              {popup.mensaje}
            </p>

            <button
              type="button"
              onClick={() => setPopup(null)}
            >
              Entendido
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

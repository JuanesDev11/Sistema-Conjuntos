import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  UserRound,
  Building2,
  House
} from "lucide-react";

import Fondo from "../../../assets/images/Fondo.png";
import "./InfoPersonalRes.css";

export default function InfoPersonalRes() {
  const navigate = useNavigate();

  const [nombreResidente, setNombreResidente] = useState("");
  const [apellidoResidente, setApellidoResidente] = useState("");
  const [torre, setTorre] = useState("");
  const [apt, setApt] = useState("");

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controlador = new AbortController();

    const obtenerInformacion = async () => {
      try {
        // Pendiente: colocar la URL real del backend.
        const response = await fetch("", {
          credentials: "include",
          signal: controlador.signal
        });

        if (!response.ok) {
          throw new Error("No se pudo obtener la información");
        }

        const data = await response.json();

        if (controlador.signal.aborted) return;

        setNombreResidente(data.nombre ?? "");
        setApellidoResidente(data.apellido ?? "");
        setTorre(data.torre ?? "");
        setApt(data.apt ?? "");

      } catch (error) {
        if (error.name !== "AbortError") {
          setError("No se pudo cargar la información del residente.");
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    };

    obtenerInformacion();

    return () => controlador.abort();
  }, []);

  return (
    <div className="info-residente-container">

      {/* Imagen lateral */}
      <div className="info-residente-imagen">
        <img src={Fondo} alt="Edificio Aurora" />
      </div>

      {/* Contenido */}
      <section className="info-residente-contenido">

        <button
          type="button"
          className="info-residente-volver"
          onClick={() => navigate("/residente")}
        >
          <ArrowLeft size={20} />
          Volver
        </button>

        <div className="info-residente-header">
          <UserRound className="info-residente-icono" />

          <h1>Información personal</h1>
          <h2>Datos del residente</h2>

          <div className="info-residente-linea"></div>
        </div>

        <div className="info-residente-tarjeta">

          {cargando ? (
            <p className="info-residente-estado">
              Cargando información...
            </p>
          ) : error ? (
            <p className="info-residente-error" role="alert">
              {error}
            </p>
          ) : (
            <>
              <div className="info-residente-campo">
                <label>Nombre</label>
                <div className="info-residente-valor">
                  <UserRound size={20} />
                  <span>{nombreResidente || "No disponible"}</span>
                </div>
              </div>

              <div className="info-residente-campo">
                <label>Apellido</label>
                <div className="info-residente-valor">
                  <UserRound size={20} />
                  <span>{apellidoResidente || "No disponible"}</span>
                </div>
              </div>

              <div className="info-residente-campo">
                <label>Torre</label>
                <div className="info-residente-valor">
                  <Building2 size={20} />
                  <span>{torre || "No disponible"}</span>
                </div>
              </div>

              <div className="info-residente-campo">
                <label>Apartamento</label>
                <div className="info-residente-valor">
                  <House size={20} />
                  <span>{apt || "No disponible"}</span>
                </div>
              </div>
            </>
          )}

        </div>
      </section>
    </div>
  );
}

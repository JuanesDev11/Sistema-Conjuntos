
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays } from "lucide-react";

import Buttons from "../../../components/Buttons.jsx";
import { BOTONES_RESERVAS } from "../data/Botones.js";
import Fondo from "../../../assets/images/Fondo.png";

import "./ReservasRes.css";

export default function ReservasRes() {
  const navigate = useNavigate();

  return (
    <div className="reservas-container">

      {/* Imagen lateral del edificio */}
      <div className="reservas-imagen">
        <img src={Fondo} alt="Edificio Aurora" />
      </div>

      {/* Contenido principal */}
      <section className="reservas-contenido">

        {/* Botón volver */}
        <button
          type="button"
          className="reservas-volver"
          onClick={() => navigate("/residente")}
        >
          <ArrowLeft size={20} />
          Volver
        </button>

        {/* Encabezado */}
        <div className="reservas-header">
          <CalendarDays className="reservas-icono" />

          <h1>Reservas</h1>
          <h2>Panel del residente</h2>

          <div className="reservas-linea"></div>

          <p>
            Organiza tus actividades y administra
            las reservas de los espacios de Aurora.
          </p>
        </div>

        {/* Botones reutilizables */}
        <div className="reservas-botones">
          <Buttons botones={BOTONES_RESERVAS} />
        </div>

      </section>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Buttons from "../../../components/Buttons.jsx";
import { BOTONES_REGISTRO } from "../data/Botones.js";
import Fondo from "../../../assets/images/Fondo.png";

import "./Registrar.css";

export default function Registrar() {
  const navigate = useNavigate();

  const volver = () => {
    navigate(-1);
  };

  return (
    <div className="registro-container">

    <div className="registro-imagen">
        <img src={Fondo} alt="Edificio Aurora" />
    </div>

    <section className="registro-contenido">

        {/* Botón volver */}
        <button
            type="button"
            className="registro-volver"
            onClick={volver}
        >
            <ArrowLeft size={20} />
            <span>Volver</span>
        </button>

        {/* Encabezado */}
        <div className="registro-header">
          <ShieldCheck className="registro-icono" />

          <h1>Registro de ingreso</h1>
          <h2>Panel del guardia</h2>

          <div className="registro-linea"></div>

          <p>
            Selecciona el tipo de persona que deseas
            registrar para ingresar al edificio Aurora.
          </p>
        </div>

        <div className="registro-botones">
          <Buttons botones={BOTONES_REGISTRO} />
        </div>

      </section>
    </div>
  );
}


import { useNavigate } from "react-router-dom";
import { ArrowLeft, UserRoundPlus } from "lucide-react";

import FormularioIngreso from "../components/FormularioIngreso";
import Fondo from "../../../assets/images/Fondo.png";

import "./ReVisitante.css";

export default function ReVisitante() {
  const navigate = useNavigate();

  const volver = () => {
    navigate(-1);
  };

  return (
    <div className="revisitante-container">

      {/* Imagen lateral */}
      <div className="revisitante-imagen">
        <img src={Fondo} alt="Edificio Aurora" />
      </div>

      {/* Contenido principal */}
      <section className="revisitante-contenido">

        <button
          type="button"
          className="revisitante-volver"
          onClick={volver}
        >
          <ArrowLeft size={20} />
          <span>Volver</span>
        </button>

        {/* Encabezado */}
        <div className="revisitante-header">
          <UserRoundPlus className="revisitante-icono" />

          <h1>Registro de visitante</h1>
          <h2>Panel del guardia</h2>

          <div className="revisitante-linea"></div>

          <p>
            Completa los datos del visitante para
            solicitar su ingreso al edificio Aurora.
          </p>
        </div>

        {/* Formulario reutilizable */}
        <div className="revisitante-formulario">
          <FormularioIngreso type="visitante" />
        </div>

      </section>
    </div>
  );
}

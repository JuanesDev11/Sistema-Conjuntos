
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BriefcaseBusiness } from "lucide-react";

import FormularioIngreso from "../components/FormularioIngreso";
import Fondo from "../../../assets/images/Fondo.png";

import "./ReTrabajador.css";

export default function ReTrabajador() {
  const navigate = useNavigate();

  const volver = () => {
    navigate(-1);
  };

  return (
    <div className="retrabajador-container">

      {/* Imagen lateral */}
      <div className="retrabajador-imagen">
        <img src={Fondo} alt="Edificio Aurora" />
      </div>

      {/* Contenido principal */}
      <section className="retrabajador-contenido">

        {/* Botón volver */}
        <button
          type="button"
          className="retrabajador-volver"
          onClick={volver}
        >
          <ArrowLeft size={20} />
          <span>Volver</span>
        </button>

        {/* Encabezado */}
        <div className="retrabajador-header">
          <BriefcaseBusiness className="retrabajador-icono" />

          <h1>Registro de trabajador</h1>
          <h2>Panel del guardia</h2>

          <div className="retrabajador-linea"></div>

          <p>
            Completa los datos del trabajador para
            registrar su ingreso al edificio Aurora.
          </p>
        </div>

        {/* Formulario reutilizable */}
        <div className="retrabajador-formulario">
          <FormularioIngreso type="trabajador" />
        </div>

      </section>
    </div>
  );
}

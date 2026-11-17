
import { useNavigate } from "react-router-dom";
import { ShieldCheck, LogOut } from "lucide-react";

import Buttons from "../../../components/Buttons.jsx";
import { BOTONES } from "../data/Botones.js";
import Fondo from "../../../assets/images/Fondo.png";

import "./InicioGuar.css";

export default function InicioGuar() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className="guardia-container">

      {/* Imagen lateral */}
      <div className="guardia-imagen">
        <img src={Fondo} alt="Edificio Aurora" />
      </div>

      {/* Contenido principal */}
      <section className="guardia-contenido">

        {/* Cerrar sesión */}
        <button
          type="button"
          className="guardia-cerrar-sesion"
          onClick={cerrarSesion}
        >
          <LogOut size={20} />
          <span>Cerrar sesión</span>
        </button>

        {/* Encabezado */}
        <div className="guardia-header">

          <ShieldCheck className="guardia-icono" />

          <h1>Bienvenido a Aurora</h1>

          <h2>Panel del guardia</h2>

          <div className="guardia-linea"></div>

          <p>
            Administra el ingreso de visitantes,
            trabajadores y consulta las personas
            que se encuentran en el edificio.
          </p>

        </div>

        {/* Botones */}
        <div className="guardia-botones">
          <Buttons botones={BOTONES} />
        </div>

      </section>
    </div>
  );
}

import { Link } from "react-router-dom";
import "./Inicio.css";
import { LogIn } from "lucide-react";

import Fondo from "../../assets/images/Fondo.png";

function Inicio() {
  return (
    <div className="inicio-container">

      <div className="inicio-imagen">
        <img src={Fondo} alt="Edificio Aurora" />
      </div>

      <section className="inicio-contenido">
        <div className="inicio-header">
          <h1>Hola, bienvenido/a al edificio</h1>
          <h2>AURORA</h2>
          <div className="inicio-linea"></div>
        </div>

        <div className="inicio-botones">
  <Link to="/login" className="boton-rol">
    <LogIn className="icono-login" />
    <span>Iniciar sesión</span>
  </Link>
</div>
      </section>

    </div>
  );
}

export default Inicio;
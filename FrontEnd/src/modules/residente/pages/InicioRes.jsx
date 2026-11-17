import Buttons from '../../../components/Buttons.jsx';
import { BOTONES } from '../data/Botones.js';
import Fondo from '../../../assets/images/Fondo.png';
import './InicioRes.css';
import { useNavigate } from "react-router-dom";
import { House, LogOut } from "lucide-react";

export default function InicioRes() {

  const navigate = useNavigate();

const cerrarSesion = () => {
  navigate("/login", { replace: true });
};
  return (
    <div className="residente-container">

      {/* Imagen lateral del edificio */}
      <div className="residente-imagen">
        <img src={Fondo} alt="Edificio Aurora" />
      </div>

      {/* Contenido del residente */}
      <section className="residente-contenido">
<button
  type="button"
  className="residente-cerrar-sesion"
  onClick={cerrarSesion}
>
  <LogOut size={20} />
  <span>Cerrar sesión</span>
</button>
        <div className="residente-header">
          <House className="residente-icono" />

          <h1>Bienvenido a Aurora</h1>
          <h2>Panel del residente</h2>

          <div className="residente-linea"></div>

          <p>
            Gestiona tu información, visitantes y reservas
            desde un solo lugar.
          </p>
        </div>

        <div className="residente-botones">
          <Buttons botones={BOTONES} />
        </div>

      </section>

    </div>
  );
}

import { useLocation, useNavigate } from "react-router-dom";
import "./Buttons.css";

function Buttons({ botones }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="botones-contenedor">
      {botones.map((boton) => {
        const Icono = boton.icono;

        return (
          <div className="botones-item" key={boton.id}>
            <button
              type="button"
              className="boton-aurora"
              onClick={() =>
                navigate(`${location.pathname}/${boton.ruta}`)
              }
            >
              {Icono && <Icono className="boton-aurora-icono" />}

              <span>{boton.info}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Buttons;

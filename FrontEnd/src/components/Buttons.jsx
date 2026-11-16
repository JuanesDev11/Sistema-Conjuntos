import { useLocation, useNavigate } from 'react-router-dom';

function Buttons({ botones }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
        {botones.map((boton)=>(
            <div key={boton.id}>
                <button
                onClick={()=>navigate(`${location.pathname}/${boton.ruta}`)}
                >
                    {boton.info}
                </button>
            </div>
        ))}
    </div>
  );
}
export default Buttons;
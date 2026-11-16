import { useLocation, useNavigate } from 'react-router-dom';
import { LogIn, Undo2 } from 'lucide-react';


export default function Header() {
  const pagina = useLocation();
  const ruta = useNavigate();
  const titulos = {
    '/': 'Login',
    '/residente': 'Propietario',
  };
  const tituloActual = titulos[pagina.pathname];
  const salir = pagina.pathname.length == 1;
  const rutaResidente = pagina.pathname.startsWith('/residente/') && pagina.pathname !== '/residente';

  return (
    <header className="text">
      {rutaResidente?(
        <Undo2 
        onClick={()=>ruta(-1)}/>
      ):(
        <h1>{tituloActual}</h1>
      )}
      {!salir&&(
        <LogIn
        onClick={()=>ruta('/')}/>
      )}
    </header>
  );
}
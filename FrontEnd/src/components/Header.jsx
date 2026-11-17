import { useLocation, useNavigate } from 'react-router-dom';
import { LogIn, Undo2 } from 'lucide-react';


export default function Header() {
  const pagina = useLocation();
  const ruta = useNavigate();
  const titulos = {
    '/': 'Login',
    '/residente': 'Propietario',
    '/guardia': 'Administración de Personas',
  };
  const tituloActual = titulos[pagina.pathname];
  const salir = pagina.pathname.length == 1;
  const rutaResidente = pagina.pathname.startsWith('/residente/') && pagina.pathname !== '/residente';
  const rutaGuardia = pagina.pathname.startsWith('/guardia/') && pagina.pathname !== '/guardia';

  return (
    <header className="text">
      {rutaResidente || rutaGuardia?(
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
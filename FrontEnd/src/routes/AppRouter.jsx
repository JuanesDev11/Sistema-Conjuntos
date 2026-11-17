import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Login from '../modules/login.jsx';
import Inicio from '../modules/residente/pages/InicioRes.jsx';
import InfoPersonalRes from '../modules/residente/pages/InfoPersonalRes.jsx';
import ReservasRes from '../modules/residente/pages/ReservasRes.jsx';
import SolicitudVisitantes from '../modules/residente/pages/SolicitudVisitantes.jsx';
import ApartarEspacio from '../modules/residente/pages/ApartarEspacio.jsx';
import MisReservas from '../modules/residente/pages/MisReservas.jsx';
import InicioGuar from '../modules/guardia/pages/InicioGuar.jsx';
import PersonasActivas from '../modules/guardia/pages/PersonasActivas.jsx';
import Registrar from '../modules/guardia/pages/Registrar.jsx';
import ReTrabajador from '../modules/guardia/pages/reTrabajador.jsx';
import ReVisitante from '../modules/guardia/pages/reVisitante.jsx';
import RutaRestringida from "../components/rutaRestringida";

export default function AppRouter() {
  //Ingresar las rutas del back y luego descomentar lo de ruta restringida
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Login />} />
          {/*Residente*/}
          <Route path="/residente" element=
          {
            <RutaRestringida 
            pagina={<Inicio />}
            ruta={""} />
          } />
          <Route path="/residente/Info" element=
          {
            <RutaRestringida
            pagina={<InfoPersonalRes />}
            ruta={""} />
          }
          />
          <Route path="/residente/SolicitudVisitantes" element=
          {
            <RutaRestringida
            pagina={<SolicitudVisitantes />}
            ruta={""} />
          }
          />
          <Route path="/residente/Reservas" element=
          {
            <RutaRestringida
            pagina={<ReservasRes />}
            ruta={""} />
          }
          />
          <Route path="/residente/Reservas/Apartar" element=
          {
            <RutaRestringida
            pagina={<ApartarEspacio />}
            ruta={""} />
          }
          />
          <Route path="/residente/Reservas/MisReservas" element=
          {
            <RutaRestringida
            pagina={<MisReservas />}
            ruta={""} />
          }
          />

          {/*Guardia*/}
          <Route path="/guardia" element=
          {
            <RutaRestringida 
            pagina={<InicioGuar />}
            ruta={""} />
          } />
          <Route path="/guardia/PersonaActivas" element=
          {
            <RutaRestringida 
            pagina={<PersonasActivas />}
            ruta={""} />
          } />
          <Route path="/guardia/Registrar" element=
          {
            <RutaRestringida 
            pagina={<Registrar />}
            ruta={""} />
          } />
          <Route path="/guardia/Registrar/RegTrabajador" element=
          {
            <RutaRestringida 
            pagina={<ReTrabajador />}
            ruta={""} />
          } />
          <Route path="/guardia/Registrar/RegVisitante" element=
          {
            <RutaRestringida 
            pagina={<ReVisitante />}
            ruta={""} />
          } />
          <Route path="*" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
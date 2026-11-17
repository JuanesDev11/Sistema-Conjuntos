import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Login from '../modules/login.jsx';
import InicioRes from '../modules/residente/pages/InicioRes.jsx';
import InfoPersonalRes from '../modules/residente/pages/InfoPersonalRes.jsx';
import ReservasRes from '../modules/residente/pages/ReservasRes.jsx';
import SolicitudVisitantes from '../modules/residente/pages/SolicitudVisitantes.jsx';
import ApartarEspacio from '../modules/residente/pages/ApartarEspacio.jsx';
import MisReservas from '../modules/residente/pages/MisReservas.jsx';
import InicioGuar from '../modules/guardia/pages/InicioGuar.jsx';
import PersonasActivas from '../modules/guardia/pages/PersonasActivas.jsx';
import Registrar from '../modules/guardia/pages/Registrar.jsx';
import ReTrabajador from '../modules/guardia/pages/ReTrabajador.jsx';
import ReVisitante from '../modules/guardia/pages/ReVisitante.jsx';
import RutaRestringida from "../components/rutaRestringida";
import Inicio from "../modules/inicio/Inicio.jsx";

export default function AppRouter() {
  //Ingresar las rutas del back y luego descomentar lo de ruta restringida
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          {/*Residente*/}
          <Route
            path="/residente"
            element={<RutaRestringida pagina={<InicioRes />} ruta={""} />}
          />
          <Route
            path="/residente/Info"
            element={<RutaRestringida pagina={<InfoPersonalRes />} ruta={""} />}
          />
          <Route
            path="/residente/SolicitudVisitantes"
            element={
              <RutaRestringida pagina={<SolicitudVisitantes />} ruta={""} />
            }
          />
          <Route
            path="/residente/Reservas"
            element={<RutaRestringida pagina={<ReservasRes />} ruta={""} />}
          />
          <Route
            path="/residente/Reservas/Apartar"
            element={<RutaRestringida pagina={<ApartarEspacio />} ruta={""} />}
          />
          <Route
            path="/residente/Reservas/MisReservas"
            element={<RutaRestringida pagina={<MisReservas />} ruta={""} />}
          />

          {/*Guardia*/}
          <Route
            path="/guardia"
            element={<RutaRestringida pagina={<InicioGuar />} ruta={""} />}
          />
          <Route
            path="/guardia/PersonaActivas"
            element={<RutaRestringida pagina={<PersonasActivas />} ruta={""} />}
          />
          <Route
            path="/guardia/Registrar"
            element={<RutaRestringida pagina={<Registrar />} ruta={""} />}
          />
          <Route
            path="/guardia/Registrar/RegTrabajador"
            element={<RutaRestringida pagina={<ReTrabajador />} ruta={""} />}
          />
          <Route
            path="/guardia/Registrar/RegVisitante"
            element={<RutaRestringida pagina={<ReVisitante />} ruta={""} />}
          />
          <Route path="*" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

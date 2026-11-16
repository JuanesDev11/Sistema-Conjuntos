import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Login from '../modules/login.jsx';
import Inicio from '../modules/residente/pages/InicioRes.jsx';
import InfoPersonalRes from '../modules/residente/pages/InfoPersonalRes.jsx';
import ReservasRes from '../modules/residente/pages/ReservasRes.jsx';
import SolicitudVisitantes from '../modules/residente/pages/SolicitudVisitantes.jsx';
import RutaRestringida from "../components/rutaRestringida";

export default function AppRouter() {
  //Ingresar las rutas del back y luego descomentar lo de ruta restringida
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Login />} />

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

          <Route path="*" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
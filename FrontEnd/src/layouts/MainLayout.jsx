
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import "../index.css";

export default function MainLayout() {
  const location = useLocation();

  // Ocultar Header en bienvenida, login y residente
  const ocultarHeader =
  location.pathname === "/" ||
  location.pathname === "/login" ||
  location.pathname === "/residente" ||
  location.pathname.startsWith("/residente/") ||
  location.pathname === "/guardia" ||
  location.pathname.startsWith("/guardia/");
  
  return (
    <div id="fondo">
      <div id="aux_fondo">

        {!ocultarHeader && <Header />}

        <main>
          <Outlet />
        </main>

      </div>
    </div>
  );
}

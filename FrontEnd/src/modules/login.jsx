import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IdCard,
  LockKeyhole,
  LogIn,
  ArrowLeft,
  AlertCircle
} from "lucide-react";

import "./login.css";
import Fondo from "../assets/images/Fondo.png";

function Login() {
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPopup, setMostrarPopup] = useState(false);

  const navigate = useNavigate();

  // Función para iniciar sesión
  const controladorLogin = async () => {
    if(!cedula.trim() || !password.trim()){
      alert("Completa todos los datos");
      return;
    }

    // Pendiente: configurar la URL real de la API
    // Cambiar credentials si no se utilizan cookies
    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          cedula,
          password
        })
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        if (data.rol === "guardia") {
          navigate("/guardia");
          alert("Bienvenido " + data.rol);
        } else if (data.rol === "residente") {
          navigate("/residente");
          alert("Bienvenido " + data.rol);
        }
      } else if (response.status === 422) {
        alert("Cédula o contraseña incorrectos");
      } else {
        alert(data.detail || "Error desconocido");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="login-container">

      {/* Imagen del edificio */}
      <div className="login-imagen">
        <img src={Fondo} alt="Edificio Aurora" />
      </div>

      {/* Contenido del login */}
      <section className="login-contenido">

        {/* Botón para regresar */}
        <button
          type="button"
          className="login-volver"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={20} />
          Volver
        </button>

        {/* Encabezado */}
        <div className="login-header">
          <h1>AURORA</h1>
          <h2>Iniciar sesión</h2>
          <div className="login-linea"></div>
        </div>

        {/* Formulario */}
        <form
          className="login-formulario"
          onSubmit={(e) => {
            e.preventDefault();
            controladorLogin();
          }}
        >
          <label htmlFor="cedula">
            Número de cédula
          </label>

          <div className="login-campo">
            <IdCard className="login-icono" />

            <input
              id="cedula"
              type="text"
              placeholder="Ingresa tu cédula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />
          </div>

          <label htmlFor="password">
            Contraseña
          </label>

          <div className="login-campo">
            <LockKeyhole className="login-icono" />

            <input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="login-boton"
          >
            <LogIn size={22} />
            Ingresar
          </button>
        </form>

      </section>

      {/* POP-UP DE CAMPOS INCOMPLETOS */}
      {mostrarPopup && (
        <div className="popup-overlay">
          <div
            className="popup-contenido"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="popup-titulo"
            aria-describedby="popup-descripcion"
          >
            <AlertCircle className="popup-icono" />

            <h2 id="popup-titulo">
              ¡Campos incompletos!
            </h2>

            <p id="popup-descripcion">
              Por favor, ingresa tu número de cédula
              y contraseña para continuar.
            </p>

            <button
              type="button"
              onClick={() => setMostrarPopup(false)}
            >
              Entendido
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Login;

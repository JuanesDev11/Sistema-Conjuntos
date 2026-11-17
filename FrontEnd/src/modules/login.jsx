import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const controladorLogin = async () => {
    if(!cedula.trim() || !password.trim()){
      alert("Completa todos los datos");
      return;
    }
    //poner en el fetch la ruta de la api que recibe los datos
    //cambiar el credentials si no se van aplicar cookies
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
      if(data.rol==="guardia"){
        navigate("/guardia");
        alert("Bienvenido " + data.rol);
      }else if(data.rol==="residente"){
        navigate("/residente");
        alert("Bienvenido " + data.rol);
      }
    }else if (response.status === 422) {
      alert("Correo o contraseña incorrectos");
    } else {
      alert(data.detail || "Error desconocido");
    }
  };

  return (
    <div>
      <div>
        <h2 className="text">Inicia Sesion</h2>

        <input
          type="text"
          placeholder="Cédula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={controladorLogin}> 
          Iniciar sesión
        </button>
      </div>
    </div> 
  );
}

export default Login;

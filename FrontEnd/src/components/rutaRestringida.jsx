import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
/*
function RutaRestringida({ pagina, ruta }) {
  const [verificado, setVerificado] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000${ruta}`, {
      method: "GET",
      credentials: "include"
    })
      .then(res => {
        if (res.ok) setVerificado(true);
        else setVerificado(false);
      })
      .catch(() => setVerificado(false));
  }, [ruta]);

  if (verificado === null) {
    return null;
  }
  
  if (!verificado) {
    return <Navigate to="/" />;
  }

  return pagina;
}*/
function RutaRestringida({ pagina, ruta }) {
  return pagina;
}
export default RutaRestringida;
import { useState, useEffect } from "react";

export default function InfoPersonalRes() {
    const [nombreResidente, setNombreResidente] = useState('nombre');
    const [apellidoResidente, setApellidoResidente] = useState('apellido');
    const [torre, setTorre] = useState('torre');
    const [apt, setApt] = useState('apartamento');

    //Agregar ruta
    useEffect(() => {
    fetch('', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setNombreResidente(data.nombre);
        setApellidoResidente(data.apellido);
        setTorre(data.torre);
        setApt(data.apt);
      });
  }, []);

  return (
    <div >
      <ul className="text">
        <li>{nombreResidente}</li>
        <li>{apellidoResidente}</li>
        <li>{torre}</li>
        <li>{apt}</li>
      </ul>
    </div>
  );
}
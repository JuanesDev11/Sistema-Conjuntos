import { useState } from "react";

export default function FormularioIngreso({ type }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [destino, setDestino] = useState("");
  const [motivoIngreso, setMotivoIngreso] = useState("");
  const [vehiculo, setVehiculo] = useState("");

  const controladorFormulario = async () => {
    if (
      !nombre.trim() ||
      !apellido.trim() ||
      !destino.trim() ||
      !motivoIngreso.trim()
    ) {
      alert("Completa todos los datos");
      return;
    }

    const ahora = new Date();
    const day = ahora.toLocaleDateString("en-CA");
    const horaIngreso = ahora.toTimeString().split(" ")[0]; 

    const estadoVisitante = type === "trabajador" ? true : false;

    const response = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        day,
        horaIngreso,
        destino: destino.trim(),
        motivoIngreso: motivoIngreso.trim(),
        vehiculo: vehiculo.trim() === "" ? null : vehiculo.trim(),
        estadoVisitante,
        type,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      if (type === "trabajador") {
        alert("Trabajador registrado");
      } else if (type === "visitante") {
        alert("Su solicitud se ha enviado al residente");
      }

      setNombre("");
      setApellido("");
      setDestino("");
      setMotivoIngreso("");
      setVehiculo("");
    } else {
      alert(data.detail || "Error desconocido");
    }
  };

  return (
    <div>
      <div>
        <h2 className="text">Registrar {type} </h2>

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />

        <input
          type="text"
          placeholder="Destino"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        />

        <input
          type="text"
          placeholder="Motivo de ingreso"
          value={motivoIngreso}
          onChange={(e) => setMotivoIngreso(e.target.value)}
        />

        <input
          type="text"
          placeholder="Vehículo (Opcional)"
          value={vehiculo}
          onChange={(e) => setVehiculo(e.target.value)}
        />

        <button onClick={controladorFormulario}>Guardar</button>
      </div>
    </div>
  );
}
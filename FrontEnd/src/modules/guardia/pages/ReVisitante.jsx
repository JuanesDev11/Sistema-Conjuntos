import FormularioIngreso from '../components/FormularioIngreso';
import { useState } from "react";

export default function ReVisitante() {
  const [type,setType]=useState('visitante');
  return (
    <div >
      <FormularioIngreso type={type} />
    </div>
  );
}
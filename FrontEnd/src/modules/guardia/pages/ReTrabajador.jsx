import FormularioIngreso from '../components/FormularioIngreso';
import { useState } from "react";

export default function ReTrabajador() {
  const [type,setType]=useState('trabajador');
  return (
    <div >
      <FormularioIngreso type={type} />
    </div>
  );
}
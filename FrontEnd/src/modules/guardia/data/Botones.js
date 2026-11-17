
import {
  UserRoundPlus,
  UsersRound,
  UserRound,
  HardHat
} from "lucide-react";

export const BOTONES = [
  {
    id: 1,
    info: "Ingresar Persona",
    ruta: "Registrar",
    icono: UserRoundPlus
  },
  {
    id: 2,
    info: "Ver Personas Activas",
    ruta: "PersonaActivas",
    icono: UsersRound
  }
];

export const BOTONES_REGISTRO = [
  {
    id: 1,
    info: "Visitante",
    ruta: "RegVisitante",
    icono: UserRound
  },
  {
    id: 2,
    info: "Trabajador",
    ruta: "RegTrabajador",
    icono: HardHat
  }
];

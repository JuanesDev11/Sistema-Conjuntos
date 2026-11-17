
import {
  UserRound,
  UsersRound,
  CalendarDays,
  CalendarPlus,
  ClipboardList
} from "lucide-react";

export const BOTONES = [
  {
    id: 1,
    info: "Información personal",
    ruta: "Info",
    icono: UserRound
  },
  {
    id: 2,
    info: "Solicitudes de visitas",
    ruta: "SolicitudVisitantes",
    icono: UsersRound
  },
  {
    id: 3,
    info: "Reservas",
    ruta: "Reservas",
    icono: CalendarDays
  }
];

export const BOTONES_RESERVAS = [
  {
    id: 1,
    info: "Apartar Espacio",
    ruta: "Apartar",
    icono: CalendarPlus
  },
  {
    id: 2,
    info: "Mis Reservas",
    ruta: "MisReservas",
    icono: ClipboardList
  }
];

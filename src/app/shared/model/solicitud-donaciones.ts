export interface SolicitudDonaciones {
  idSolicitud?: string;
  nombreCompleto: string;
  numeroCelular: string;
  articulos: string[];
  otro: string;
  fecha: string;
  isNew: boolean;
}

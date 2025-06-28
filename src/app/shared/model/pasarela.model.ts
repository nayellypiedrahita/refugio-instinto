export interface Pasarelas {
  idPasarela?: string;
  nombreCuenta: string;
  numeroCuenta: string;
  tipoCuenta: 'Ahorros' | 'Corriente';
  fechaCreacion?: any;
  fechaActualizacion?: any;
}
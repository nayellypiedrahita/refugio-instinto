export interface SolicitudVoluntariado {
    idSolicitud?: string;
    nombre: string;
    apellido: string;
    celular: string;
    email: string;
    fecha: string;
    actividades: string[];  
    otro:string;
    isNew: boolean
}
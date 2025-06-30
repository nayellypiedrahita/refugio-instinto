export interface Mascotas {
    idMascota?: string,
    nombre: string,
    raza: string,
    fechaNacimiento: Date,
    sexo: string;
    esterilizada: boolean,
    estado: string,
    condiciones: string,
    tamano: string,
    historia: string,
    imagenes: string[],
    testimonio?: string,
}
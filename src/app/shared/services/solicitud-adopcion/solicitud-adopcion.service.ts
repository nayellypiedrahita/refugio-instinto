import { inject, Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, Firestore } from '@angular/fire/firestore';
import { SolicitudAdopcion } from '../../model/solicitud-adopcion';
import { getDocs } from '@angular/fire/firestore';
import { from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudAdopcionService {
  eliminarSolicitud(arg0: string) {
    throw new Error('Method not implemented.');
  }
  eliminarMascota(arg0: string) {
    throw new Error('Method not implemented.');
  }

  private firetsore: Firestore = inject(Firestore);
  private solicitudAdopcionCollection: CollectionReference;

  constructor() {
    this.solicitudAdopcionCollection = collection(this.firetsore, 'solicitudes-adopcion');
  }

  addSolicitudAdopcion(solicitudAdopcion: SolicitudAdopcion) {
    return addDoc(this.solicitudAdopcionCollection, solicitudAdopcion);
  }
getSolicitudesAdopcion() {
  return from(getDocs(this.solicitudAdopcionCollection)).pipe(
    map(snapshot =>
      snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          idSolicitud: doc.id,
          nombre: data['nombre'],
          tipoDocumento: data['tipoDocumento'],
          numeroDocumento: data['numeroDocumento'],
          correo: data['correo'],
          celular: data['celular'],
          ciudad: data['ciudad'],
          departamento: data['departamento'],
          mascota: data['mascota'],
          fecha: data['fecha']
        } as SolicitudAdopcion;
      })
    )
  );
}
}


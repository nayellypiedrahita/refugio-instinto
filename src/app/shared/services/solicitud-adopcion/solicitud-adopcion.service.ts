import { inject, Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { SolicitudAdopcion } from '../../model/solicitud-adopcion';
import { getDocs } from '@angular/fire/firestore';
import { from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudAdopcionService {

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

eliminarSolicitudAdopcion(solicitudId: string) {
  return deleteDoc(doc(this.firetsore, this.solicitudAdopcionCollection.path, solicitudId));
}
}


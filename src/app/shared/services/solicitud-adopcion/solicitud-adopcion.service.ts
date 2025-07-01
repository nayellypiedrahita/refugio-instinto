import { inject, Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, deleteDoc, doc, Firestore, query, updateDoc, where } from '@angular/fire/firestore';
import { SolicitudAdopcion } from '../../model/solicitud-adopcion';
import { getDocs } from '@angular/fire/firestore';
import { BehaviorSubject, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudAdopcionService {

  private firetsore: Firestore = inject(Firestore);
  private solicitudAdopcionCollection: CollectionReference;
  private countSolicitudesAdopcion = new BehaviorSubject<number>(0);
  countSolicitudesAdopcionPublico = this.countSolicitudesAdopcion.asObservable();

  constructor() {
    this.solicitudAdopcionCollection = collection(this.firetsore, 'solicitudes-adopcion');
  }

  async noNewSolicitudAdopcion(id: string): Promise<boolean> {
    if (id) {
      await updateDoc(doc(this.firetsore, this.solicitudAdopcionCollection.path, id), { isNew: false });
      this.getCountSolicitudesAdopcion();
      return true;
    }
    return false;
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
          fecha: data['fecha'],
          isNew: data['isNew'] as boolean
        } as SolicitudAdopcion;
      })
    )
  );
}

eliminarSolicitudAdopcion(solicitudId: string) {
  return deleteDoc(doc(this.firetsore, this.solicitudAdopcionCollection.path, solicitudId));
}
async getCountSolicitudesAdopcion(): Promise<void> {
  const docs = await getDocs(
    query(this.solicitudAdopcionCollection,
      where('isNew', '==', true))
  );

  this.countSolicitudesAdopcion.next(docs.docs.length);
}
}


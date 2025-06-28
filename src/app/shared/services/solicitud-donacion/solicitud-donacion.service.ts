import { inject, Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, deleteDoc, doc, Firestore, getDocs } from '@angular/fire/firestore';
import { SolicitudDonaciones } from '../../model/solicitud-donaciones';
import { from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudDonacionService {

  private firestore: Firestore = inject(Firestore);
  private solicitudDonacionCollection: CollectionReference;

  constructor() {
    this.solicitudDonacionCollection = collection(this.firestore, 'solicitudes-donaciones');
  }

  addSolicitudDonacion(solicitud: SolicitudDonaciones) {
    return addDoc(this.solicitudDonacionCollection, solicitud);
  }

  getSolicitudesDonaciones() {
    return from(getDocs(this.solicitudDonacionCollection)).pipe(
      map(snapshot =>
        snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            idSolicitud: doc.id,
            nombreCompleto: data['nombreCompleto'],
            numeroCelular: data['numeroCelular'],
            articulos: data['articulos'],
            otro: data['otro'],
            fecha: data['fecha'],
          } as SolicitudDonaciones;
        })
      )
    );
  }
  eliminarSolicitudDonacion(solicitudId: string) {
    return deleteDoc(doc(this.firestore, this.solicitudDonacionCollection.path, solicitudId));
  }
}

import { inject, Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, deleteDoc, doc, Firestore, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { SolicitudDonaciones } from '../../model/solicitud-donaciones';
import { BehaviorSubject, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudDonacionService {

  private firestore: Firestore = inject(Firestore);
  private solicitudDonacionCollection: CollectionReference;
  private countDonaciones = new BehaviorSubject<number>(0);
  countSolicitudesDonaciones = this.countDonaciones.asObservable();

  constructor() {
    this.solicitudDonacionCollection = collection(this.firestore, 'solicitudes-donaciones');
  }

  async noNewSolicitudComprobante(id: string): Promise<boolean> {
    if (id) {
      await updateDoc(doc(this.firestore, this.solicitudDonacionCollection.path, id), { isNew: false });
      this.getCountSolicitudesDonacion();
      return true;
    }
    return false;
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
            isNew: data['isNew'] as boolean,
          } as SolicitudDonaciones;
        })
      )
    );
  }
  eliminarSolicitudDonacion(solicitudId: string) {
    return deleteDoc(doc(this.firestore, this.solicitudDonacionCollection.path, solicitudId));
  }

  async getCountSolicitudesDonacion(): Promise<void> {
    const docs = await getDocs(
      query(this.solicitudDonacionCollection,
        where('isNew', '==', true))
    );

    this.countDonaciones.next(docs.docs.length);
  }
}

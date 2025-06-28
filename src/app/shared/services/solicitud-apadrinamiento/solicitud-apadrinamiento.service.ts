import { inject, Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { SolicitudApadrinamiento } from '../../model/solicitud-apadrinamiento';
import { getDocs } from '@angular/fire/firestore';
import { from, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SolicitudApadrinamientoService {


   private firestore: Firestore = inject(Firestore);
  private solicitudApadrinamientoCollection: CollectionReference;

  constructor() { 
    this.solicitudApadrinamientoCollection = collection(this.firestore, 'solicitudes-apadrinamiento');
  }

    addSolicitudapadrinamiento(solicitud : SolicitudApadrinamiento) {
      return addDoc(this.solicitudApadrinamientoCollection, solicitud);
    }

getSolicitudesApadrinamiento() {
  return from(getDocs(this.solicitudApadrinamientoCollection)).pipe(
    map(snapshot =>
      snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          idSolicitud: doc.id,
          nombre: data['nombre'],
          email: data['email'],
          celular: data['celular'],
          notificacion: data['notificacion'],
          fecha: data['fecha']
        } as SolicitudApadrinamiento;
      })
    )
  );
}

eliminarSolicitudApadrinamiento(solicitudId: string) {
  return deleteDoc(doc(this.firestore, this.solicitudApadrinamientoCollection.path, solicitudId));
}
}
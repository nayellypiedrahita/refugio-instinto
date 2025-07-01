import { inject, Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, deleteDoc, doc, Firestore, query, updateDoc, where } from '@angular/fire/firestore';
import { SolicitudApadrinamiento } from '../../model/solicitud-apadrinamiento';
import { getDocs } from '@angular/fire/firestore';
import { BehaviorSubject, from, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SolicitudApadrinamientoService {


   private firestore: Firestore = inject(Firestore);
  private solicitudApadrinamientoCollection: CollectionReference;
    private countSolicitudesApadrinamiento = new BehaviorSubject<number>(0);
    countSolicitudesApadrinamientoPublico = this.countSolicitudesApadrinamiento.asObservable();

  constructor() { 
    this.solicitudApadrinamientoCollection = collection(this.firestore, 'solicitudes-apadrinamiento');
  }

  async noNewSolicitudApadrinamiento(id: string): Promise<boolean> {
      if (id) {
        await updateDoc(doc(this.firestore, this.solicitudApadrinamientoCollection.path, id), { isNew: false });
        this.getCountSolicitudesApadrinamiento();
        return true;
      }
      return false;
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
          fecha: data['fecha'],
          isNew: data['isNew'],
        } as SolicitudApadrinamiento;
      })
    )
  );
}

eliminarSolicitudApadrinamiento(solicitudId: string) {
  return deleteDoc(doc(this.firestore, this.solicitudApadrinamientoCollection.path, solicitudId));
}
async getCountSolicitudesApadrinamiento(): Promise<void> {
  const docs = await getDocs(
    query(this.solicitudApadrinamientoCollection,
      where('isNew', '==', true))
  );

  this.countSolicitudesApadrinamiento.next(docs.docs.length);
}
}
import { inject, Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, deleteDoc, doc, Firestore, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { SolicitudVoluntariado } from '../../model/solicitud-voluntariado';
import { BehaviorSubject, from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudVoluntariadoService {

  private firestore: Firestore = inject(Firestore);
  private solicitudVoluntariadoCollection: CollectionReference;
  private countSolicitudVoluntariado = new BehaviorSubject<number>(0);
  countSolicitudesVoluntariado = this.countSolicitudVoluntariado.asObservable();

  constructor() {
    this.solicitudVoluntariadoCollection = collection(this.firestore, 'solicitudes-voluntariado');
  }

  async noNewSolicitudVoluntariado(id: string): Promise<boolean> {
    if (id) {
      await updateDoc(doc(this.firestore, this.solicitudVoluntariadoCollection.path, id), { isNew: false });
      this.getCountSolicitudesVoluntariado();
      return true;
    }
    return false;
  }

  addSolicitudVoluntariado(solicitud: SolicitudVoluntariado) {
    return addDoc(this.solicitudVoluntariadoCollection, solicitud);
  }

  getSolicitudesVoluntariado(): Observable<SolicitudVoluntariado[]> {
    return from(getDocs(this.solicitudVoluntariadoCollection))
      .pipe(
        map((snapshot) => snapshot.docs.map((element) => {
          const datosMascota = element.data();
          return {
            idSolicitud: element.id,
            nombre: datosMascota['nombre'],
            apellido: datosMascota['apellido'],
            celular: datosMascota['celular'],
            email: datosMascota['email'],
            fecha: datosMascota['fecha'],
            isNew: datosMascota['isNew'],
            // actividades: datosMascota['fecha'],
          } as SolicitudVoluntariado;
        })
      )
    );
  }

  eliminarSolicitudVoluntariado(solicitudId: string) {
    return deleteDoc(doc(this.firestore, this.solicitudVoluntariadoCollection.path, solicitudId));
  }

  async getCountSolicitudesVoluntariado(): Promise<void> {
    const docs = await getDocs(
      query(this.solicitudVoluntariadoCollection,
        where('isNew', '==', true))
    );

    this.countSolicitudVoluntariado.next(docs.docs.length);
  }

}

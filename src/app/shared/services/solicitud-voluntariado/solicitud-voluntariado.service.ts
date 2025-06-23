import { inject, Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, Firestore, getDocs } from '@angular/fire/firestore';
import { SolicitudVoluntariado } from '../../model/solicitud-voluntariado';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudVoluntariadoService {

  private firestore: Firestore = inject(Firestore);
  private solicitudVoluntariadoCollection: CollectionReference;

  constructor() {
    this.solicitudVoluntariadoCollection = collection(this.firestore, 'solicitudes-voluntariado');
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
            // actividades: datosMascota['fecha'],
          } as SolicitudVoluntariado;
        })
      )
    );
  }

}

import { inject, Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, Firestore } from '@angular/fire/firestore';
import { SolicitudDonaciones } from '../../model/solicitud-donaciones';

@Injectable({
  providedIn: 'root'
})
export class SolicitudDonacionService {

  private firetsore: Firestore = inject(Firestore);
  private solicitudDonacionCollection: CollectionReference

  constructor() {
    this.solicitudDonacionCollection = collection(this.firetsore, 'solicitudes-donaciones');
   }


  addSolicitudDonacion(SolicitudDonaciones: SolicitudDonaciones) {
    return addDoc(this.solicitudDonacionCollection, SolicitudDonaciones);
  } 

}

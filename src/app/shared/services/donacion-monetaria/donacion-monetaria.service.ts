import { inject, Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, Firestore } from '@angular/fire/firestore';
import { DonacionMonetaria } from '../../model/donacion-monetaria';

@Injectable({
  providedIn: 'root'
})
export class DonacionMonetariaService {

  private firestore: Firestore = inject(Firestore);
  private donacionMonetariaCollection: CollectionReference;

  constructor() {
    this.donacionMonetariaCollection = collection(this.firestore, 'donaciones-monetarias');
  }

  addDonacion(donacion: DonacionMonetaria) {
    return addDoc(this.donacionMonetariaCollection, donacion);
  }
}

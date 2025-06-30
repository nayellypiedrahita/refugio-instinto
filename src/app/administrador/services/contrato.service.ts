import { inject, Injectable } from '@angular/core';
import { collection, CollectionReference, doc, Firestore, getDocs, updateDoc } from '@angular/fire/firestore';
import { first, from, map, Observable } from 'rxjs';
import { Contrato } from '../model/contrato';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  firestore: Firestore = inject(Firestore);
  contratoCollection: CollectionReference;

  constructor() {
    this.contratoCollection = collection(this.firestore, "contrato");
  }

  getContrato(): Observable<Contrato[]> {
    return from(getDocs(this.contratoCollection))
      .pipe(
        map((snapshot) => snapshot.docs.map((datos) => {
            const datosPasarela = datos.data();
            return {
              idContrato: datos.id,
              base64: datosPasarela['base64']
            } as Contrato;
          })
          )
      );
  }

  async actualizarContrato(base64: string, id: string) {
    if (id) {
      await updateDoc(doc(this.firestore, this.contratoCollection.path, id), { base64 });
      return true;
    }
    return false;
  }

}

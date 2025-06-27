import { inject, Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, Firestore, getDocs } from '@angular/fire/firestore';
import { Pasarelas } from '../../model/pasarela.model';
import { from, map } from 'rxjs';
import { query } from '@angular/animations';
import { updateDoc, deleteDoc } from '@angular/fire/firestore';
import { doc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class PasarelasService {
  
  private firestore: Firestore = inject(Firestore);
  private pasarelasCollection: CollectionReference;

  constructor() {
    this.pasarelasCollection = collection(this.firestore, 'pasarelas-de-pago');
  }

  addPasarela(pasarela: {nombreCuenta: string, tipoCuenta: 'Ahorros' | 'Corriente', numeroCuenta: string}): Promise<boolean> {
    return new Promise((resolve, reject) => {
      addDoc(this.pasarelasCollection, {
        nombreCuenta: pasarela.nombreCuenta,
        tipoCuenta: pasarela.tipoCuenta,
        numeroCuenta: pasarela.numeroCuenta,
        fechaCreacion: new Date()
      })
      .then(() => resolve(true))
      .catch(() => reject(false));
    });
  }

  getPasarelas(){
    return from(getDocs(this.pasarelasCollection))
    .pipe(
      map((snapshot) => snapshot.docs.map((datos) => {
          const datosPasarela = datos.data();
          return {
            idPasarela: datos.id,
            nombreCuenta: datosPasarela['nombreCuenta'],
            tipoCuenta: datosPasarela['tipoCuenta'],
            numeroCuenta: datosPasarela['numeroCuenta'],
          } as Pasarelas;
        })
       )
    );
  }

  
 async updatePasarela(pasarela: Pasarelas, idPasarela: string): Promise<boolean>{
   if (idPasarela){
    await updateDoc(doc(this.firestore, this.pasarelasCollection.path, idPasarela), { ...pasarela });
    return true;
   }
   return false;
 }

async eliminarCuenta(idPasarela: string): Promise<boolean>{
 if (idPasarela){
  await deleteDoc(doc(this.firestore, this.pasarelasCollection.path, idPasarela));
  return true;
 }
 return false;
}



}

import { inject, Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, Firestore, getDocs, query, Timestamp, updateDoc, where } from '@angular/fire/firestore';
import { DonacionMonetaria } from '../../model/donacion-monetaria';
import { BehaviorSubject, from, groupBy, lastValueFrom, map, Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { deleteDoc, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DonacionMonetariaService{ 

  private firestore: Firestore = inject(Firestore);
  private donacionMonetariaCollection: CollectionReference;
  private countDonaciones = new BehaviorSubject<number>(0);
  countDonacionesPublico = this.countDonaciones.asObservable();

  constructor() {
    this.donacionMonetariaCollection = collection(this.firestore, 'donaciones-monetarias');
  }

  async noNewComprobante(id: string): Promise<boolean> {
    if (id) {
      await updateDoc(doc(this.firestore, this.donacionMonetariaCollection.path, id), { isNew: false });
      this.getCountDonaciones();
      return true;
    }
    return false;
  }
 
  async eliminarcomprobante(id: string): Promise<boolean> {
    if (id) {
      await deleteDoc(doc(this.firestore, this.donacionMonetariaCollection.path, id));
      return true;
    }
    return false;
  }

  async addDonacion(base64: string, nombreCompleto: string, whatsapp: number) {
    const donacionesTodas: DonacionMonetaria[] = await lastValueFrom(this.getDonaciones());
    const newDonacion: DonacionMonetaria = {
      consecutivo: donacionesTodas.length++,
      base64,
      nombreCompleto,
      whatsapp,
      fecha: formatDate(Timestamp.now().toDate(), 'yyyy-MM-dd', 'en-US'),
      isNew: true
    };
    return addDoc(this.donacionMonetariaCollection, newDonacion);
  }

  getDonaciones(): Observable<DonacionMonetaria[]> {
    return from(getDocs(this.donacionMonetariaCollection))
      .pipe(
        map((snapshot) => snapshot.docs.map((element) => {
          const datosMascota = element.data();
          return {
            idDonacionMonetaria: element.id,
            consecutivo: datosMascota['consecutivo'],
            base64: datosMascota['base64'],
            nombreCompleto: datosMascota['nombreCompleto'],
            whatsapp: datosMascota['whatsapp'],
            fecha: datosMascota['fecha'],
            isNew: datosMascota['isNew'] as boolean,
          } as DonacionMonetaria;
        })
      )
    );
  }

  async getCountDonaciones(): Promise<void> {
    const docs = await getDocs(
          query(this.donacionMonetariaCollection,
            where('isNew', '==', true))
        );
        
        this.countDonaciones.next(docs.docs.length)
  }


  

}

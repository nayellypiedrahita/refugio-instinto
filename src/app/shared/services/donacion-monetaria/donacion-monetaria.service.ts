import { inject, Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, Firestore, getDocs, Timestamp } from '@angular/fire/firestore';
import { DonacionMonetaria } from '../../model/donacion-monetaria';
import { from, groupBy, lastValueFrom, map, Observable } from 'rxjs';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DonacionMonetariaService {

  private firestore: Firestore = inject(Firestore);
  private donacionMonetariaCollection: CollectionReference;

  constructor() {
    this.donacionMonetariaCollection = collection(this.firestore, 'donaciones-monetarias');
  }

  async addDonacion(base64: string, nombreCompleto: string, whatsapp: number) {
    const donacionesTodas: DonacionMonetaria[] = await lastValueFrom(this.getDonaciones());
    const newDonacion: DonacionMonetaria = {
      consecutivo: donacionesTodas.length++,
      base64,
      nombreCompleto,
      whatsapp,
      fecha: formatDate(Timestamp.now().toDate(), 'yyyy-MM-dd', 'en-US')
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
          } as DonacionMonetaria;
        })
      )
    );
  }

}

import { inject, Injectable } from '@angular/core';
import { collection, collectionData, CollectionReference, doc, Firestore, getDoc, getDocs } from '@angular/fire/firestore';
import { from, map, Observable, of } from 'rxjs';
import { Mascotas } from '../model/mascotas';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  private firestore: Firestore = inject(Firestore);
  private mascotasCollection: CollectionReference;

  constructor() {
    this.mascotasCollection = collection(this.firestore, 'mascotas');
  }

  getMascotas(): Observable<Mascotas[]> {
    return from(getDocs(this.mascotasCollection))
      .pipe(
        map((snapshot) => snapshot.docs.map((element) => {
          const datosMascota = element.data();
          return {
            idMascota: element.id,
            nombre: datosMascota['nombre'],
            edad: datosMascota['edad'],
            esterilizada: datosMascota['esterilizada'],
            historia: datosMascota['historia'],
            imagenes: datosMascota['imagenes'],
            raza: datosMascota['raza']
          } as Mascotas;
        })
      )
    );
  }

  getMascotaById(idMascota: string): Observable<Mascotas | null>{
    return from(getDoc(doc(this.mascotasCollection, idMascota))).pipe(map((element) => {
      const datosMascota = element.data()!;
      return {
        idMascota: element.id,
        nombre: datosMascota['nombre'],
        edad: datosMascota['edad'],
        esterilizada: datosMascota['esterilizada'],
        historia: datosMascota['historia'],
        imagenes: datosMascota['imagenes'],
        raza: datosMascota['raza']
      } as Mascotas;
    }));
  }

}

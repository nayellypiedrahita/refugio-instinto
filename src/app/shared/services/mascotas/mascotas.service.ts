import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, Firestore, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { from, map, Observable, of } from 'rxjs';
import { Mascotas } from '../../model/mascotas';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  private firestore: Firestore = inject(Firestore);
  private mascotasCollection: CollectionReference;

  constructor() {
    this.mascotasCollection = collection(this.firestore, 'mascotas');
  }

  getMascotas(estados: string[]): Observable<Mascotas[]> {
    return from(getDocs(query(this.mascotasCollection, where('estado', 'in', estados)) ))
      .pipe(
        map((snapshot) => snapshot.docs.map((element) => {
          const datosMascota = element.data();
          return {
            idMascota: element.id,
            nombre: datosMascota['nombre'],
            raza: datosMascota['raza'],
            edad: datosMascota['edad'],
            sexo: datosMascota['sexo'],
            esterilizada: datosMascota['esterilizada'],
            estado: datosMascota['estado'],
            condiciones: datosMascota['condiciones'],
            tamano: datosMascota['tamano'],
            historia: datosMascota['historia'],
            imagenes: datosMascota['imagenes'],
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
        raza: datosMascota['raza'],
        edad: datosMascota['edad'],
        sexo: datosMascota['sexo'],
        esterilizada: datosMascota['esterilizada'],
        estado: datosMascota['estado'],
        condiciones: datosMascota['condiciones'],
        tamano: datosMascota['tamano'],
        historia: datosMascota['historia'],
        imagenes: datosMascota['imagenes'],
      } as Mascotas;
    }));
  }

  addMascotas(mascota: Mascotas) {
    return addDoc(this.mascotasCollection, mascota);
  }
  
  async actualizarMascota(mascota:Mascotas , id: string): Promise<boolean> {
    if (id) {
      await updateDoc(doc(this.firestore, this.mascotasCollection.path, id), { ...mascota });
      return true;
    }
    return false;
  }
  
  async eliminarMascota(id: string): Promise<boolean> {
    if (id) {
      await deleteDoc(doc(this.firestore, this.mascotasCollection.path, id));
      return true;
    }
    return false;
  }
}

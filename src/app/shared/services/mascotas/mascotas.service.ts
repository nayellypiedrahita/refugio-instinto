import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, Firestore, getDoc, getDocs, query, Timestamp, updateDoc, where } from '@angular/fire/firestore';
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
            fechaNacimiento: (datosMascota['fechaNacimiento'] as Timestamp).toDate(),
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
        fechaNacimiento: (datosMascota['fechaNacimiento'] as Timestamp).toDate(),
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

  getMascotaByIdPromise(idMascota: string): Promise<Mascotas | null>{
    return getDoc(doc(this.mascotasCollection, idMascota)).then(element => {
      const datosMascota = element.data()!;
      return {
        idMascota: element.id,
        nombre: datosMascota['nombre'],
        raza: datosMascota['raza'],
        fechaNacimiento: (datosMascota['fechaNacimiento'] as Timestamp).toDate(),
        sexo: datosMascota['sexo'],
        esterilizada: datosMascota['esterilizada'],
        estado: datosMascota['estado'],
        condiciones: datosMascota['condiciones'],
        tamano: datosMascota['tamano'],
        historia: datosMascota['historia'],
        imagenes: datosMascota['imagenes'], 
      } as Mascotas;
    });
  }

  addMascotas(mascota: Mascotas) {
    return addDoc(this.mascotasCollection, { ...mascota, fechaNacimiento: Timestamp.fromDate(new Date(mascota.fechaNacimiento)) });
  }
  
  async actualizarMascota(mascota:Mascotas , id: string): Promise<boolean> {
    if (id) {
      await updateDoc(doc(this.firestore, this.mascotasCollection.path, id), { ...mascota, fechaNacimiento: Timestamp.fromDate(new Date(mascota.fechaNacimiento)) });
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

  getMascotasConTestimonio(): Observable<Mascotas[]> {
  const q = query(this.mascotasCollection, where('testimonio', '!=', ''));
  return from(getDocs(q)).pipe(
    map((snapshot) =>
      snapshot.docs.map((element) => {
        const datosMascota = element.data();
        return {
          idMascota: element.id,
          nombre: datosMascota['nombre'],
          raza: datosMascota['raza'],
          fechaNacimiento: (datosMascota['fechaNacimiento'] as Timestamp).toDate(),
          sexo: datosMascota['sexo'],
          esterilizada: datosMascota['esterilizada'],
          estado: datosMascota['estado'],
          condiciones: datosMascota['condiciones'],
          tamano: datosMascota['tamano'],
          historia: datosMascota['historia'],
          imagenes: datosMascota['imagenes'],
          testimonio: datosMascota['testimonio'], // Asegúrate de que esto se guarde al agregarlo
        } as Mascotas;
      })
    )
  );
}

}

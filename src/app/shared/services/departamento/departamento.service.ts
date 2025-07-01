import { inject, Injectable } from '@angular/core';
import { collection, collectionData, CollectionReference, doc, Firestore, getDoc, getDocs } from '@angular/fire/firestore';
import { Departamento } from '../../../web/model/departamento';
import { WebModule } from '../../../web/web.module';

@Injectable({
  providedIn: WebModule
})
export class DepartamentoService {

  private firestore: Firestore = inject(Firestore);
  private departamentosCollection: CollectionReference;

  constructor() {
    this.departamentosCollection = collection(this.firestore, 'departamento');
  }

  async getAllDepartamentos(): Promise<Departamento[]> {
    const querySnap = await getDocs(this.departamentosCollection);
    return querySnap.docs.flatMap((departamento) => {
      const id = departamento.id;
      const documentData = departamento.data();
      return { idDepartamento: id, nombre: documentData['nombre'] } as Departamento;
    });
  }

  getDepartamentosByIdPromise(idDepartamento: string): Promise<Departamento | null>{
      return getDoc(doc(this.departamentosCollection, idDepartamento)).then(element => {
        const datosDepartamento = element.data()!;
        return {
            idDepartamento: element.id,
            nombre: datosDepartamento['nombre'],
        } as Departamento;
      });
    }


}

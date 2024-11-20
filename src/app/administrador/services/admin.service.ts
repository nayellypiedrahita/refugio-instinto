import { inject, Injectable } from '@angular/core';
import { AdministradorModule } from '../administrador.module';
import { collection, collectionData, CollectionReference, Firestore, getDocs, query, Query, QuerySnapshot, where } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Admin } from '../model/admin';

@Injectable({
  providedIn: AdministradorModule
})
export class AdminService {

  private firestore: Firestore = inject(Firestore);
  private adminCollection: CollectionReference;

  constructor() {
    this.adminCollection = collection(this.firestore, 'admin');
  }

  async login(login: { usuario: string; clave: string }): Promise<boolean> {
    const docs = await getDocs(
      query(this.adminCollection,
        where('usuario', '==', login.usuario),
        where('clave', '==', login.clave))
    );
    return docs.docs.length > 0;
  }
}

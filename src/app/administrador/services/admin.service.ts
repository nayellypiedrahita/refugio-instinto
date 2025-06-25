import { inject, Injectable } from '@angular/core';
import { AdministradorModule } from '../administrador.module';
import { collection, CollectionReference, doc, Firestore, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';
import * as CryptoJS from "crypto-js";

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
        where('usuario', '==', login.usuario))
    );
    if (docs.docs.length > 0) {
      const admin = docs.docs[0].data() as { usuario: string; clave: string };
      const decript = CryptoJS.AES.decrypt(admin.clave, environment.encrypt_key);
      const clave = decript.toString(CryptoJS.enc.Utf8);
      if (clave == login.clave) {
        login.clave = admin.clave;
        sessionStorage.setItem('auth', JSON.stringify(login));
        return true;
      }
    }
    return false;
  }

  logout() {
    sessionStorage.removeItem('auth');
  }

  async recuperarContrasena(usuario: string, codigo_secreto: string): Promise<string> {
    const docs = await getDocs(
      query(this.adminCollection,
        where('usuario', '==', usuario),
        where('codigo_secreto', '==', codigo_secreto)
      )
    );
    if (docs.docs.length > 0) {
      return docs.docs[0].id;
    }
    return "";
  }

  async actualizarContrasena(nueva_contrasena: string, id: string): Promise<boolean> {
    if (id) {
      await updateDoc(doc(this.firestore, this.adminCollection.path, id), { clave: CryptoJS.AES.encrypt(nueva_contrasena, environment.encrypt_key).toString() });
      return true;
    }
    return false;
  }
}


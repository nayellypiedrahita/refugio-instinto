import { Component } from '@angular/core';

@Component({
  selector: 'app-contrato-admin',
  templateUrl: './contrato-admin.component.html',
  styleUrl: './contrato-admin.component.css'
})
export class ContratoAdminComponent {

  base64: string = "";
  selectedImage: boolean = false;
  loading: boolean = false;


  fileSelected(event: any) {
    this.selectedImage = false;
    if (event.target.files.length > 1) {
      alert("Solo se tendra en cuenta el primer archivo seleccionado")
    }
    const file: File = event.target.files[0];

    if (!file.type.startsWith("image/")) {
      alert("El elemento seleccionado no es una imagen")
    }

    const fileReader = new FileReader();

    fileReader.onload = (event: any) => {      
      this.base64 = event.target.result;
      this.selectedImage = true;
    };

    fileReader.onerror = (event: any) => {
      console.log("File could not be read: " + event.target.error.code);
    };
    fileReader.readAsDataURL(file);
  
  }

  quitarImagen() {
    this.base64 = "";
    this.selectedImage = false;
  }


}


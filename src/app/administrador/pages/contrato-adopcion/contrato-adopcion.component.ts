import { Component, OnInit } from '@angular/core';
import { ContratoService } from '../../services/contrato.service';
import { Contrato } from '../../model/contrato';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-contrato-adopcion',
  templateUrl: './contrato-adopcion.component.html',
  styleUrl: './contrato-adopcion.component.css'
})
export class ContratoAdopcionComponent implements OnInit {

  contrato: Contrato | null = null;
  base64: string = "";
  base64Contrato: SafeResourceUrl | null = null;

  constructor(
    private contratoService: ContratoService,
    private sanitizer: DomSanitizer
  ) {

  }

  ngOnInit(): void {
    this.getContrato();
  }

  getContrato() {
    this.contratoService.getContrato().subscribe(response => {
      if (response) {
        this.contrato = response[0];
        this.base64Contrato = this.sanitizer.bypassSecurityTrustResourceUrl(response[0].base64);
      }
    });
  }

  selectedFile(event: any) {
    const file: File = event.target.files[0];
    
    if (!file.type.startsWith("application/pdf")) {
      alert("El elemento seleccionado no es un pdf")
      return;
    }

    if (file.size/1000 > 500) {
      alert("El archivo seleccionado es demasiado grande")
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = (event: any) => { 
      this.base64 = event.target.result;
    };

    fileReader.onerror = (event: any) => {
      console.log("File could not be read: " + event.target.error.code);
    };
    fileReader.readAsDataURL(file);
  }

  updateFile() {
    this.contratoService.actualizarContrato(this.base64, this.contrato?.idContrato!).then(response => {
      alert("Se actualizo correctamente el contrato");
      this.getContrato();
    }).catch(error => {
      console.log(error)
    });
  }

}

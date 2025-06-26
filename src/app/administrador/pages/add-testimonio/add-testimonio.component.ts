import { Component } from '@angular/core';

@Component({
  selector: 'app-add-testimonio',
  templateUrl: './add-testimonio.component.html',
  styleUrl: './add-testimonio.component.css'
})
export class AddTestimonioComponent {
  testimonio: string = '';

  enviar() {
    if (this.testimonio.trim()) {
      console.log('Testimonio enviado:', this.testimonio);
      // Aquí puedes agregar lógica para guardar en Firebase
      this.testimonio = '';
    }
  }

  cancelar() {
    this.testimonio = '';
  }
}

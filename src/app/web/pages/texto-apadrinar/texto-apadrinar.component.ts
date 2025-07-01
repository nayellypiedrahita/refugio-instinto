import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-texto-apadrinar',
  templateUrl: './texto-apadrinar.component.html',
  styleUrl: './texto-apadrinar.component.css'
})
export class TextoApadrinarComponent implements OnInit { 

  idmascota: string | null= null;
  constructor (private router: ActivatedRoute){
    
  }
  ngOnInit(): void {
   this.idmascota = this.router.snapshot.paramMap.get('idmascota');
  }
}

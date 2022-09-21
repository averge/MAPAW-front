import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevo-bloque',
  templateUrl: './nuevo-bloque.component.html',
  styleUrls: ['./nuevo-bloque.component.scss']
})
export class NuevoBloqueComponent implements OnInit {

  bloque = [];
  
  constructor() { }
  formBloque = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    ejercicios: new FormControl('', Validators.required),
  });
  
  ngOnInit(): void {
  }


  guardarBloque(){
    console.log(this.bloque);
  }

  cancelar(){
    console.log('cancelar');
  }
}

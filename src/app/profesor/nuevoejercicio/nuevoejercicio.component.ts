import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevoejercicio',
  templateUrl: './nuevoejercicio.component.html',
  styleUrls: ['./nuevoejercicio.component.scss']
})
export class NuevoejercicioComponent implements OnInit {
  tipos= ['Aerobico', 'Anaerobico', 'Mixto'];
  fomularioEjercicio = new FormGroup({
    tipo: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    video: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
  });

  constructor() { }

  ngOnInit(): void {
  }


  nuevoEjercicio() {
    console.log(this.fomularioEjercicio);
  }
}

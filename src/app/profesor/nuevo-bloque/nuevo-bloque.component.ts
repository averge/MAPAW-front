import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-nuevo-bloque',
  templateUrl: './nuevo-bloque.component.html',
  styleUrls: ['./nuevo-bloque.component.scss']
})
export class NuevoBloqueComponent implements OnInit {

  ejerciciosList:any = [];
  ejercicios= [{
    tipo: 'Aerobico',
    nombre: 'Correr',
    descripcion: 'Correr 15 minutos',
    zonaMuscular: 'Piernas',
    dificultad: 1,
    duracion: "15 minutos",
    materiales: 'Zapatillas',
    video: 'https://www.youtube.com/watch?v=1Q8fG0TtVAY',
    d:false
  }, 
  {
    tipo: 'Aerobico',
    nombre: 'Nadar',
    descripcion: 'Nadar 15 minutos',
    zonaMuscular: 'Piernas',
    dificultad: 5,
    duracion: "15 minutos",
    materiales: 'Traje de baño',
    video: 'https://www.youtube.com/watch?v=1Q8fG0TtVAY',
    d:false
  },
  {
    tipo: 'Anaerobico',
    nombre: 'Sentadillas',
    descripcion: '15 sentadillas',
    zonaMuscular: 'Piernas',
    d:false,
    dificultad: 4,
    duracion: "15 minutos",
    materiales: 'Banco',
    video: 'https://www.youtube.com/watch?v=1Q8fG0TtVAY',},
    {
      tipo: 'Mixto',
      nombre: 'Abdominales',
      descripcion: '15 abdominales',
      zonaMuscular: 'Abdomen',
      dificultad: 5,
      duracion: "15 minutos",
      materiales: 'Ninguno',
      video: 'https://www.youtube.com/watch?v=1Q8fG0TtVAY',
      d:false
    },
  
  {
    tipo: 'Mixto',
    nombre: 'Abdominales',
    descripcion: '15 abdominales',
    zonaMuscular: 'Abdomen',
    dificultad: 5,
    duracion: "15 minutos",
    materiales: 'Ninguno',
    video: 'https://www.youtube.com/watch?v=1Q8fG0TtVAY',
    d:false}];

  constructor(public dialogRef: MatDialogRef<NuevoBloqueComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  formBloque = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    ejercicios: new FormControl(''),
  });
  
  ngOnInit(): void {
  }


  guardarBloque(){
    if(this.ejerciciosList.length > 1){
      this.formBloque.value.ejercicios = this.ejerciciosList;
      if (this.formBloque.valid) {
        console.log(this.formBloque.value);
        this.dialogRef.close(this.formBloque.value);
      }
  }}

  cancelar(){
    this.dialogRef.close(false);
    console.log('cancelar');
  }

  agregarEjercicio(ejercicio: any){

    this.ejerciciosList.push(ejercicio);
    this.ejercicios.splice(this.ejercicios.indexOf(ejercicio),1);
  }

  eliminarEjercicio(ejercicio: any){
    this.ejercicios.push(ejercicio);
    this.ejerciciosList.splice(this.ejerciciosList.indexOf(ejercicio),1);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NuevoejercicioComponent } from '../nuevoejercicio/nuevoejercicio.component';
import { BloquesComponent } from '../bloques/bloques.component';
import { NuevoBloqueComponent } from '../nuevo-bloque/nuevo-bloque.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ver=""
  usuarios= [
    {nombre: 'Juan', apellido: 'Perez', edad: 20, sexo: 'Masculino', email: 'jj@jj.com', plan: 2},
    {nombre: 'Laura', apellido: 'Lopez', edad: 15, sexo: 'Femenino', email: 'jj@jj.com', plan: 2},
    {nombre: 'Maria', apellido: 'Gomez', edad: 25, sexo: 'Femenino', email: 'pp@pp.com', plan: 3},
    {nombre: 'Pedro', apellido: 'Gonzalez', edad: 30, sexo: 'Masculino', email: 'oo@oo.com', plan: 3},
    ];
    ejerciciosValid:any=[]
  ejercicios= [{
    tipo: 'Aerobico',
    nombre: 'Correr',
    descripcion: 'Correr 15 minutos',
    zonaMuscular: 'Piernas',
    dificultad: 1,
    materiales: 'Zapatillas',
    video: 'https://www.youtube.com/embed/npBdpO5B_mQ',
    d:false
  }, 
  {
    tipo: 'Aerobico',
    nombre: 'Nadar',
    descripcion: 'Nadar 15 minutos',
    zonaMuscular: 'Piernas',
    dificultad: 5,
    materiales: 'Traje de baño',
    video: 'https://www.youtube.com/embed/npBdpO5B_mQ',
    d:false
  },
  {
    tipo: 'Anaerobico',
    nombre: 'Sentadillas',
    descripcion: '15 sentadillas',
    zonaMuscular: 'Piernas',
    d:false,
    dificultad: 4,
    materiales: 'Banco',
    video: 'https://www.youtube.com/watch?v=1Q8fG0TtVAY',},
    {
      tipo: 'Mixto',
      nombre: 'Abdominales',
      descripcion: '15 abdominales',
      zonaMuscular: 'Abdomen',
      dificultad: 5,
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
    materiales: 'Ninguno',
    video: 'https://www.youtube.com/watch?v=1Q8fG0TtVAY',
    d:false}];

  public filtroTipo: FormControl = new FormControl()
    
  constructor( private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    for (let i = 0; i < this.ejercicios.length; i++) {
      //this.ejercicios[i].video=this.embebido(this.ejercicios[i].video);
    }
    this.ejerciciosValid=this.ejercicios;
  }
  embebido(url:any){
    return url.replace("watch?v=", "embed/");
  }

  nuevoEjercicio(){
    const dialogRef = this.dialog.open(NuevoejercicioComponent, {
      panelClass: 'js-dialog',  data: { }   
    });
  }
  verPerfil(){
    this.router.navigate(['/perfil']);
    console.log('ver perfil');
  }
  counter(i: number) {
    return new Array(i);
}


filtroTipoChange(){
  console.log(this.filtroTipo.value);
  if(this.filtroTipo.value=="Todos"){
    this.ejerciciosValid=this.ejercicios;
  }else{
    this.ejerciciosValid=this.ejercicios.filter((e:any) => e.tipo === this.filtroTipo.value);
  }
}
nuevoBloque(){
  const dialogRef = this.dialog.open(NuevoBloqueComponent, {
    panelClass: 'js-dialog',  data: { }   
  });
}
verBloque(){
  console.log('ver bloque');
  const dialogRef = this.dialog.open(BloquesComponent, {
    panelClass: 'js-dialog',  data: { }   
  });
}
}

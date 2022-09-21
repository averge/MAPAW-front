import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NuevoejercicioComponent } from '../nuevoejercicio/nuevoejercicio.component';
import { BloquesComponent } from '../bloques/bloques.component';
import { NuevoBloqueComponent } from '../nuevo-bloque/nuevo-bloque.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ver=""
  bloques:any=[]
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

  

  bloque= {nombre: 'Bloque 1', ejercicios: [{
    tipo: 'Aerobico',
    nombre: 'Correr',
    descripcion: 'Correr 15 minutos',
    zonaMuscular: 'Piernas',
    dificultad: 1,
    duracion: "15 minutos",
    materiales: 'Zapatillas',
    video: 'https://www.youtube.com/watch?v=1Q8fG0TtVAY',
    d:false
  }, {
    tipo: 'Mixto',
    nombre: 'Abdominales',
    descripcion: '15 abdominales',
    zonaMuscular: 'Abdomen',
    dificultad: 5,
    duracion: "15 minutos",
    materiales: 'Ninguno',
    video: 'https://www.youtube.com/watch?v=1Q8fG0TtVAY',
    d:false}]};
  public filtroTipo: FormControl = new FormControl("Todos");
  public filtroEjercicio: FormControl = new FormControl()
    
  constructor( private router: Router, public dialog: MatDialog, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.ejerciciosValid=this.ejercicios;
  }
  embebido(url:any){
    return url.replace("watch?v=", "embed/");
  }

  verVideo(video:any){
    return this._sanitizer.bypassSecurityTrustResourceUrl(this.embebido(video));
  }

  
  eliminarEjercicio(ejercicio:any){
    if (window.confirm("Esta seguro que desea eliminar el ejercicio?")) {
      for (let i = 0; i < this.ejercicios.length; i++) {
        if(this.ejercicios[i].nombre==ejercicio){
          this.ejercicios.splice(i,1);
        }
     }
    }     
  }
  nuevoEjercicio(){
    const dialogRef = this.dialog.open(NuevoejercicioComponent, {
      panelClass: 'js-dialog',  data: { }   
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (!result === true ) return;
      this.ejercicios.push(result);
    } );
  }
  verPerfil(){
    this.router.navigate(['/perfil']);
    console.log('ver perfil');
  }
  counter(i: number) {
    return new Array(i);
}

editarEjercicio(ejercicio:any){
  const dialogRef = this.dialog.open(NuevoejercicioComponent, {
    panelClass: 'js-dialog',  data: {ejercicio}   
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(result)
    if (!result === true ) return;
    for (let i = 0; i < this.ejercicios.length; i++) {
      if(this.ejercicios[i].nombre==ejercicio.nombre){
        console.log(this.ejercicios)
        result.d=false;
        result.dificultad=parseInt(result.dificultad)
        this.ejercicios[i]=result;
        this.ejerciciosValid=this.ejercicios;
        console.log(this.ejercicios)
      }
   }
  } );
}


filtroTipoChange(){
  console.log(this.filtroTipo.value);
  if(this.filtroTipo.value=="Todos"){
    this.ejerciciosValid=this.ejercicios;
    this.filtroEjercicio.setValue("");
  }else{
    this.ejerciciosValid=this.ejercicios.filter((e:any) => e.tipo === this.filtroTipo.value);
    this.buscarEjercicio()
  }
}
nuevoBloque(){
  const dialogRef = this.dialog.open(NuevoBloqueComponent, {
    panelClass: 'js-dialog',  data: { }   
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(result)
    if (!result === true ) return;
    this.bloques.push(result);
    console.log(this.bloques)
  }
  );
}


verBloque(){
  console.log('ver bloque');
  const dialogRef = this.dialog.open(BloquesComponent, {
    panelClass: 'js-dialog',  data: { }   
  });
}

buscarEjercicio(){
  if(this.filtroEjercicio.value==""){
    if(this.filtroTipo.value=="Todos"){
      this.ejerciciosValid=this.ejercicios;
    }else{
      this.filtroTipoChange()
    }
  }else{
  if(this.filtroTipo.value != "Todos"){
    this.ejerciciosValid=this.ejerciciosValid.filter((e:any) => e.nombre.toUpperCase().includes(this.filtroEjercicio.value.toUpperCase()));  
  }else{
    this.ejerciciosValid=this.ejercicios.filter((e:any) => e.nombre.toUpperCase().includes(this.filtroEjercicio.value.toUpperCase())); 
  }
}
}

eliminarBloque(b:any){
  if (window.confirm("Esta seguro que desea eliminar el bloque?")) {
    for (let i = 0; i < this.bloques.length; i++) {
      if(this.bloques[i].nombre==b.nombre){
        this.bloques.splice(i,1);
      }
    }
  }}

  bSize(b:any){
    return b.ejercicios.length;
  }
  bTime(b:any){
    let time=0;
    for (let i = 0; i < b.ejercicios.length; i++) {
      time+=parseInt(b.ejercicios[i].duracion);
    }
    return time;
  }

  bDificultadPromedio(b:any){
    let dif=0;
    for (let i = 0; i < b.ejercicios.length; i++) {
      dif+=parseInt(b.ejercicios[i].dificultad);
    }
    return dif/b.ejercicios.length;
  }

  editarBloque(b:any){
    const dialogRef = this.dialog.open(NuevoBloqueComponent, {
      panelClass: 'js-dialog',  data: {b}   
    });
  }
}

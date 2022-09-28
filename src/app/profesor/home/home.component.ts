import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NuevoejercicioComponent } from '../nuevoejercicio/nuevoejercicio.component';
import { BloquesComponent } from '../bloques/bloques.component';
import { NuevoBloqueComponent } from '../nuevo-bloque/nuevo-bloque.component';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ver=""
  bloques:any=[{nombre: 'fuerza', descripcion: 'Mejora tu fuerza', ejercicios: [{
    tipo: 'Aerobico',
    nombre: 'Correr',
    descripcion: 'Correr 15 minutos',
    zonaMuscular: 'Piernas',
    dificultad: 1,
    duracion: "15 minutos",
    materiales: 'Zapatillas',
    video: 'https://www.youtube.com/watch?v=FK_4xr3pn14',
  },{
    tipo: 'Aerobico',
    nombre: 'Nadar',
    descripcion: 'Nadar 15 minutos',
    zonaMuscular: 'Piernas',
    dificultad: 5,
    duracion: "15 minutos",
    materiales: 'Traje de baño',
    video: '',
  }]},
               {nombre: 'resistencia', descripcion: 'Mejora tu resistencia', ejercicios: [{nombre: 'Sentadilla', descripcion: 'Sentadilla con barra', tipo: 'Fuerza',zonaMuscular:"pierna", dificultad: 3, video: 'https://www.youtube.com/watch?v=QXeEoD0pB3E'}]}]

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
    video: 'https://www.youtube.com/watch?v=FK_4xr3pn14',
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
    video: '',
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
    video: 'https://www.youtube.com/watch?v=BjixzWEw4EY',},
    {
      tipo: 'Mixto',
      nombre: 'Abdominales',
      descripcion: '15 abdominales',
      zonaMuscular: 'Abdomen',
      dificultad: 5,
      duracion: "15 minutos",
      materiales: 'Ninguno',
      video: 'https://www.youtube.com/watch?v=dkq-hCgoQdI',
      d:false
    },
  
  {
    tipo: 'Anaerobico',
    nombre: 'Flexiones',
    descripcion: '15 flexiones',
    zonaMuscular: 'Pecho',
    dificultad: 3,
    duracion: "15 minutos",
    materiales: 'Ninguno',
    video: 'https://www.youtube.com/watch?v=e_EKkqoHxns',
    d:false
  }];

  

  
  public filtroTipo: FormControl = new FormControl("Todos");
  public filtroEjercicio: FormControl = new FormControl()
  sinBloques=false
  sinEjercicios=false
  usuarioActual= this.auth.actualUser;
    
  constructor( private router: Router, public dialog: MatDialog, private _sanitizer: DomSanitizer, private auth:AuthService) { }

  ngOnInit(): void {
    console.log(this.auth.actualUser)
    this.ejerciciosValid=this.ejercicios;
    this.usuarioActual= this.auth.actualUser;
    console.log(this.usuarioActual)
  }
  cerrarSesion(){
    this.usuarioActual=null;
    this.auth.actualUser=null;
    this.router.navigate(['/login']);
  }
  embebido(url:any){
    return url.replace("watch?v=", "embed/");
  }

  verVideo(video:any){
    return this._sanitizer.bypassSecurityTrustResourceUrl(this.embebido(video));
  }

  
  eliminarEjercicio(ejercicio:any){
    for (let i = 0; i < this.bloques.length; i++) {
      for (let j = 0; j < this.bloques[i].ejercicios.length; j++) {
        if(this.bloques[i].ejercicios[j].nombre==ejercicio){
          alert("No se puede eliminar el ejercicio porque esta en un bloque")
          return 
        }
      }  
    }
    if (window.confirm("Esta seguro que desea eliminar el ejercicio?")) {
      for (let i = 0; i < this.ejercicios.length; i++) {
        if(this.ejercicios[i].nombre==ejercicio){
          this.ejercicios.splice(i,1);
        }
     }
    }    
    if(this.ejercicios.length==0){
      this.sinEjercicios=true;
    }
  }
  nuevoEjercicio(){
    var nombresEjercicios:any=[]
    for (let i = 0; i < this.ejercicios.length; i++) {
      nombresEjercicios.push(this.ejercicios[i].nombre.toLocaleUpperCase());
    }
    console.log(nombresEjercicios);
    const dialogRef = this.dialog.open(NuevoejercicioComponent, {
      height: '75%',width: '60%',
      panelClass: 'js-dialog',  data: {nombresEjercicios:nombresEjercicios }   
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result === true ) return;
      this.ejercicios.push(result);
      this.sinEjercicios=false;
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
  var nombresEjercicios:any=[]
    for (let i = 0; i < this.ejercicios.length; i++) {
      nombresEjercicios.push(this.ejercicios[i].nombre.toLocaleUpperCase());
    }
  const dialogRef = this.dialog.open(NuevoejercicioComponent, { 
    height: '75%',width: '60%',
    panelClass: 'js-dialog',  data: {ejercicio,nombresEjercicios}   
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(result)
    if (!result === true ) return;
    for (let i = 0; i < this.ejercicios.length; i++) {
      if(this.ejercicios[i].nombre==ejercicio.nombre){
        console.log(this.ejercicios)
        result.d=false;
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
  var e=[]
  for (let i = 0; i < this.ejercicios.length; i++) {
    e.push(this.ejercicios[i]);
  }
  const dialogRef = this.dialog.open(NuevoBloqueComponent, {
    disableClose: true,
    panelClass: 'js-dialog',  data: {e}   
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(result)
    if(!result){
      console.log(this.ejercicios)
      return;
    }else{
      this.bloques.push(result);
      console.log(this.bloques)
      this.sinBloques=false
      console.log(this.ejercicios)
    }
    }
  );
  console.log(this.ejercicios)

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
  }
  if(this.bloques.length==0){
    this.sinBloques=true;
  }
  }

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
    return (dif/b.ejercicios.length).toFixed(2);
  }

  editarBloque(b:any){
  var e=[]
  for (let i = 0; i < this.ejercicios.length; i++) {
    e.push(this.ejercicios[i]);
  }
    const dialogRef = this.dialog.open(NuevoBloqueComponent, {
    disableClose: true,
      panelClass: 'js-dialog',  data: {b,e}   
    });
    dialogRef.afterClosed().subscribe(result => {
      if(!result){
        return;
      }else{
        for (let i = 0; i < this.bloques.length; i++) {
          if(this.bloques[i].nombre==b.nombre){
            this.bloques[i]=result;
          }
        }
      }
  })
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NuevoejercicioComponent } from '../nuevoejercicio/nuevoejercicio.component';
import { BloquesComponent } from '../bloques/bloques.component';
import { NuevoBloqueComponent } from '../nuevo-bloque/nuevo-bloque.component';
import { DomSanitizer } from '@angular/platform-browser';

import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ver="alumnos"
  index:any
  pageEvent:any;
  pageSize=4
  pageIndex=1
  busquedaError=false;
  bloques:any=[{nombre: 'fuerza', descripcion: 'Mejora tu fuerza', ejercicios: [{
    tipo: 'Aerobico',
    nombre: 'Correr',
    descripcion: 'Correr recto maxima velocidad',
    zonaMuscular: 'Piernas',
    dificultad: 1,
    duracion: "15 minutos",
    materiales: 'Zapatillas',
    video: 'https://www.youtube.com/watch?v=FK_4xr3pn14',
  },{
    tipo: 'Aerobico',
    nombre: 'Nadar',
    descripcion: 'Nadar pecho',
    zonaMuscular: 'Todo el cuerpo',
    dificultad: 5,
    duracion: "15 minutos",
    materiales: 'Traje de baño',
    video: '',
  }]},
               {nombre: 'resistencia', descripcion: 'Mejora tu resistencia', ejercicios: [{nombre: 'Sentadillas', descripcion: 'Sentadilla con barra', tipo: 'Fuerza',zonaMuscular:"pierna", dificultad: 3, video: 'https://www.youtube.com/watch?v=QXeEoD0pB3E'},
               {
                tipo: 'Aerobico',
                nombre: 'Nadar',
                descripcion: 'Nadar 15 minutos',
                zonaMuscular: 'Piernas',
                dificultad: 5,
                duracion: "15 minutos",
                materiales: 'Traje de baño',
                video: '',
              } ]}]

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
    descripcion: 'Correr recto maxima velocidad',
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
    descripcion: 'Nadar pecho',
    zonaMuscular: 'Todo el cuerpo',
    dificultad: 5,
    duracion: "20 minutos",
    materiales: 'Traje de baño',
    video: '',
    d:false
  },
  {
    tipo: 'Anaerobico',
    nombre: 'Sentadillas',
    descripcion: 'sentdaillas con barra',
    zonaMuscular: 'Piernas',
    d:false,
    dificultad: 4,
    duracion: "15 repeticiones",
    materiales: 'Banco',
    video: 'https://www.youtube.com/watch?v=BjixzWEw4EY',},
    {
      tipo: 'Mixto',
      nombre: 'Abdominales',
      descripcion: 'Abdominales cortos sin peso',
      zonaMuscular: 'Abdomen',
      dificultad: 5,
      duracion: "20 repeticiones",
      materiales: 'Ninguno',
      video: 'https://www.youtube.com/watch?v=dkq-hCgoQdI',
      d:false
    },
  
  {
    tipo: 'Anaerobico',
    nombre: 'Flexiones',
    descripcion: 'Flexiones con aplauso',
    zonaMuscular: 'Pecho',
    dificultad: 5,
    duracion: "10 repeticiones",
    materiales: 'Ninguno',
    video: 'https://www.youtube.com/watch?v=e_EKkqoHxns',
    d:false
  }];

  

  
  public filtroTipo: FormControl = new FormControl("Todos");
  public filtroEjercicio: FormControl = new FormControl("")
  sinBloques=false
  sinEjercicios=false
  usuarioActual= this.auth.actualUser;
  pageLenght:any;
    
  constructor( private router: Router, public dialog: MatDialog, private _sanitizer: DomSanitizer, private auth:AuthService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.ejerciciosValid=this.ejercicios;
    this.pageLenght=this.ejerciciosValid.length;
    this.usuarioActual= this.auth.actualUser;
    this.ejerciciosValid=this.ejerciciosValid.slice(0,this.pageSize)
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
          this.ejerciciosValid=this.ejercicios;
          this.filtroTipo.setValue("Todos")
          this.filtroEjercicio.setValue("")
          this.index=0

          this.buscarEjercicio()
          this.snackbar.open("Ejercicio eliminado con exito", "Cerrar", { duration: 4000, });
          //this.pageLenght=this.ejerciciosValid.length;
          //this.ejerciciosValid=this.ejerciciosValid.slice(0,this.pageSize)
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
    const dialogRef = this.dialog.open(NuevoejercicioComponent, {
      height: '75%',width: '60%',
      panelClass: 'js-dialog',  data: {nombresEjercicios:nombresEjercicios }   
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result === true ) return;
      this.ejercicios.push(result);
      this.sinEjercicios=false;
      this.filtroTipo.setValue("Todos");
      this.filtroEjercicio.setValue("");
      this.ejerciciosValid=this.ejercicios;
      this.buscarEjercicio()
      this.snackbar.open("Ejercicio creado con exito", "Cerrar", { duration: 4000, });
      //this.pageLenght=this.ejerciciosValid.length;
      //this.ejerciciosValid=this.ejerciciosValid.slice(0,this.pageSize)
    } );
  }
  verPerfil(){
    this.router.navigate(['/perfil']);
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
    if (!result === true ) return;
    for (let i = 0; i < this.ejercicios.length; i++) {
      if(this.ejercicios[i].nombre==ejercicio.nombre){
        result.d=false;
        this.ejercicios[i]=result;
        this.filtroTipo.setValue("Todos");
        this.filtroEjercicio.setValue("");
        this.ejerciciosValid=this.ejercicios;
        this.buscarEjercicio()
        this.snackbar.open("Ejercicio editado con exito", "Cerrar", { duration: 4000, });
      }
   }
  } );
}


filtroTipoChange(){
  if(this.filtroTipo.value=="Todos"){
    this.ejerciciosValid=this.ejercicios;
    this.filtroEjercicio.setValue("");
    this.pageLenght=this.ejerciciosValid.length;
    this.ejerciciosValid=this.ejerciciosValid.slice(0,this.pageSize)
  }else{
    this.ejerciciosValid=this.ejercicios.filter((e:any) => e.tipo === this.filtroTipo.value);
    //this.pageLenght=this.ejerciciosValid.length;
    this.pageLenght=this.ejerciciosValid.length;
    this.ejerciciosValid=this.ejerciciosValid.slice(0,this.pageSize)
    this.buscarEjercicio()
  }
}

userPerfil(any:any){
  this.auth.verPerfil=any;
  this.router.navigate(['/perfil']);
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
    if(!result){
      return;
    }else{
      this.bloques.push(result);
      this.sinBloques=false
      this.snackbar.open("Bloque creado con exito", "Cerrar", { duration: 4000, });
    }
    }
  );

}


verBloque(){
  const dialogRef = this.dialog.open(BloquesComponent, {
    panelClass: 'js-dialog',  data: { }   
  });
}

buscarEjercicio(){
  this.busquedaError=false;
  if(this.filtroEjercicio.value==""){
    if(this.filtroTipo.value=="Todos"){
      this.ejerciciosValid=this.ejercicios;
      this.pageLenght=this.ejerciciosValid.length;
      this.ejerciciosValid=this.ejerciciosValid.slice(0,this.pageSize)
    }else{
      this.filtroTipoChange()
    }
  }else{
  if(this.filtroTipo.value != "Todos"){
    this.ejerciciosValid=this.ejerciciosValid.filter((e:any) => e.nombre.toUpperCase().includes(this.filtroEjercicio.value.toUpperCase()));
    if(this.ejerciciosValid.length==0){
      this.busquedaError=true;
    }else{
      this.busquedaError=false;
    }
  }else{
    this.ejerciciosValid=this.ejercicios.filter((e:any) => e.nombre.toUpperCase().includes(this.filtroEjercicio.value.toUpperCase())); 
    if(this.ejerciciosValid.length==0){
      this.busquedaError=true;
    }else{
      this.busquedaError=false;
    }
  }

this.pageLenght=this.ejerciciosValid.length;
}
}

eliminarBloque(b:any){
  if (window.confirm("Esta seguro que desea eliminar el bloque?")) {
    for (let i = 0; i < this.bloques.length; i++) {
      if(this.bloques[i].nombre==b.nombre){
        this.bloques.splice(i,1);
        this.snackbar.open("Bloque eliminado con exito", "Cerrar", { duration: 4000, });
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

  paginador(any:any){
    this.buscarEjercicio()
    this.ejerciciosValid=this.ejercicios.slice(any.pageIndex*any.pageSize,any.pageIndex*any.pageSize+any.pageSize);
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
            this.snackbar.open("Bloque editado con exito", "Cerrar", { duration: 4000, });
          }
        }
      }
  })
  }
}

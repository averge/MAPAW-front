import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-nuevo-bloque',
  templateUrl: './nuevo-bloque.component.html',
  styleUrls: ['./nuevo-bloque.component.scss']
})
export class NuevoBloqueComponent implements OnInit {

  ejerciciosSeleccionados: any[] = [];
  todosLosEjercicios=this.data.e
  ejerciciosDisponibles=this.data.e
  guardado:any=[]


  constructor(public dialogRef: MatDialogRef<NuevoBloqueComponent>, @Inject(MAT_DIALOG_DATA) private data: any) { }
  
  formBloque = new FormGroup({
     nombre: new FormControl('', Validators.required),
     descripcion: new FormControl('', Validators.required),
     ejercicios: new FormControl(''),
  });
  public buscar: FormControl = new FormControl("");
  
  
  ngOnInit(): void {
    if(this.data.b){
      for (let i = 0; i < this.data.b.ejercicios.length; i++) {
        this.guardado.push(this.data.b.ejercicios[i])
      }
      this.formBloque.setValue(this.data.b);
      this.ejerciciosSeleccionados = this.data.b.ejercicios;
      this.ejerciciosDisponibles = this.data.e.filter((ejercicio: { nombre: any; }) => !this.ejerciciosSeleccionados.some((ejercicioSeleccionado: { nombre: any; }) => ejercicioSeleccionado.nombre === ejercicio.nombre));
    }
  }

  buscarEjercicio(){
    if(this.buscar.value == ''){
      this.ejerciciosDisponibles = this.data.e.filter((ejercicio: { nombre: any; }) => !this.ejerciciosSeleccionados.some((ejercicioSeleccionado: { nombre: any; }) => ejercicioSeleccionado.nombre === ejercicio.nombre));
    }else{
      this.ejerciciosDisponibles = this.data.e.filter((ejercicio: { nombre: any; }) => !this.ejerciciosSeleccionados.some((ejercicioSeleccionado: { nombre: any; }) => ejercicioSeleccionado.nombre === ejercicio.nombre) && ejercicio.nombre.toLowerCase().includes(this.buscar.value.toLowerCase()));
    }
  
  }

  guardarBloque(){
    if(this.ejerciciosSeleccionados.length > 1){
      this.formBloque.value.ejercicios = this.ejerciciosSeleccionados;
      if (this.formBloque.valid) {
        this.dialogRef.close(this.formBloque.value);
      }
  }}

  cancelar(){
    if (this.data.b){
      this.data.b.ejercicios = this.guardado;
    }
    this.dialogRef.close(false);
  }

  agregarEjercicio(e: any){
    this.ejerciciosSeleccionados.push(e);
    this.ejerciciosDisponibles = this.ejerciciosDisponibles.filter((ejercicio: { nombre: any; }) => !this.ejerciciosSeleccionados.some((ejercicioSeleccionado: { nombre: any; }) => ejercicioSeleccionado.nombre === ejercicio.nombre));
    this.buscar.setValue('');
    this.buscarEjercicio();
  }

  eliminarEjercicio(ejercicio: any){
    this.ejerciciosDisponibles.push(ejercicio);
    this.ejerciciosSeleccionados = this.ejerciciosSeleccionados.filter((ejercicioSeleccionado: { nombre: any; }) => ejercicioSeleccionado.nombre !== ejercicio.nombre);

  }

  onNoClick(): void {    
    this.cancelar();
  }

}

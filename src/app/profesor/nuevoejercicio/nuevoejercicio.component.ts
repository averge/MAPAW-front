import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
    duracion: new FormControl('', Validators.required),
    dificultad: new FormControl('', Validators.required),
    zonaMuscular: new FormControl('', Validators.required),
    materiales: new FormControl(''),
    video: new FormControl(''),
  });
  dificultades = [1,2,3,4,5];
videoErro=false
nombreError=false
  constructor(public dialogRef: MatDialogRef<NuevoejercicioComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
    if(this.data.ejercicio){
      this.fomularioEjercicio.patchValue(this.data.ejercicio)
      this.fomularioEjercicio.controls['dificultad'].setValue(this.data.ejercicio.dificultad)
    }
  }

  nuevoEjercicio() {
    if(this.fomularioEjercicio.valid && !this.nombreError){
      if(this.fomularioEjercicio.value.video != ''){
        if(!this.fomularioEjercicio.value.video.includes('https://www.youtube.com/watch?v=')){
          this.videoErro=true
          this.fomularioEjercicio.invalid
          console.log('video invalido');
        }
      else{
        console.log(this.fomularioEjercicio.value);
        this.dialogRef.close(this.fomularioEjercicio.value);
      }
    }
        else{
          this.videoErro=false
          this.fomularioEjercicio.valid
          this.dialogRef.close(this.fomularioEjercicio.value);
        }
      
  }}

  verficarNombre(){
    if(this.data.nombresEjercicios.includes(this.fomularioEjercicio.controls['nombre'].value.toUpperCase())){
      this.nombreError=true
    }else{
      this.nombreError=false
    }
  }

  
  
    cancelar(){
    this.dialogRef.close(false);
    console.log('cancelar');
  }
  
}

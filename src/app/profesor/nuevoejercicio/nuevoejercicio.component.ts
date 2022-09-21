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
videoErro=false
  constructor(public dialogRef: MatDialogRef<NuevoejercicioComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  nuevoEjercicio() {
    if(this.fomularioEjercicio.valid){
      if(this.fomularioEjercicio.value.video != ''){
        if(!this.fomularioEjercicio.value.video.includes('https://www.youtube.com/watch?v=')){
          this.videoErro=true
          this.fomularioEjercicio.invalid
          console.log('video invalido');
        }
      else{
        this.dialogRef.close(this.fomularioEjercicio.value);
      }
    }
        else{
          this.videoErro=false
          this.fomularioEjercicio.valid
          this.dialogRef.close(this.fomularioEjercicio.value);
        }
      
  }}

  cancelar(){
    this.dialogRef.close(false);
    console.log('cancelar');
  }
  
}

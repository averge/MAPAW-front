import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
esProfesor = false;
  registerForm = new FormGroup({
    user: new FormControl('', Validators.required),
    mail: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    fechaNacieminto: new FormControl('', Validators.required),
    sexo: new FormControl('', Validators.required),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(7)]),
    dni: new FormControl('', [Validators.required, Validators.minLength(7)]),
    rol: new FormControl('A', Validators.required),
    plan: new FormControl(''),
    dolencias: new FormControl(''),

  });
  constructor(private router: Router,) { }

  ngOnInit(): void {
  }
  register() {
    if( this.registerForm.valid ){
      console.log(this.registerForm);
      this.router.navigate(['/login']);
    }
  }

  iniciarSesion(){
    this.router.navigate(['/login']);
  }

  validateTelefono(){
    this.registerForm.controls['telefono'].setValue(this.registerForm.controls['telefono'].value.replace(/[^0-9]/g, ''));
  }
  validateDni(){
    this.registerForm.controls['dni'].setValue(this.registerForm.controls['dni'].value.replace(/[^0-9]/g, ''));
    if (this.registerForm.controls['dni'].value.length > 8){
      this.registerForm.controls['dni'].setValue(this.registerForm.controls['dni'].value.substring(0, 8));
    }
  }
  cambioRol(){
    if(this.registerForm.controls['rol'].value == 'P'){
      this.esProfesor = true;
    }else{
      this.esProfesor = false;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  usuario= {
    nombre: 'Juan',
    apellido: 'Perez',
    dni: '12345678',
    fechaNacimiento: '01/01/1990',
    sexo: 'M',
    telefono: '123456789',
    mail: 'aaa@aaa.com',
    rol: 'A',
    plan: '1',
    dolencias: 'ninguna',
  };
  actualUser=this.auth.actualUser;

  constructor( private router: Router,private auth:AuthService) { }

  ngOnInit(): void {
  }
  cerrarSesion(){
    this.actualUser=null;
    this.auth.actualUser=null;
    this.router.navigate(['/login']);
  }
  volver(){
    this.router.navigate(['/profesor']);
  }

}

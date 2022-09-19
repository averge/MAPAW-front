import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}

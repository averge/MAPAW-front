import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  login1(user: any){
    return this.http.post('http://localhost:3000/api/login', user);
  }

  login(user: any){
    var usuario={nombre: 'Juan', apellido: 'Perez', edad: 20, sexo: 'Masculino', email: 'jj@jj.com', plan: 2}
    return usuario;
  }

}

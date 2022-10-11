import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute, RouterLink, Router } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario.service';
import { AuthService } from '../../servicios/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error=false
  loginForm = new FormGroup({
    user: new FormControl('', Validators.required),
    pass: new FormControl('', Validators.required),
  });
  hide = true;
  users:any = [
    {user: "admin", mail: "admin@admin", pass: "admin", nombre: "admin", apellido: "admin", telefono: "123456789", dni: "12345678", rol: "P", plan: "", dolencias: "", fechaNacieminto: "2020-01-01"},
  ]
  usuarios = []
  email = '';
  password = '';
  constructor( private activeoute: ActivatedRoute, private router: Router, public service:UsuarioService, private auth:AuthService ) { }

  ngOnInit(): void {
    if (this.auth.sharingValue != null){
      this.users.push(this.auth.sharingValue);
      this.auth.sharingValue = null;
    }
  }


  login() {
    this.error = false;
    if( this.loginForm.valid ){
      if( this.users.find( (usuario: { user: any; pass: any;rol:any}) => usuario.user == this.loginForm.value.user && usuario.pass == this.loginForm.value.pass && usuario.rol== "P" ) ){
        this.auth.actualUser = this.users.find( (usuario: { user: any; pass: any; }) => usuario.user == this.loginForm.value.user && usuario.pass == this.loginForm.value.pass );
        this.router.navigate(['/profesor']);
      }else{
        this.error = true;
      }
    }
  }
  register() {
    this.router.navigate(['/register']);
  }

}

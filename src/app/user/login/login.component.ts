import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute, RouterLink, Router } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario.service';
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
  usuarios = [{
    user: 'admin',
    pass: 'admin'
  },
  { user: 'profesor',
    pass: 'profesor'
  }]
  email = '';
  password = '';
  constructor( private activeoute: ActivatedRoute, private router: Router, public service:UsuarioService ) { }

  ngOnInit(): void {
  }


  login() {
    this.error = false;
    if( this.loginForm.valid ){
      if( this.usuarios.find( usuario => usuario.user == this.loginForm.value.user && usuario.pass == this.loginForm.value.pass ) ){
        this.router.navigate(['/profesor']);
      }else{
        this.error = true;
      }
    }
  }
  register() {
    console.log('register');
    this.router.navigate(['/register']);
    //this.activeoute.navigate(['/register']);
  }

}

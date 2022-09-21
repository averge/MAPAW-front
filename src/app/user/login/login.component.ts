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
  
  loginForm = new FormGroup({
    user: new FormControl('', Validators.required),
    pass: new FormControl('', Validators.required),
  });
  email = '';
  password = '';
  constructor( private activeoute: ActivatedRoute, private router: Router, public service:UsuarioService ) { }

  ngOnInit(): void {
  }


  login() {
    if( this.loginForm.valid ){
    console.log(this.loginForm, this.password);
    this.router.navigate(['/profesor']);
    }
  }
  register() {
    console.log('register');
    this.router.navigate(['/register']);
    //this.activeoute.navigate(['/register']);
  }

}

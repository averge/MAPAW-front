import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sharingObject: any;
  private actual:any;
  constructor(private http: HttpClient, private router: Router) { }

  get sharingValue() {
    return this.sharingObject
  }

  set sharingValue(obj) {
    this.sharingObject = obj;
  }

  set actualUser(obj){
    this.actual = obj;
  }
  
  get actualUser(){
    console.log(this.actual)
    return this.actual;
  }
  login(email: string, password: string) {
    this.http.post('http://localhost:3000/api/login', { email, password })
      .subscribe((res: any) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/profesor']);
      });
  }
}

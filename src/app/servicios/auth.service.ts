import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }


  login(email: string, password: string) {
    this.http.post('http://localhost:3000/api/login', { email, password })
      .subscribe((res: any) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/profesor']);
      });
  }
}

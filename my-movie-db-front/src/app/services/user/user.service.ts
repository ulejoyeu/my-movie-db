import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import User from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = "http://localhost";
  private port: number = 3000;

  constructor(private httpClient: HttpClient) { }

  connect(login: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(`${this.url}:${this.port}/user/login`, { login: login, password: password})
      .subscribe(res => {
        console.log(res);
        if(res['token']) {
          localStorage.setItem('token', res['token']);
          resolve(true);
        } else {
          reject(true);
        }
      });
    });
  }

  disconnect() {
    localStorage.removeItem('token');
  }

  details(): Observable<any> {
    return this.httpClient.get(`${this.url}:${this.port}/user/details`);
  } 

  getMyMovies(): Observable<any> {
    return this.httpClient.get(`${this.url}:${this.port}/user/movies`);
  }
}

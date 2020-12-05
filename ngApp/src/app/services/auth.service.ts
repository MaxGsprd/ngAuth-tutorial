import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register";

  constructor(private http :HttpClient) { }

  saveUser(user: any) :Observable<any>{
    return this.http.post<any>(this._registerUrl, user)
  }
}

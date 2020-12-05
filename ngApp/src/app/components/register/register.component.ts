import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {
    "email": null,
    "password": null
  };

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }

  registerUser() {
    this._auth.saveUser(this.registerUserData)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
  }
}

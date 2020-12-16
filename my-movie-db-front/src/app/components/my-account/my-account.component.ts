import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  login: string;
  password: string;
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = null;
    this.details();
  }

  connected(): boolean {
    return localStorage.getItem('token') != null;
  }

  logIn() {
    this.userService.connect(this.login, this.password).then(res => {
      this.details();
    });
  }

  logOut() {
    this.userService.disconnect();
    this.user = null;
  }

  details() {
    this.userService.details().subscribe(
      res => this.user = res as User,
      err => {
        console.log(err);
      });
  }
}

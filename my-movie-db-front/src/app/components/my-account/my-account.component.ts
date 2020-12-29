import { Component, OnInit } from '@angular/core';
import Movie from 'src/app/models/Movie';
import User from 'src/app/models/User';
import { MyMovieDbService } from 'src/app/services/my-movie-db/my-movie-db.service';
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
  myMovies: Movie[] = [];
  myMoviesSplit: Array<Movie[]> = [];

  constructor(private userService: UserService, private myMovieDbService: MyMovieDbService) { }

  ngOnInit() {
    this.user = null;
    this.details();
    this.getMyMovies();
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

  getMyMovies() {
    this.userService.getMyMovies().subscribe(
      res => {
        console.log(res);
        this.myMovies = res;
        this.getMyMoviesSplit();
      },
      err => {
        console.log(err);
      });
  }

  getMyMoviesSplit() {
    let res = [];
    let n = this.myMovies.length;
    for(let i = 0; i*4 < n; i++) {
      let ligne = [];
      for(let j = 0; j < 4 && i*4 + j < n; j++) {
        ligne.push(this.myMovies[i*4 + j]);
      }
      res.push(ligne);
    }
    this.myMoviesSplit = res;
  }

  getMovieImageSrc(path: string, size: string) {
    return this.myMovieDbService.getMovieImageSrc(path, size);
  }
}

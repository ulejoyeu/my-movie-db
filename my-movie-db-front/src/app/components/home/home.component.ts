import { Component, OnInit } from '@angular/core';
import Movie from 'src/app/models/Movie';
import { MyMovieDbService } from 'src/app/services/my-movie-db/my-movie-db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  trendingMovies: Movie[] = [];
  trendingMoviesSplit: Array<Movie[]> = [];

  constructor(private myMovieDbService: MyMovieDbService) { }

  ngOnInit() {
    this.myMovieDbService.getTrendingMovies().subscribe(movies => {
      this.trendingMovies  = movies;
      this.getTrendingMoviesSplit();
      console.log(this.trendingMoviesSplit);
    });
  }

  getTrendingMoviesSplit() {
    let res = [];
    let n = this.trendingMovies.length;
    for(let i = 0; i*4 < n; i++) {
      let ligne = [];
      for(let j = 0; j < 4 && i*4 + j < n; j++) {
        ligne.push(this.trendingMovies[i*4 + j]);
      }
      res.push(ligne);
    }
    this.trendingMoviesSplit = res;
  }

  getMovieImageSrc(path: string, size: string) {
    return this.myMovieDbService.getMovieImageSrc(path, size);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Movie from 'src/app/models/Movie';
import { MyMovieDbService } from 'src/app/services/my-movie-db.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  id: number;
  movie: Movie = null;

  constructor(private myMovieDbService: MyMovieDbService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.myMovieDbService.getMovie(this.id).subscribe(movie => {
      this.movie = movie;
    });
  }

  getMovieImageSrc(size: string) {
    return this.myMovieDbService.getMovieImageSrc(this.movie.poster_path, size);
  }

  nbStars(n: number): number {
    return Math.round(n);
  }
}

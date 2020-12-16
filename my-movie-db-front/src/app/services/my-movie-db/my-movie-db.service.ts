import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Movie from '../../models/Movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyMovieDbService {
  private url: string = "http://localhost";
  private port: number = 3000;
  private language: string = "fr-FR";

  constructor(private httpClient: HttpClient) { }

  getTrendingMovies(): Observable<any> {
    return this.httpClient.get(`${this.url}:${this.port}/moviedb/trending`);
  }
  
  getMovie(id: number): Observable<any> {
    return this.httpClient.get(`${this.url}:${this.port}/moviedb/movie/${id}`);
  }

  getMovieImageSrc(path: string, size: string) {
    let definition = "w300";
    switch(size) {
        case "small":
            definition = "w300";
            break;
        case "medium":
            definition = "w780";
            break;
        case "large":
            definition = "w1280";
            break;
        case "full":
            definition = "original";
            break;
    }

    return `https://image.tmdb.org/t/p/${definition}${path}`;
  }
}

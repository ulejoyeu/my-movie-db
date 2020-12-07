import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { HttpClientModule } from '@angular/common/http';
import { MyMovieDbService } from './services/my-movie-db.service';
import { MovieComponent } from './components/movie/movie.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    MyAccountComponent,
    MovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    MyMovieDbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

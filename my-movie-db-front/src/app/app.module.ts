import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyMovieDbService } from './services/my-movie-db/my-movie-db.service';
import { MovieComponent } from './components/movie/movie.component';
import { UserService } from './services/user/user.service';
import { FormsModule } from '@angular/forms';
import { TokenInterceptorService } from './services/token-interceptor/token-interceptor.service';

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
    HttpClientModule,
    FormsModule
  ],
  providers: [
    MyMovieDbService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

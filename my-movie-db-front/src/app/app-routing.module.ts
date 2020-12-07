import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { MovieComponent } from './components/movie/movie.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recherche', component: SearchComponent },
  { path: 'mon-compte', component: MyAccountComponent },
  { path: 'film/:id', component: MovieComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

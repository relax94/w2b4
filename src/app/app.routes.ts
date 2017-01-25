import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AuthComponent } from './auth';

export const ROUTES: Routes = [
  { path: '',      component: AuthComponent },
  { path: 'home',  component: HomeComponent },
];
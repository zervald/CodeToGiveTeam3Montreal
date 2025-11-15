
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { DonnerBadgesComponent } from './pages/donner-badges/donner-badges.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'donner-badges', component: DonnerBadgesComponent },
  { path: '**', redirectTo: '' }
];

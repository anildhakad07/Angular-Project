import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Members } from './members/members';
import { SpecialThanks } from './special-thanks/special-thanks';
import { CoreTeam } from './core-team/core-team';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component:Login },
  { path: 'home', component: Home },
  { path: 'members', component: Members },
  { path: 'special-thanks', component: SpecialThanks },
  { path: 'core-team', component: CoreTeam },

  { path: '**', redirectTo: 'login' },
];

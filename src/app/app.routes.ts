import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Members } from './members/members';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password';
import { OtpVerificationComponent } from './auth/otp-verification/otp-verification';
import { ResetPasswordComponent } from './auth/reset-password/reset-password';
import { CoreTeam } from './core-team/core-team';
import { LayoutComponent } from './Layout/layout';
import { Specialthanks } from './special-thanks/special-thanks';
import { Login } from './login/login';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'otp-verify', component: OtpVerificationComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: Home },
      { path: 'member', component: Members },
      { path: 'coreteam', component: CoreTeam },
      { path: 'specialthanks', component: Specialthanks },
    ],
  },
];

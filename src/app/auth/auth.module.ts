import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { LoginComponent } from './login/login.component';
import { AuthEffects } from './state/auth.effects';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ],
  },
];
@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EffectsModule.forFeature(), // we can't get access authEffects in home page. That's why I added this effect in app.module.ts
    // StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer), //we can not reach in header component (It is in the home page). That's why we add authState in app.module.ts
    RouterModule.forChild(routes),
  ],
})
export class AuthModule {}

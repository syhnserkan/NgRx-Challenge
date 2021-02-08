import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/store/app.state';
import {
  setErrorMessage,
  setLoadingSpinner,
} from 'src/app/store/Shared/shared.actions';
import {
  autoLogin,
  loginStart,
  loginSuccess,
  signupStart,
  signupSuccess,
} from './auth.action';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      mergeMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false })); // we set loading spinner false
            this.store.dispatch(setErrorMessage({ message: '' }));
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return loginSuccess({ user });
          }),
          catchError(
            ({
              error: {
                error: { message },
              },
            }) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              const errorMessage = this.authService.getErrorMessage(message);
              return of(setErrorMessage({ message: errorMessage }));
            }
          )
        );
      })
    );
  });

  loginAndSignupRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess, signupSuccess]), // we can use one redirect effect to redirect login and signup
        tap((action) => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false } // If I remove this, it will try to return something. That's why we added.
  );

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      mergeMap((action) => {
        return this.authService.signUp(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return signupSuccess({ user });
          }),
          catchError(
            ({
              error: {
                error: { message },
              },
            }) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              const errorMessage = this.authService.getErrorMessage(message);
              return of(setErrorMessage({ message: errorMessage }));
            }
          )
        );
      })
    );
  });

  autoLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(autoLogin),
        map((action) => {
          const user = this.authService.getUserFromLocalStorage();
          console.log(user);
        })
      );
    },
    { dispatch: false }
  );

  // signUpRedirect$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(signupSuccess),
  //       tap((action) => {
  //         this.router.navigate(['/']);
  //       })
  //     );
  //   },
  //   { dispatch: false } // If I remove this, it will try to return something. That's why we added.
  // );
}

import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { AuthReducer } from '../auth/state/auth.reducer';
import { AUTH_STATE_NAME } from '../auth/state/auth.selector';
import { AuthState } from '../auth/state/auth.state';
import { SharedReducer } from './Shared/shared.reducer';
import { SHARED_STATE_NAME } from './Shared/shared.selector';
import { SharedState } from './Shared/shared.state';
// Burada app seviyesinde olması için loadingState kullanacağız.
export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  [AUTH_STATE_NAME]: AuthState; // we want to access header component (in home page). That's why we add authstate in app state. We can to acces authstate in app.
  router: RouterReducerState;
}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuthReducer,
  router: routerReducer,
};

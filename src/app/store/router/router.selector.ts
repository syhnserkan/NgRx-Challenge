import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from './custom-serializer';

export const getRouterState = createFeatureSelector<
  RouterReducerState<RouterStateUrl>
>('router');

export const getCurrentRoute = createSelector(getRouterState, (router) => {
  // router takes two parameter state and navigationId. We want to access router.state
  return router.state;
});

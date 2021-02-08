import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.state';

export const COUNTER_STATE_NAME = 'counter';

const getCounterState = createFeatureSelector<CounterState>(COUNTER_STATE_NAME); // take the counter

export const getCounter = createSelector(getCounterState, (state) => {
  // take the counter of feature(counter feat.)
  return state.counter;
});

export const getChannelName = createSelector(getCounterState, (state) => {
  // take the counter of feature(channelName feat.)
  return state.channelName;
});

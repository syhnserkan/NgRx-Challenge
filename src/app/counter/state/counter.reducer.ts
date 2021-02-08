import { createReducer, on } from '@ngrx/store';
import {
  changeChannelName,
  customIncrement,
  decrement,
  increment,
  reset,
} from './counter.actions';
import { initialState } from './counter.state';

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    return {
      // state is immutable that's why we must copy the state.
      ...state,
      counter: state.counter + 1,
    };
  }),
  on(decrement, (state) => {
    return {
      ...state,
      counter: state.counter - 1,
    };
  }),
  on(reset, (state) => {
    return {
      ...state,
      counter: 0,
    };
  }),
  on(customIncrement, (state, action) => {
    return {
      ...state,
      counter: state.counter + action.value,
    };
  }),
  on(changeChannelName, (state) => {
    return {
      ...state,
      channelName: 'Modifed Channel',
    };
  })
);

export function counterReducer(state, action) {
  return _counterReducer(state, action);
}

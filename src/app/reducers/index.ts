import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';
import { counterReducer } from './counter';

export interface AppState {
  counter: number
}

export const rootReducer = compose(storeFreeze, combineReducers)({
  counter: counterReducer
})


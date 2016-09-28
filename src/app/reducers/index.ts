import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';
import { counterReducer } from './counter';
import { userReducer } from './user';
import { reposReducer } from './repos';
import { gistsReducer } from "./gists";
import {reposLanguagesReducer} from "./repos-languages";

export interface AppState {
  counter: number
}

export const rootReducer = compose(storeFreeze, combineReducers)({
  counter: counterReducer,
  user: userReducer,
  repos: reposReducer,
  gists: gistsReducer,
  reposLanguages: reposLanguagesReducer
})


import { ActionReducer, Action } from '@ngrx/store';
import {GET_USER_GISTS_SUCCESS} from '../actions/user';
import {GithubGist} from "../models/github-gist";


export const gistsReducer: ActionReducer<GithubGist[]> = (
  state = [],
  action: Action
) => {
  if (action.type === GET_USER_GISTS_SUCCESS) {
    return action.payload;
  }

  return state;
}

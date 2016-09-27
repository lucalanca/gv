import { ActionReducer, Action } from '@ngrx/store';
import {GET_USER_SUCCESS} from '../actions/user';
import {GithubUser} from "../models/github-user";



export const userReducer: ActionReducer<GithubUser> = (
  state = {},
  action: Action
) => {
  if (action.type === GET_USER_SUCCESS) {
    return action.payload;
  }

  return state;
}

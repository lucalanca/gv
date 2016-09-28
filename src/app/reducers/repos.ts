import { ActionReducer, Action } from '@ngrx/store';
import {GET_USER_REPOS_SUCCESS, GET_USER_REPOS_PAGINATION} from '../actions/user';
import {GithubRepo} from "../models/github-repo";


import * as _ from 'lodash';

export const reposReducer: ActionReducer<GithubRepo[]> = (
  state = [],
  action: Action
) => {
  if ( action.type === GET_USER_REPOS_SUCCESS) {
    console.log('got repos', action.payload);
    return _.orderBy(action.payload, ['stargazers_count'], [ 'desc' ]);
  }

  return state;
}

import { ActionReducer, Action } from '@ngrx/store';
import {GET_USER_REPOS_SUCCESS} from '../actions/user';
import {GithubRepo} from "../models/github-repo";


import * as _ from 'lodash';

export const reposReducer: ActionReducer<GithubRepo[]> = (
  state = [],
  action: Action
) => {
  if (action.type === GET_USER_REPOS_SUCCESS) {
    return _.orderBy(action.payload, ['stargazers_count'], [ 'desc' ]);
  }

  return state;
}

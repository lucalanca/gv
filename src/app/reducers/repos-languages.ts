import { ActionReducer, Action } from '@ngrx/store';
import {GET_REPO_LANGUAGES_SUCCESS} from '../actions/user';

import * as _ from 'lodash';

export const reposLanguagesReducer: ActionReducer<Object> = (
  state = {},
  action: Action
) => {
  if (action.type === GET_REPO_LANGUAGES_SUCCESS) {
    return action.payload.reduce((acc, repoLanguages) => {
      return _.assign({}, acc, {
        [repoLanguages.repo.full_name]: repoLanguages.languages
      });
    }, {});
  }

  return state;
}

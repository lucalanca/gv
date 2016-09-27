import { Injectable } from '@angular/core';
import { GithubService } from '../github/github.service';
import { Actions, Effect } from '@ngrx/effects';

import {GET_USER, GET_USER_SUCCESS, getUserSuccess, getUserReposSuccess, getUserGistsSuccess} from'../../actions/user';

@Injectable()
export class GithubEffectsService {

  constructor(private githubService: GithubService,
              private actions$: Actions) { }

  @Effect() user$ = this.actions$
    // Listen for the 'LOGIN' action
    .ofType(GET_USER)
    // Map the payload into JSON to use as the request body
    .map(action => action.payload)
    .switchMap(handle => {
      return this.githubService.getUser(handle)
        .map(user => getUserSuccess(user))
    });

  @Effect() repos$ = this.actions$
  // Listen for the 'LOGIN' action
    .ofType(GET_USER_SUCCESS)
    // Map the payload into JSON to use as the request body
    .map(action => action.payload)
    .switchMap(user => {
      return this.githubService.getUserRepos(user.login)
        .map(repos => getUserReposSuccess(repos))
    });

  @Effect() gists$ = this.actions$
  // Listen for the 'LOGIN' action
    .ofType(GET_USER_SUCCESS)
    // Map the payload into JSON to use as the request body
    .map(action => action.payload)
    .switchMap(user => {
      return this.githubService.getUserGists(user.login)
        .map(gists => getUserGistsSuccess(gists))
    });

}

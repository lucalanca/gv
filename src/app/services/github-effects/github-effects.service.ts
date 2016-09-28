import { Injectable } from '@angular/core';
import {GithubService, GithubRequestData} from '../github/github.service';
import { Actions, Effect } from '@ngrx/effects';




import {
  GET_USER, GET_USER_SUCCESS, getUserSuccess, getUserReposSuccess, getUserGistsSuccess,
  GET_USER_REPOS_SUCCESS, getRepoLanguagesSuccess
} from'../../actions/user';
import {GithubRepo} from "../../models/github-repo";

import {Observable} from "rxjs";
import {PAGINATABLE_REQUEST_MIDDLE, PAGINATABLE_REQUEST_START, paginatableRequestStart} from "../../actions/request";
// import 'rxjs/add/observable/forkJoin';

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
        .map((response: GithubRequestData) => getUserSuccess(response.data))
    });


  @Effect() paginatableRequest$ = this.actions$
    .ofType(PAGINATABLE_REQUEST_START)
    .map(action => action.payload)
    .switchMap((requestStartData: any) => {
      const firstResponse : GithubRequestData = requestStartData.firstResponse;
      const requestEndActionCreator = requestStartData.requestEndActionCreator;
      const requestFn = requestStartData.requestFn;
      const requestArg = requestStartData.requestArg;

      const firstRequestData = firstResponse.data;
      const firstPage$ = Observable.of(firstRequestData);
      if (firstResponse.last === 0) {
        return Observable.of([firstRequestData]);
      }

      let otherRequests$ = [];
      for (let i = 1; i <= firstResponse.last; i++) {
        otherRequests$ = otherRequests$.concat([
          requestFn(requestArg, i)
            .map((response: GithubRequestData) => response.data)
        ])
      }
      return Observable.forkJoin([firstPage$].concat(otherRequests$))
        .map((allPagesData) => {
          return allPagesData.reduce((acc, currentPage) => {
            return acc.concat(currentPage);
          }, []);
        })
        .map((flattenedData) => requestEndActionCreator(flattenedData));

    });


  @Effect() repos$ = this.actions$
  // Listen for the 'LOGIN' action
    .ofType(GET_USER_SUCCESS)
    // Map the payload into JSON to use as the request body
    .map(action => action.payload)
    .switchMap(user => {
      return this.githubService.getUserRepos(user.login);
    })
    .map((response: GithubRequestData) => {
      return paginatableRequestStart({
        firstResponse: response,
        requestEndActionCreator: getUserReposSuccess,
        requestFn: this.githubService.getUserRepos.bind(this.githubService),
        requestArg: response.data[0].owner.login
      });
    });

  // @Effect() gists$ = this.actions$
  // // Listen for the 'LOGIN' action
  //   .ofType(GET_USER_SUCCESS)
  //   // Map the payload into JSON to use as the request body
  //   .map(action => action.payload)
  //   .switchMap(user => {
  //     return this.githubService.getUserGists(user.login)
  //       .map((response: GithubRequestData) => getUserGistsSuccess(response.data))
  //   });
  //

  // @Effect() languages$ = this.actions$
  // // Listen for the 'LOGIN' action
  //   .ofType(GET_USER_REPOS_SUCCESS)
  //   // Map the payload into JSON to use as the request body
  //   .map(action => action.payload)
  //   .map((response: GithubRequestData) => response.data)
  //   .switchMap((repos: GithubRepo[])=> {
  //     return Observable.forkJoin(repos.map((repo: GithubRepo) => {
  //       return this.githubService.getRepoLanguages(repo)
  //         .map(languages => ({
  //           repo,
  //           languages
  //         }));
  //     }));
  //   })
  //   .map(reposLanguages => getRepoLanguagesSuccess(reposLanguages));

}

import { Injectable } from '@angular/core';
import {Http, Response, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import {GithubUser} from "../../models/github-user";
import {GithubSearchUsersResultItem, GithubSearchUsersResult} from "../../models/github-user-search";
import {GithubRepo} from "../../models/github-repo";
import {GithubGist} from "../../models/github-gist";

const GITHUB_ROOT = 'https://api.github.com';
const GITHUB_OATH_TOKEN = '3790dad2bf45d34fc576d057d63d535188652968';

@Injectable()
export class GithubService {

  constructor (private http: Http) {}

  searchUsers (query: string): Observable<GithubSearchUsersResultItem[]> {
    return this.doGet('search/users', { q: query, sort: 'respositories' })
      .map((result : GithubSearchUsersResult) => {
        return result.items
      });
  }

  getUser (handle: string): Observable<GithubUser> {
    return this.doGet(`users/${handle}`);
  }

  getUserRepos (handle: string): Observable<GithubRepo[]> {
    return this.doGet(`users/${handle}/repos`);
  }

  getUserGists (handle: string): Observable<GithubGist[]> {
    return this.doGet(`users/${handle}/gists`);
  }

  private doGet(requestUrl: string, params: Object = {}) {
    const url = `${GITHUB_ROOT}/${requestUrl}`;

    let search: URLSearchParams = new URLSearchParams();
    search.set('access_token', GITHUB_OATH_TOKEN );
    Object.keys(params).forEach(k => search.set(k, params[k]));


    return this.http.get(url, { search })
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    return res.json();
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}

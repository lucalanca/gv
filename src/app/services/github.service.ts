import { Injectable } from '@angular/core';
import {Http, Response, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import {GithubUser} from "../models/github-user";

const GITHUB_ROOT = 'https://api.github.com';
const GITHUB_OATH_TOKEN = '3790dad2bf45d34fc576d057d63d535188652968';

@Injectable()
export class GithubService {

  constructor (private http: Http) {}

  getUser (handle: string): Observable<GithubUser> {
    const url = `${GITHUB_ROOT}/users/${handle}`;

    let params: URLSearchParams = new URLSearchParams();
    params.set('access_token', GITHUB_OATH_TOKEN );

    return this.http.get(url, { search: params })
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

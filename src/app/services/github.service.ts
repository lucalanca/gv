import { Injectable } from '@angular/core';
import {Http, Response, URLSearchParams, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {GithubUser} from "../models/github-user";

const GITHUB_ROOT = 'https://api.github.com';

@Injectable()
export class GithubService {

  constructor (private http: Http) {}

  getUser (handle: string): Observable<GithubUser> {
    const url = `${GITHUB_ROOT}/users/${handle}`;
    let headers = new Headers();
    headers.append('access_token', 'd2ad920f71ae7ff058587ed1454a02647024059d');


    return this.http.get(url, { headers: headers })
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

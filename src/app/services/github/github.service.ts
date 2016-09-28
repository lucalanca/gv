import { Injectable } from '@angular/core';
import {Http, Response, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import {GithubUser} from "../../models/github-user";
import {GithubSearchUsersResultItem, GithubSearchUsersResult} from "../../models/github-user-search";
import {GithubRepo} from "../../models/github-repo";
import {GithubGist} from "../../models/github-gist";

const GITHUB_ROOT = 'https://api.github.com';
const GITHUB_OATH_TOKEN = '3790dad2bf45d34fc576d057d63d535188652968';

export interface GithubRequestData {
  data: any;
  last: number | boolean;
}


@Injectable()
export class GithubService {

  constructor (private http: Http) {}

  searchUsers (query: string): Observable<GithubSearchUsersResultItem[]> {
    return this.doGet('search/users', { q: query, sort: 'respositories' })
      .map((response : GithubRequestData) => response.data)gigt
      .map((result : GithubSearchUsersResult) => {
        return result.items
      });
  }

  getUser (handle: string): Observable<GithubRequestData> {
    return this.doGet(`users/${handle}`);
  }

  getUserRepos (handle: string, page: number = 0): Observable<GithubRequestData> {
    return this.doGet(`users/${handle}/repos`, { page });
  }

  getUserGists (handle: string): Observable<GithubRequestData> {
    return this.doGet(`users/${handle}/gists`);
  }

  getRepoLanguages (repo: GithubRepo) {
    return this.doGet(`repos/${repo.full_name}/languages`)
      .map((response : GithubRequestData) => response.data);
  }

  private doGet(requestUrl: string, params: Object = {}) {
    const url = `${GITHUB_ROOT}/${requestUrl}`;

    let search: URLSearchParams = new URLSearchParams();
    search.set('access_token', GITHUB_OATH_TOKEN );
    Object.keys(params).forEach(k => search.set(k, params[k]));


    return this.http.get(url, { search })
      .map(this.extractData.bind(this))
      .catch(this.handleError);
  }

  private extractLastPaginationIndexFromLinkString (linkString: string) {
    if (!linkString) {
      return 0;
    }


    const lastLink = linkString
      .split(',')
      .map((link) => {
        let linksInfo = link.split('; ');
        return {
          number: +linksInfo[0].split("&page=")[1].slice(0, -1),
          type: linksInfo[1].split('"')[1]
        }
      })
      .filter((linkPart) => linkPart.type === 'last');

      if (lastLink.length > 0) {
        return lastLink[0].number;
      }

      return 0;
  }


  private extractData(res: Response) : GithubRequestData {
    const linkString = res.headers.get('link');

    return {
      data: res.json(),
      last: this.extractLastPaginationIndexFromLinkString(linkString)
    };
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

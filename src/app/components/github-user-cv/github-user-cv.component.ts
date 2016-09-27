import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import {GithubService} from "../../services/github/github.service";
import {Observable} from "rxjs";
import {GithubUser} from "../../models/github-user";
import {Store} from "@ngrx/store";
import {AppState} from "../../reducers/index";
import {getUser} from "../../actions/user";
import {GithubRepo} from "../../models/github-repo";
import {GithubGist} from "../../models/github-gist";


@Component({
  selector: 'app-github-user-cv',
  templateUrl: './github-user-cv.component.html',
  styleUrls: ['./github-user-cv.component.css']
})
export class GithubUserCvComponent implements OnInit {
  loading: boolean;
  handle: string;
  user: GithubUser;
  repos: GithubRepo[];
  gists: GithubGist[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private githubService: GithubService,
              private store: Store<AppState>) { }


  private setHandleFromRouter () {
    this.route.params.forEach((params: Params) => {
      this.handle = params['handle'];
    });
  }

  private selectFromStoreIntoProperty(name) {
    this.store
      .select(name)
      .subscribe( (value: any) => this[name] = value);
  }

  ngOnInit() {
    this.setHandleFromRouter();
    this.selectFromStoreIntoProperty('user');
    this.selectFromStoreIntoProperty('repos');
    this.selectFromStoreIntoProperty('gists');
    this.store.dispatch(getUser(this.handle));
  }
}

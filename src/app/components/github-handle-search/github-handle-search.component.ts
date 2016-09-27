import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core'
import {GithubService} from "../../services/github/github.service"
import {GithubUser} from "../../models/github-user"
import {Observable } from "rxjs"
import {AnonymousSubscription} from "rxjs/Subscription";
import {GithubSearchUsersResultItem} from "../../models/github-user-search";
import {FormControl} from "@angular/forms";

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-github-handle-search',
  templateUrl: './github-handle-search.component.html',
  styleUrls: ['./github-handle-search.component.scss']
})
export class GithubHandleSearchComponent implements OnInit {
  handleControl: FormControl = new FormControl()
  user: Observable<GithubUser>
  users: Observable<GithubSearchUsersResultItem[]>
  // previousRequest: AnonymousSubscription

  constructor(private githubService: GithubService) { }

  ngOnInit () {
    this.handleControl
      .valueChanges
      .map(newValue => {
        console.log('value changed');
        return newValue;
      })
      .debounceTime(200)
      .subscribe(newValue => this.onHandleChange(newValue))
  }

  onHandleChange(newHandle : string) {
    console.log('searching...');
    this.users = this.githubService.searchUsers(newHandle)
  }

}

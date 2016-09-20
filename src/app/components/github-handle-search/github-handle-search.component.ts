import { Component } from '@angular/core'
import {GithubService} from "../../services/github.service"
import {GithubUser} from "../../models/github-user"
import {Observable} from "rxjs"
import {AnonymousSubscription} from "rxjs/Subscription";

@Component({
  selector: 'app-github-handle-search',
  templateUrl: './github-handle-search.component.html',
  styleUrls: ['./github-handle-search.component.css']
})
export class GithubHandleSearchComponent{
  handle = ''
  user: Observable<GithubUser>
  // previousRequest: AnonymousSubscription

  constructor(private githubService: GithubService) { }

  onHandleChange(newHandle : string) {
    this.handle = newHandle
    // if (this.previousRequest) {
    //   this.previousRequest.unsubscribe();
    // }
    this.user = this.githubService.getUser(this.handle)
    // this.previousRequest = this.user.subscribe()
  }

}

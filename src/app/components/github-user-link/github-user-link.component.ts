import { Component, OnInit } from '@angular/core';
import {GithubSearchUsersResultItem} from "../../models/github-user-search";
import {Input} from "@angular/core/src/metadata/directives";

@Component({
  selector: 'app-github-user-link',
  templateUrl: './github-user-link.component.html',
  styleUrls: ['./github-user-link.component.css']
})
export class GithubUserLinkComponent implements OnInit {
  @Input('user') user: GithubSearchUsersResultItem;

  constructor() { }

  ngOnInit() {
  }

}

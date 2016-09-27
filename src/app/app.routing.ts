import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {GithubUserCvComponent} from "./components/github-user-cv/github-user-cv.component";
import {GithubHandleSearchComponent} from "./components/github-handle-search/github-handle-search.component";
import {CounterComponent} from "./components/counter/counter.component";

const appRoutes: Routes = [
  { path: 'users/:handle', component: GithubUserCvComponent },
  { path: '', component: GithubHandleSearchComponent },
  { path: 'counter', component: CounterComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

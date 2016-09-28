import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';

import { EffectsModule } from '@ngrx/effects';
import { GithubEffectsService } from './services/github-effects/github-effects.service';


import { rootReducer } from './reducers';

import { AppComponent } from './app.component';
import { CounterComponent } from './components/counter/counter.component';
import { GithubHandleSearchComponent } from './components/github-handle-search/github-handle-search.component';
import {GithubService} from "./services/github/github.service";
import { GithubUserLinkComponent } from './components/github-user-link/github-user-link.component';
import { GithubUserCvComponent } from './components/github-user-cv/github-user-cv.component';

import { routing,  appRoutingProviders }  from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    GithubHandleSearchComponent,
    GithubUserLinkComponent,
    GithubUserCvComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    StoreModule.provideStore(rootReducer),
    StoreDevtoolsModule.instrumentStore({
      monitor: useLogMonitor({
        visible: false,
        position: 'right'
      })
    }),
    StoreLogMonitorModule,
    EffectsModule.run(GithubEffectsService),
    routing
  ],
  providers: [GithubService, appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';


import { rootReducer } from './reducers';

import { AppComponent } from './app.component';
import { CounterComponent } from './components/counter/counter.component';
import { GithubHandleSearchComponent } from './components/github-handle-search/github-handle-search.component';
import {GithubService} from "./services/github.service";

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    GithubHandleSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(rootReducer),
    StoreDevtoolsModule.instrumentStore({
      monitor: useLogMonitor({
        visible: true,
        position: 'right'
      })
    }),
    StoreLogMonitorModule
  ],
  providers: [GithubService],
  bootstrap: [AppComponent]
})
export class AppModule { }

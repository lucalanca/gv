import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers/index";
import { increment, decrement, reset } from '../../actions/counter';
import { CounterState } from "../../reducers/counter";

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {

  counter: number;

  constructor(public store: Store<AppState>){
    store
      .select('counter')
      .subscribe( (counterState: CounterState) => this.counter = counterState.counter)
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset(){
    this.store.dispatch(reset());
  }

}

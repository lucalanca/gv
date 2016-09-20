import { ActionReducer, Action } from '@ngrx/store';
import { INCREMENT, DECREMENT, RESET } from '../actions/counter';

export interface CounterState {
  counter: number
}

const COUNTER_INITIAL_STATE : CounterState = {
  counter: 0
};

export const counterReducer: ActionReducer<CounterState > = (
  state = COUNTER_INITIAL_STATE ,
  action: Action
) => {
  switch (action.type) {
    case INCREMENT:
      return {
        counter: state.counter + 1
      }

    case DECREMENT:
      return {
        counter: state.counter - 1
      }

    case RESET:
      return COUNTER_INITIAL_STATE

    default:
      return state;
  }
}

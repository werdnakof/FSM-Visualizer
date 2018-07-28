import * as fromTodos from './todos'
import * as fromVstates from './states'
import * as fromTransitions from './transitions'
import * as fromAlphabets from './alpabets'
import { combineReducers } from 'redux'
import Transition from '../models/Transition';

export interface State {
  vstates: fromVstates.State
  transitions: fromTransitions.State
  alphabets: fromAlphabets.State
  todos: fromTodos.State
}

export const initialState: State = {
  vstates: {states: [
      { id: 0, label: 'a'},
      { id: 1, label: 'b' }
    ]
  },
  transitions: {
    transitions: {
      '0-1': new Transition(0, 1, 0)
    }
  },
  alphabets: {
    alphabets: {
      0: { id: 0, label: 'a-to-b' }
    }
  },
  todos: fromTodos.initialState
};

export const reducer = combineReducers<State>({
  vstates: fromVstates.reducer,
  transitions: fromTransitions.reducer,
  alphabets: fromAlphabets.reducer
});

import * as fromTodos from './todos'
import * as fromVstates from './states'
import * as fromEdges from './edges'
import * as fromAlphabets from './alpabets'
import { combineReducers } from 'redux'
import Edge from '../models/Edge';

export interface State {
  vstates: fromVstates.State
  edges: fromEdges.State
  alphabets: fromAlphabets.State
  todos: fromTodos.State
}

export const initialState: State = {
  vstates: {states: [
      { id: 0, label: 'a'},
      { id: 1, label: 'b' }
    ]
  },
  edges: {
    edges: {
      '0-1': new Edge(0, 1, 0)
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
  edges: fromEdges.reducer,
  alphabets: fromAlphabets.reducer
});

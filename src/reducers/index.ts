import * as fromVstates from './states'
import * as fromTransitions from './transitions'
import * as fromAlphabets from './alpabets'
import * as fromStateMachines from './statemachines'
import * as fromOperations from './operation'
import { combineReducers } from 'redux'

export interface State {
  vstates: fromVstates.State
  transitions: fromTransitions.State
  alphabets: fromAlphabets.State
  stateMachines: fromStateMachines.State,
  operations: fromOperations.State
}

export const initialState: State = {
  vstates: fromVstates.initialState,
  transitions: fromTransitions.initialState,
  alphabets: fromAlphabets.initialState,
  stateMachines: fromStateMachines.initialState,
  operations: fromOperations.initialState
};

export const reducer = combineReducers<State>({
  vstates: fromVstates.reducer,
  stateMachines: fromStateMachines.reducer,
  transitions: fromTransitions.reducer,
  alphabets: fromAlphabets.reducer,
  operations: fromOperations.reducer
});

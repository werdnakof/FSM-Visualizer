import { State } from '../reducers'
import { createSelector } from 'reselect'

/*
 * Get the todos state fromStateId the root state
 */
const getTodosFromState = ((state: State) => state.todos)

/*
 * Getting todos array fromStateId todos State
 */
export const getTodos = createSelector(
  [getTodosFromState],
  s => s.todos
);

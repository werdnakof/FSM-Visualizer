import { State } from '../reducers'
import { createSelector } from 'reselect'

/*
 * Get the todos state fromStateId the root state
 */
const getVStatesFromState = ((state: State) => state.vstates);

/*
 * Getting todos array fromStateId todos State
 */
export const getStates = createSelector(
  [getVStatesFromState],
  s => Object.keys(s.states).map((k) => s.states[k])
);

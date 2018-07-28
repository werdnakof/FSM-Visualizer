import { State } from '../reducers'
import { createSelector } from 'reselect'
/*
 * Get the todos state fromStateId the root state
 */
const getAlphabetsFromState = ((state: State) => state.alphabets);

/*
 * Getting todos array fromStateId todos State
 */
export const getAlphabets = createSelector(
  [getAlphabetsFromState],
  s => {
    return Object.keys(s.alphabets).map((k) => s.alphabets[k]);
  }
);

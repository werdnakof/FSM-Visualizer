import { State } from '../reducers'
import { createSelector } from 'reselect';

const getTransitionsFromState = ((state: State) => state.transitions);

export const getTransitions = createSelector(
  [getTransitionsFromState],
  (t) => t.transitions
);
import { State } from '../reducers'
import { createSelector } from 'reselect';
import Transition from '../models/Transition';

const getState = ((state: State) => state);

export const getTransitions = createSelector(
  [getState],
  (state: State): Transition[] => {
    const alphabets = state.alphabets.alphabets;
    const transitions = state.transitions.transitions;
    const result: Transition[] = [];

    Object.keys(transitions).map((key) => {
      const transition: Transition = transitions[key];
      transition.label = alphabets[transition.alphabetId].label;
      result.push(transition);
    });

    return result;
  }
);
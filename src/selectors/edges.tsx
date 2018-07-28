import { State } from '../reducers'
import { createSelector } from 'reselect';
import Edge from '../models/Edge';

const getState = ((state: State) => state);

export const getEdges = createSelector(
  [getState],
  (state: State): Edge[] => {
    const alphabets = state.alphabets.alphabets;
    const edges = state.edges.edges;
    const result: Edge[] = [];

    Object.keys(edges).map((key) => {
      const edge: Edge = edges[key];
      edge.label = alphabets[edge.alphabetId].label;
      result.push(edge);
    });

    return result;
  }
);
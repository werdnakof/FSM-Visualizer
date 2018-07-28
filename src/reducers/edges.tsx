import Edge from '../models/Edge'
import { Types, AddEdgeAction } from '../actions/edges'

export interface State {
  edges: { [id: string]: Edge; };
}

export const initialState: State = {
  edges: {
    '0-1': new Edge(0, 1, 0)
  }
};

export function reducer(
  state: State = initialState,
  action: AddEdgeAction): State {

    switch (action.type) {
      case Types.ADD_EDGE: {
        const edge: Edge = action.payload.edge;
        return {
          edges: {
            ...state.edges,
            [edge.getCode()] : edge
          }
        };
      }

      default:
          return state;
    }
}

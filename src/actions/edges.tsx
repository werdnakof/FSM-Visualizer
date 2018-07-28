import Edge from '../models/Edge'

export enum Types {
  ADD_EDGE = '[edges] ADD_EDGE',
  REMOVE_EDGE = '[edges] REMOVE_EDGE'
}

export interface AddEdgeAction {
  type: Types.ADD_EDGE,
  payload: { edge: Edge }
}

export function addEdge(e: Edge): AddEdgeAction {
    return {
      type: Types.ADD_EDGE,
      payload: { edge: e }
    }
}

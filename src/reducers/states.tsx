import VState from '../models/VState'
import { Types, AddVStateAction } from '../actions/vstates'

export interface State {
  states: { [id: string]: VState }
}

export const initialState: State = {
  states: {
    'a': { id: 0, label: 'a'},
    'b': { id: 1, label: 'b' },
    'c': { id: 2, label: 'c' }
  }
};

export function reducer(state: State = initialState,
                        action: AddVStateAction): State {

  switch (action.type) {
    case Types.ADD_VSTATE: {
      const payloadState: VState = action.payload.vstate;
      return {
        states: {
          ...state.states,
          [payloadState.label]: payloadState
        }
      }
    }

    default:
      return state
  }
}

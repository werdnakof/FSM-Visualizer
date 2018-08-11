import VState from '../models/VState'
import { Types, AddVStateAction } from '../actions/vstates'

export interface State {
  states: { [id: string]: VState }
}

export const initialState: State = {
  states: {
    'ε': { id: 0, label: 'ε'},
    'a': { id: 1, label: 'a'},
    'b': { id: 2, label: 'b' },
    'c': { id: 3, label: 'c' },
    'd': { id: 4, label: 'd' },
    // 'e': { id: 5, label: 'e' },
    // 'f': { id: 6, label: 'f' },
    // 'g': { id: 7, label: 'g' },
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

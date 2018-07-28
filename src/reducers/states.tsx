import VState from '../models/VState'
import { Types, AddVStateAction } from '../actions/vstates'

export interface State {
  states: { [id: number]: VState }
}

export const initialState: State = {
  states: [
    { id: 0, label: 'a'},
    { id: 1, label: 'b' },
    { id: 2, label: 'c' }
  ]
};

export function reducer(state: State = initialState,
                        action: AddVStateAction): State {

  switch (action.type) {
    case Types.ADD_VSTATE: {
      const ss: VState = action.payload.vstate;
      for (const s in state.states) {
        if (state.states[s].label === ss.label) return state;
      }

      return {
        states: {
          ...state.states,
          [ss.id]: ss
        }
      }
    }

    default:
      return state
  }
}

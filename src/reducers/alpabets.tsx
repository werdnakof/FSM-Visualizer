import Alphabet from '../models/Alphabet'
import { Action as AlphabetAction, Types } from '../actions/alphabets'

export interface State {
  alphabets: { [id: number]: Alphabet }
}

export const initialState: State = {
  alphabets: {
    0: { id: 0, label: 'a-to-b' },
    1: { id: 1, label: 'b-to-c' }
  }
};

export function reducer(state: State = initialState,
                        action: AlphabetAction) {

  switch (action.type) {
    case Types.ADD_ALPHABET: {

      const a: Alphabet = action.payload.alphabet;

      for (const id in state.alphabets) {
        if (state.alphabets[id].label === a.label) {
          return state;
        }
      }

      return {
        alphabets: {
          ...state.alphabets,
          [a.id]: a
        }
      }
    }

    case Types.REMOVE_ALPHABET: {
      const { [action.payload.id]: _, ...alphabets } = state.alphabets;
      return { alphabets }
    }

    default:
      return state;
  }
}
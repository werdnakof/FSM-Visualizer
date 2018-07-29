import Alphabet from '../models/Alphabet'
import { Action as AlphabetAction, Types } from '../actions/alphabets'

export interface State {
  alphabets: { [id: string]: Alphabet }
}

export const initialState: State = {
  alphabets: {
    'a-to-b': { id: 0, label: 'a-to-b' },
    'b-to-c': { id: 1, label: 'b-to-c' }
  }
};

export function reducer(state: State = initialState,
                        action: AlphabetAction) {

  switch (action.type) {
    case Types.ADD_ALPHABET: {
      const a: Alphabet = action.payload.alphabet;
      return {
        alphabets: {
          ...state.alphabets,
          [a.label]: a
        }
      }
    }

    case Types.REMOVE_ALPHABET: {
      const { [action.payload.label]: _, ...alphabets } = state.alphabets;
      return { alphabets }
    }

    default:
      return state;
  }
}
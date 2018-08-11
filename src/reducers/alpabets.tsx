import Alphabet from '../models/Alphabet'
import { Action as AlphabetAction, Types } from '../actions/alphabets'

export interface State {
  alphabets: { [id: string]: Alphabet }
}

export const initialState: State = {
  alphabets: {
    '0': { id: 0, label: '0' },
    '1': { id: 1, label: '1' },
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
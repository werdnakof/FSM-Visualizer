import Alphabet from '../models/Alphabet'
import VState from '../models/VState';

let nextAlphabetId: number = 2;

export enum Types {
  ADD_ALPHABET = '[alphabets] ADD_ALPHABET',
  REMOVE_ALPHABET = '[alphabets] REMOVE_ALPHABET'
}

export interface AddAlphabetAction {
  type: Types.ADD_ALPHABET,
  payload: { alphabet: Alphabet }
}

export interface RemoveAlphabetAction {
  type: Types.REMOVE_ALPHABET,
  payload: { id: number }
}

export function addAlphabet(character: string): AddAlphabetAction {
  return {
    type: Types.ADD_ALPHABET,
    payload: { alphabet: {
        id: nextAlphabetId++,
        label: character
      }}
  }
}

export function removeAlphabet(id: number): RemoveAlphabetAction {
  return {
    type: Types.REMOVE_ALPHABET,
    payload: { id }
  }
}

export type Action = AddAlphabetAction | RemoveAlphabetAction;
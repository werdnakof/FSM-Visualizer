import Alphabet from '../models/Alphabet'
import VState from '../models/VState';

let nextAlphabetId: number = 4;

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
  payload: { label: string }
}

export function addAlphabet(label: string): AddAlphabetAction {

  return {
    type: Types.ADD_ALPHABET,
    payload: { alphabet: {
        id: nextAlphabetId++,
        label
      }}
  }
}

export function removeAlphabet(label: string): RemoveAlphabetAction {
  return {
    type: Types.REMOVE_ALPHABET,
    payload: { label }
  }
}

export type Action = AddAlphabetAction | RemoveAlphabetAction;
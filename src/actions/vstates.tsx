import VState from '../models/VState'

let nextVStateId = 7;

export enum Types {
  ADD_VSTATE = '[vstates] ADD_VSTATE',
  REMOVE_VSTATE = '[vstates] REMOVE_VSTATE'
}

export interface AddVStateAction {
  type: Types.ADD_VSTATE,
  payload: { vstate: VState}
}

export interface RemoveVStateAction {
  type: Types.REMOVE_VSTATE,
  payload: { label: string }
}

export function addVState(label: string): AddVStateAction {
  return {
    type: Types.ADD_VSTATE,
    payload: { vstate: {
      id: nextVStateId++,
      label
    }}
  }
}

export function removeVState(label: string): RemoveVStateAction {
  return {
    type: Types.REMOVE_VSTATE,
    payload: { label }
  }
}

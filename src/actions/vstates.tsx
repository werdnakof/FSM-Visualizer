import VState from '../models/VState'

let nextVStateId = 3;

export enum Types {
  ADD_VSTATE = '[vstates] ADD_VSTATE',
  REMOVE_VSTATE = '[vstates] REMOVE_VSTATE'
}

export interface AddVStateAction {
  type: Types.ADD_VSTATE,
  payload: { vstate: VState}
}

export interface RemoveVStateAction {
  type: Types.ADD_VSTATE,
  payload: { vstate: VState}
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

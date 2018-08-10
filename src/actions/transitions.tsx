import Transition from '../models/Transition'

export enum Types {
  ADD_Transition = '[transitions] ADD_Transition',
  REMOVE_Transition = '[transitions] REMOVE_Transition'
}

export interface AddTransitionAction {
  type: Types.ADD_Transition,
  payload: { transition: Transition }
}

export interface RemoveTransitionAction {
  type: Types.REMOVE_Transition,
  payload: { label: string }
}

export function addTransition(transition: Transition): AddTransitionAction {
    return {
      type: Types.ADD_Transition,
      payload: { transition }
    }
}

export function removeTransition(label: string): RemoveTransitionAction {
  return {
    type: Types.REMOVE_Transition,
    payload: { label }
  }
}
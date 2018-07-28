import Transition from '../models/Transition'

export enum Types {
  ADD_Transition = '[transitions] ADD_Transition',
  REMOVE_Transition = '[transitions] REMOVE_Transition'
}

export interface AddTransitionAction {
  type: Types.ADD_Transition,
  payload: { transition: Transition }
}

export function addTransition(transition: Transition): AddTransitionAction {
    return {
      type: Types.ADD_Transition,
      payload: { transition }
    }
}

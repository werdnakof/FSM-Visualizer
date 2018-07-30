import StateMachine from '../models/StateMachine';

export enum Types {
  ADD_STATE_MACHINE = '[statemachines] ADD_STATE_MACHINE',
  SWITCH_STATE_MACHINE = '[statemachines] SWITCH_STATE_MACHINE',
  REMOVE_STATE_MACHINE = '[statemachines] REMOVE_STATE_MACHINE'
}

export interface AddStateMachineAction {
  type: Types.ADD_STATE_MACHINE,
  payload: { stateMachine: StateMachine }
}

export interface SwitchStateMachineAction {
  type: Types.SWITCH_STATE_MACHINE,
  payload: { id: number }
}

export function addStateMachine(label: string): AddStateMachineAction {
  return {
    type: Types.ADD_STATE_MACHINE,
    payload: {
      stateMachine: {
        label,
        startStateId: '',
        stateIds: [],
        alphabetIds: [],
        transitionIds: []
      }
    }
  }
}

export function switchStateMachine(id: number): SwitchStateMachineAction {
  return {
    type: Types.SWITCH_STATE_MACHINE,
    payload: { id }
  }
}
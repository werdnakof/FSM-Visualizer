import StateMachine from '../models/StateMachine';

export enum Types {
  ADD_STATE_MACHINE = '[statemachines] ADD_STATE_MACHINE',
  REMOVE_STATE_MACHINE = '[statemachines] REMOVE_STATE_MACHINE'
}

export interface AddStateMachineAction {
  type: Types.ADD_STATE_MACHINE,
  payload: { stateMachine: StateMachine }
}

export function addStateMachine(stateMachine: StateMachine): AddStateMachineAction {
  return {
      type: Types.ADD_STATE_MACHINE,
      payload: { stateMachine }
  }
}
import StateMachine from '../models/StateMachine';
import VState from '../models/VState';

export enum Types {
  ADD_STATE_MACHINE = '[statemachines] ADD_STATE_MACHINE',
  SWITCH_STATE_MACHINE = '[statemachines] SWITCH_STATE_MACHINE',
  REMOVE_STATE_MACHINE = '[statemachines] REMOVE_STATE_MACHINE',
  ADD_SM_START_STATE = '[statemachines] ADD_SM_START_STATE',
  ADD_SM_ACCEPTED_STATE = '[statemachines] ADD_SM_ACCEPTED_STATE',
  REMOVE_SM_ACCEPTED_STATE = '[statemachines] REMOVE_SM_ACCEPTED_STATE'
}

export interface AddStateMachineAction {
  type: Types.ADD_STATE_MACHINE,
  payload: { stateMachine: StateMachine }
}

export interface SwitchStateMachineAction {
  type: Types.SWITCH_STATE_MACHINE,
  payload: { id: number }
}

export interface AddSmStartStateAction {
  type: Types.ADD_SM_START_STATE,
  payload: { label: string }
}

export interface AddSmAcceptedStateAction {
  type: Types.ADD_SM_ACCEPTED_STATE,
  payload: { label: string }
}

export interface RemoveSmAcceptedStateAction {
  type: Types.REMOVE_SM_ACCEPTED_STATE,
  payload: { label: string }
}

export function addStateMachine(label: string): AddStateMachineAction {
  return {
    type: Types.ADD_STATE_MACHINE,
    payload: {
      stateMachine: {
        id: -1,
        label,
        startStateId: '',
        acceptedStateIds: [],
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

export function AddSMStartState(state: VState): AddSmStartStateAction {
  return {
    type: Types.ADD_SM_START_STATE,
    payload: { label: state.label }
  }
}

export function AddSmAcceptedState(state: VState): AddSmAcceptedStateAction {
  return {
    type: Types.ADD_SM_ACCEPTED_STATE,
    payload: { label: state.label }
  }
}

export function RemoveSmAcceptedState(state: VState): RemoveSmAcceptedStateAction {
  return {
    type: Types.REMOVE_SM_ACCEPTED_STATE,
    payload: { label: state.label }
  }
}
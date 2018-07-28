import StateMachine from '../models/StateMachine';
import { AddStateMachineAction, Types } from '../actions/statemachines';

let stateMachineId: number = 0;

export interface State {
  displayId: number
  stateMachines: { [id: number]: StateMachine }
}

export const initialState: State = {
  displayId: 0,
  stateMachines: {
    0: {
      label: 'Demo State Machine',
      startStateId: 0,
      stateIds: [0, 1, 2],
      alphabetIds: [0, 1],
      transitionIds: ['0-1', '1-2']
    }
  }
};

export function reducer(state: State = initialState,
                        action: AddStateMachineAction) {
  switch (action.type) {
    case Types.ADD_STATE_MACHINE: {
      const stateMachine: StateMachine = action.payload.stateMachine;
      return {
        stateMachines: {
          ...state.stateMachines,
          [stateMachineId++]: stateMachine
        }
      }
    }
    default:
      return state;
  }
}
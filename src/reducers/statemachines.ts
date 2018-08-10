import StateMachine from '../models/StateMachine';
import Alphabet from '../models/Alphabet';
import Transition from '../models/Transition';
import {
  AddSmAcceptedStateAction,
  AddSmStartStateAction,
  AddStateMachineAction, RemoveSmAcceptedStateAction,
  SwitchStateMachineAction,
  Types as SmActionType
} from '../actions/statemachines';
import { AddVStateAction, RemoveVStateAction, Types as StateActionType } from '../actions/vstates';
import { AddAlphabetAction, RemoveAlphabetAction, Types as AlphabetActionType } from '../actions/alphabets';
import { AddTransitionAction, RemoveTransitionAction, Types as TransitionActionType } from '../actions/transitions';

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
      startStateId: 'a',
      acceptedStateIds: ['c'],
      stateIds: ['a', 'b', 'c'],
      alphabetIds: ['a-to-b', 'b-to-c'],
      transitionIds: ['a-b', 'b-c']
    }
  }
};

type Action = AddStateMachineAction | SwitchStateMachineAction |
  AddVStateAction | RemoveVStateAction |
  AddAlphabetAction | RemoveAlphabetAction |
  AddTransitionAction | RemoveTransitionAction |
  AddSmStartStateAction |
  AddSmAcceptedStateAction | RemoveSmAcceptedStateAction;

export function reducer(state: State = initialState,
                        action: Action): State {

  switch (action.type) {
    case SmActionType.ADD_STATE_MACHINE: {
      const stateMachine: StateMachine = action.payload.stateMachine;
      const currentId = ++stateMachineId;
      return {
        displayId: currentId,
        stateMachines: {
          ...state.stateMachines,
          [currentId]: stateMachine
        }
      }
    }

    case SmActionType.ADD_SM_START_STATE: {
      const sm: StateMachine = state.stateMachines[state.displayId];

      return {
        ...state,
        stateMachines: {
          ...state.stateMachines,
          [state.displayId]: {
            ...sm,
            startStateId: action.payload.label
          }
        }
      }
    }

    case SmActionType.ADD_SM_ACCEPTED_STATE: {
      const sm: StateMachine = state.stateMachines[state.displayId];
      const set = new Set<string>(sm.acceptedStateIds);
      set.add(action.payload.label);

      return {
        ...state,
        stateMachines: {
          ...state.stateMachines,
          [state.displayId]: {
            ...sm,
            acceptedStateIds: Array.from(set)
          }
        }
      }
    }

    case SmActionType.REMOVE_SM_ACCEPTED_STATE: {
      const sm: StateMachine = state.stateMachines[state.displayId];
      const set = new Set<string>(sm.acceptedStateIds);
      set.delete(action.payload.label);

      return {
        ...state,
        stateMachines: {
          ...state.stateMachines,
          [state.displayId]: {
            ...sm,
            acceptedStateIds: Array.from(set)
          }
        }
      }
    }

    case SmActionType.SWITCH_STATE_MACHINE: {
      return {
        ...state,
        displayId: action.payload.id
      }
    }

    case StateActionType.ADD_VSTATE: {
      // Update state machine by the current display label
      // with the newly added state's label

      const vstate = action.payload.vstate;
      const sm: StateMachine = state.stateMachines[state.displayId];

      const set = new Set<string>(sm.stateIds);
      set.add(vstate.label);

      return {
        ...state,
        stateMachines: {
          ...state.stateMachines,
          [state.displayId]: {
            ...sm,
            stateIds: Array.from(set)
          }
        }
      }
    }

    case StateActionType.REMOVE_VSTATE: {
      const sm: StateMachine = state.stateMachines[state.displayId];

      const set = new Set<string>(sm.stateIds);
      set.delete(action.payload.label);

      return {
        ...state,
        stateMachines: {
          ...state.stateMachines,
          [state.displayId]: {
            ...sm,
            stateIds: Array.from(set)
          }
        }
      }
    }

    case AlphabetActionType.ADD_ALPHABET: {
      const alphabet: Alphabet = action.payload.alphabet;
      const sm: StateMachine = state.stateMachines[state.displayId];

      const set = new Set<string>(sm.alphabetIds);
      set.add(alphabet.label);

      return {
        ...state,
        stateMachines: {
          ...state.stateMachines,
          [state.displayId]: {
            ...sm,
            alphabetIds: Array.from(set)
          }
        }
      }
    }

    case AlphabetActionType.REMOVE_ALPHABET: {
      const sm: StateMachine = state.stateMachines[state.displayId];

      const set = new Set<string>(sm.alphabetIds);
      set.delete(action.payload.label);

      return {
        ...state,
        stateMachines: {
          ...state.stateMachines,
          [state.displayId]: {
            ...sm,
            alphabetIds: Array.from(set)
          }
        }
      }
    }

    case TransitionActionType.ADD_Transition: {
      const transition: Transition = action.payload.transition;
      const sm: StateMachine = state.stateMachines[state.displayId];
      const set = new Set(sm.transitionIds);
      set.add(transition.getId());

      return {
        ...state,
        stateMachines: {
          ...state.stateMachines,
          [state.displayId]: {
            ...sm,
            transitionIds: Array.from(set)
          }
        }
      }
    }

    case TransitionActionType.REMOVE_Transition: {
      const sm: StateMachine = state.stateMachines[state.displayId];
      const set = new Set(sm.transitionIds);
      set.delete(action.payload.label);

      return {
        ...state,
        stateMachines: {
          ...state.stateMachines,
          [state.displayId]: {
            ...sm,
            transitionIds: Array.from(set)
          }
        }
      }
    }

    default:
      return state;
  }
}
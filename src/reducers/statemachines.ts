import StateMachine from '../models/StateMachine';
import { AddStateMachineAction, Types as SmActionType } from '../actions/statemachines';
import { AddVStateAction, Types as StateActionType } from '../actions/vstates';
import { AddAlphabetAction, Types as AlphabetActionType } from '../actions/alphabets';
import Alphabet from '../models/Alphabet';
import { AddTransitionAction, Types as TransitionActionType } from '../actions/transitions';
import Transition from '../models/Transition';

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
      stateIds: ['a', 'b', 'c'],
      alphabetIds: ['a-to-b', 'b-to-c'],
      transitionIds: ['a-b', 'b-c']
    }
  }
};

type Action = AddStateMachineAction | AddVStateAction | AddAlphabetAction | AddTransitionAction;

export function reducer(state: State = initialState,
                        action: Action): State {

  switch (action.type) {
    case SmActionType.ADD_STATE_MACHINE: {
      const stateMachine: StateMachine = action.payload.stateMachine;
      const currentId = stateMachineId++;
      return {
        displayId: currentId,
        stateMachines: {
          ...state.stateMachines,
          [currentId]: stateMachine
        }
      }
    }

    case StateActionType.ADD_VSTATE: {
      // Update state machine by the current display id
      // with the newly added state's id

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

    default:
      return state;
  }
}
import { State } from '../reducers';
import { createSelector } from 'reselect';
import StateMachine from '../models/StateMachine';
import VState from '../models/VState';
import Alphabet from '../models/Alphabet';
import Transition from '../models/Transition';

const getState = ((state: State) => state);

export class StateMachineImpl {
  label: string;
  startStateId: number;

  states: VState[] = [];
  alphabets: Alphabet[] = [];
  transitions: Transition[] = [];

  constructor(state: State) {
    const toDisplay: number = state.stateMachines.displayId;
    const stateMachine: StateMachine = state.stateMachines.stateMachines[toDisplay];

    this.label = stateMachine.label;
    this.startStateId = stateMachine.startStateId;

    this.populateStates(stateMachine, state.vstates.states);
    this.populateAlphabets(stateMachine, state.alphabets.alphabets);
    this.populateTransitions(stateMachine, state.alphabets.alphabets, state.transitions.transitions);
  }

  private populateStates(stateMachine: StateMachine,
                         vstates: { [id: number]: VState }) {
    for (const id of stateMachine.stateIds) {
      this.states.push(vstates[id]);
    }
  }

  private populateAlphabets(stateMachine: StateMachine,
                            alphabets: { [id: number]: Alphabet }) {
    for (const id of stateMachine.alphabetIds) {
      this.alphabets.push(alphabets[id]);
    }
  }

  private populateTransitions(stateMachine: StateMachine,
                              alphabets: { [id: number]: Alphabet },
                              transitions: { [id: string]: Transition }) {

    const results: Transition[] = [];

    for (const id of stateMachine.transitionIds) {
      results.push(transitions[id]);
    }

    results.map((t) => {
      t.label = alphabets[t.alphabetId].label;
      this.transitions.push(t);
    });
  }
}

export const getDisplayStateMachineImpl = createSelector(
  [getState],
  (state: State): StateMachineImpl => {
    return new StateMachineImpl(state);
  }
);

export const getDisplayStateMachine = createSelector(
  [(state: State) => state.stateMachines],
  (sm) => sm.stateMachines[sm.displayId]
);
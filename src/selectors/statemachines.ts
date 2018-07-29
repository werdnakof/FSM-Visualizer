import { State } from '../reducers';
import { createSelector } from 'reselect';
import StateMachine from '../models/StateMachine';
import VState from '../models/VState';
import Alphabet from '../models/Alphabet';
import Transition from '../models/Transition';

const getState = ((state: State) => state);

export interface Edge {
  from: number,
  to: number,
  label: string
}

export class StateMachineImpl {
  label: string;
  startStateId: string;

  states: VState[] = [];
  alphabets: Alphabet[] = [];
  edges: Edge[] = [];

  constructor(state: State) {
    const toDisplay: number = state.stateMachines.displayId;
    const stateMachine: StateMachine = state.stateMachines.stateMachines[toDisplay];

    this.label = stateMachine.label;
    this.startStateId = stateMachine.startStateId;

    this.populateStates(stateMachine, state.vstates.states);
    this.populateAlphabets(stateMachine, state.alphabets.alphabets);
    this.populateTransitions(stateMachine,
                             state.vstates.states,
                             state.transitions.transitions);
  }

  private populateStates(stateMachine: StateMachine,
                         vstates: { [id: string]: VState }) {
    for (const id of stateMachine.stateIds) {
      this.states.push(vstates[id]);
    }
  }

  private populateTransitions(stateMachine: StateMachine,
                              vstates: { [id: string]: VState },
                              transitions: { [id: string]: Transition }) {

    const results: Transition[] = [];

    for (const id of stateMachine.transitionIds) {
      results.push(transitions[id]);
    }

    console.log(results);

    results.map((tran) => {
      this.edges.push({
        from: vstates[tran.from].id,
        to: vstates[tran.to].id,
        label: tran.label
      });
    });
  }

  private populateAlphabets(stateMachine: StateMachine,
                            alphabets: { [id: string]: Alphabet }) {
    for (const id of stateMachine.alphabetIds) {
      this.alphabets.push(alphabets[id]);
    }
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
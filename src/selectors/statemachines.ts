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
  label: string,
  arrows: string
}

interface Color {
  background: string,
  border: string
}

interface StartState extends VState {
  color: Color | string
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

    this.populateStates(stateMachine, state.vstates.states, stateMachine.startStateId);
    this.populateAlphabets(stateMachine, state.alphabets.alphabets);
    this.populateTransitions(stateMachine,
                             state.vstates.states,
                             state.transitions.transitions);
  }

  private populateStates(stateMachine: StateMachine,
                         vstates: { [id: string]: VState },
                         startId: string) {
    for (const id of stateMachine.stateIds) {

      let color: string = 'white';
      if (stateMachine.acceptedStateIds.indexOf(id) >= 0) color = 'rgb(226, 181, 179)';
      if (id === startId) color = 'rgb(179, 226, 195)';

      const startState: StartState = {
        ...vstates[id],
        color: {
          border: 'black',
          background: color,
        }
      };

      this.states.push(startState);
    }
  }

  private populateTransitions(stateMachine: StateMachine,
                              vstates: { [id: string]: VState },
                              transitions: { [id: string]: Transition }) {

    const results: Transition[] = [];

    for (const id of stateMachine.transitionIds) {
      results.push(transitions[id]);
    }

    results.map((tran) => {
      this.edges.push({
        from: vstates[tran.from].id,
        to: vstates[tran.to].id,
        label: tran.label,
        arrows: 'to'
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

export const getStateMachineLabels = createSelector(
  [(state: State) => state.stateMachines],
  (sm) => (Object.keys(sm.stateMachines).map((key) => {
    return sm.stateMachines[Number(key)].label
  }))
);

export const getDisplayedSmStateLabels = createSelector(
  [(state: State) => state.stateMachines],
  (sms) => {
    const displayedSm: StateMachine = sms.stateMachines[sms.displayId];
    return Array.from(displayedSm.stateIds);
  }
);

export const getDisplayedSmAcceptedStateLabels = createSelector(
  [(state: State) => state.stateMachines],
  (sms) => {
    const displayedSm: StateMachine = sms.stateMachines[sms.displayId];
    return Array.from(displayedSm.acceptedStateIds);
  }
);

export const getDisplayedSmTransitionIds = createSelector(
  [(state: State) => state.stateMachines],
  (sms) => {
    return Array.from(sms.stateMachines[sms.displayId].transitionIds)
  }
)
import VState from './VState';
import Alphabet from './Alphabet';
import { State } from '../reducers';
import StateMachine from './StateMachine';
import Transition from './Transition';
import { Edge } from '../selectors/statemachines';

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
  acceptedStateIds: string[];

  states: VState[] = [];
  alphabets: Alphabet[] = [];
  edges: Edge[] = [];

  constructor(state: State, toDisplay: number) {

    const stateMachine: StateMachine = state.stateMachines.stateMachines[toDisplay];

    this.label = stateMachine.label;
    this.startStateId = stateMachine.startStateId;
    this.acceptedStateIds = stateMachine.acceptedStateIds;

    this.populateStates(stateMachine, state.vstates.states, stateMachine.startStateId);
    this.populateAlphabets(stateMachine, state.alphabets.alphabets);
    this.populateTransitions(stateMachine, state.vstates.states, state.transitions.transitions);
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
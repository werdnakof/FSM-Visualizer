import { Edge } from '../../selectors/statemachines';
import VState from '../VState';
import { State } from '../../reducers';
import { StateMachineImpl } from '../StateMachineImpl';

export class Concatenation {

  smIds: number[] = [];
  sms: StateMachineImpl[] = [];

  states: Set<VState> = new Set<VState>();
  edges: Set<Edge> = new Set<Edge>();

  constructor(state: State) {
    this.smIds = [
      state.operations.operation.stateId1,
      state.operations.operation.stateId2
    ];

    this.smIds.forEach((id: number) => {
      this.sms.push(new StateMachineImpl(state, id))
    });

    for (let i = 0; i < this.sms.length; i++) {
      this.sms[i].states.forEach((s) => this.states.add(s));
      this.sms[i].edges.forEach((s) => this.edges.add(s));

      if (i === this.sms.length - 1) break;

      this.sms[i].acceptedStateIds.forEach((id) => {
        this.edges.add({
          from: state.vstates.states[id].id,
          to: state.vstates.states[this.sms[i + 1].startStateId].id,
          label: 'ε',
          arrows: 'to'
        })
      });
    }
  }
}
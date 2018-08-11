import { Edge } from '../../selectors/statemachines';
import VState from '../VState';
import { State } from '../../reducers';
import { StateMachineImpl } from '../StateMachineImpl';

export class Union {

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

    const epsilon: string = 'ε';
    const newStartState: VState = state.vstates.states[epsilon];
    this.states.add(newStartState);

    this.sms.forEach((smi: StateMachineImpl) => {
      smi.states.forEach((s) => this.states.add(s));
      smi.edges.forEach((s) => this.edges.add(s));
      this.edges.add({
        from: newStartState.id,
        to: state.vstates.states[smi.startStateId].id,
        label: 'ε',
        arrows: 'to'
      })
    });
  }
}
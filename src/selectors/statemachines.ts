import { State } from '../reducers';
import { createSelector } from 'reselect';
import StateMachine from '../models/StateMachine';
import { StateMachineImpl } from '../models/StateMachineImpl';

const getState = ((state: State) => state);

export interface Edge {
  from: number,
  to: number,
  label: string,
  arrows: string
}

export const getStateMachines = createSelector(
  [getState],
  (state: State): StateMachine[] => {
    const sms = state.stateMachines.stateMachines;
    return Object.keys(sms).map(k => sms[k])
  }
);

export const getDisplayStateMachineImpl = createSelector(
  [getState],
  (state: State): StateMachineImpl => {
    return new StateMachineImpl(state, state.stateMachines.displayId);
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
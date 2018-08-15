import { State } from '../reducers';
import { createSelector } from 'reselect';
import StateMachine from '../models/StateMachine';
import { StateMachineImpl } from '../models/StateMachineImpl';
import VState from '../models/VState';

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

export const getDisplayedSmStates = createSelector(
  [(state: State) => state],
  (sms): VState[] => {
    const displayedSm: StateMachine = sms.stateMachines.stateMachines[sms.stateMachines.displayId];
    return displayedSm.stateIds.map((id) => sms.vstates.states[id]);
  }
);

export const getDisplayedSmAcceptedStates = createSelector(
  [(state: State) => state],
  (sms): VState[] => {
    const displayedSm: StateMachine = sms.stateMachines.stateMachines[sms.stateMachines.displayId];
    return displayedSm.acceptedStateIds.map((id) => sms.vstates.states[id]);
  }
);

export const getDisplayedSmTransitionIds = createSelector(
  [(state: State) => state.stateMachines],
  (sms) => {
    return Array.from(sms.stateMachines[sms.displayId].transitionIds)
  }
)
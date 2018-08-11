import { Edge } from '../../selectors/statemachines';
import VState from '../VState';
import { State } from '../../reducers';
import StateMachine from '../StateMachine';
import Transition from '../Transition';

export enum Type {
  INTERSECTION = 'INTERSECTION',
  DIFFERENCE = 'DIFFERENCE'
}

interface Color {
  background: string,
  border: string
}

interface CustomState extends VState {
  color: Color | string
  from1: string
  from2: string
}

export class Product {

  allTransitions: { [id: string]: Transition };
  allAlphabets: Set<string>;

  type: Type;
  displayId: number;
  stateId1: number;
  stateId2: number;

  startStateId1: string;
  startStateId2: string;

  acceptedStateIds1: Set<string>;
  acceptedStateIds2: Set<string>;

  states: Set<CustomState> = new Set<CustomState>();
  stateByLabels: {[label: string]: CustomState} = {};
  edges: Set<Edge> = new Set<Edge>();

  tranByFromIds: { [id: number]: Transition[] } = {};

  constructor(state: State, type: Type) {

    this.allTransitions = state.transitions.transitions;
    this.allAlphabets = new Set<string>();

    this.type = type;
    this.stateId1 = state.operations.operation.stateId1;
    this.stateId2 = state.operations.operation.stateId2;

    const sm1: StateMachine = state.stateMachines.stateMachines[this.stateId1];
    const sm2: StateMachine = state.stateMachines.stateMachines[this.stateId2];

    sm1.alphabetIds.forEach(s => this.allAlphabets.add(s));
    sm2.alphabetIds.forEach(s => this.allAlphabets.add(s));

    this.startStateId1 = sm1.startStateId;
    this.startStateId2 = sm2.startStateId;

    this.acceptedStateIds1 = new Set(sm1.acceptedStateIds);
    this.acceptedStateIds2 = new Set(sm2.acceptedStateIds);

    this._populateStates(sm1, sm2);

    this._populateTransitionByStateIds(sm1.transitionIds);
    this._populateTransitionByStateIds(sm2.transitionIds);

    this._populateEdges();
  }

  _populateStates(sm1: StateMachine,
                  sm2: StateMachine): void {

    let id = 0;
    for (const id1 of sm1.stateIds) {
      for (const id2 of sm2.stateIds) {

        const s: CustomState = {
          id: id++,
          label: this._getLabel(id1, id2),
          color: {
            background: this._getBackgroundColor(id1, id2),
            border: 'black'
          },
          from1: id1,
          from2: id2
        };

        this.stateByLabels[s.label] = s;
        this.states.add(s);
      }
    }
  }

  _getBackgroundColor(id1: string, id2: string): string {

    let color = this._checkIntersectionAcceptedState(id1, id2, 'white');
    color = this._checkDifferenceAcceptedState(id1, id2, color);
    color = this._checkStartState(id1, id2, color);

    return color;
  }

  _checkIntersectionAcceptedState(id1: string, id2: string, original: string) {
    if (this.type === Type.INTERSECTION &&
      this.acceptedStateIds1.has(id1) &&
      this.acceptedStateIds2.has(id2)) {
      return 'rgb(226, 181, 179)';
    }
    return original
  }

  _checkDifferenceAcceptedState(id1: string, id2: string, original: string) {
    if (this.type === Type.DIFFERENCE) {
      if (this.acceptedStateIds1.has(id1) && !this.acceptedStateIds2.has(id2)) {
        return 'rgb(226, 181, 179)';
      }

      if (!this.acceptedStateIds1.has(id1) && this.acceptedStateIds2.has(id2)) {
        return 'rgb(226, 181, 179)';
      }
    }
    return original
  }

  _checkStartState(id1: string, id2: string, original: string) {
    if (this.startStateId1 === id1 && this.startStateId2 === id2) {
      return 'rgb(179, 226, 195)';
    }
    return original
  }

  _getLabel(id1: string, id2: string) {
    return `{${id1}, ${id2}}`;
  }

  _populateTransitionByStateIds(transitionIds: string[]): void {

    for (const sId of transitionIds) {

      const tr: Transition = this.allTransitions[sId];

      if (!(tr.from in this.tranByFromIds)) {
        this.tranByFromIds[tr.from] = [];
      }

      (this.tranByFromIds[tr.from] as Transition[]).push(tr)
    }
  }

  _populateEdges(): void {

    for (const label of Object.keys(this.stateByLabels)) {

      const origin: CustomState = this.stateByLabels[label];

      const trs1: Transition[] = this.tranByFromIds[origin.from1];
      const trs2: Transition[]  = this.tranByFromIds[origin.from2];

      if (trs1 === null || trs1 === undefined || trs1.length === 0) continue;
      if (trs2 === null || trs2 === undefined || trs2.length === 0) continue;

      for (const alphabet of Array.from(this.allAlphabets)) {
        for (const t1 of trs1) {
          for (const t2 of trs2) {
            if (t1.label === alphabet && t2.label === alphabet) {

              const destination = this.stateByLabels[this._getLabel(t1.to, t2.to)];

              this.edges.add({
                from: origin.id,
                to: destination.id,
                label: alphabet,
                arrows: 'to'
              })
            }
          }
        }
      }
    }
  }
}
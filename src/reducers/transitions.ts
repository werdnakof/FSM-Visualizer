import Transition from '../models/Transition'
import { Types, AddTransitionAction } from '../actions/transitions'

export interface State {
  transitions: { [id: string]: Transition; };
}

export const initialState: State = {
  transitions: {
    'a-a 0': new Transition('a', 'a', '0'),
    'a-b 1': new Transition('a', 'b', '1'),
    'b-a 0': new Transition('b', 'a', '0'),
    'b-a 1': new Transition('b', 'a', '1'),
    'c-c 1': new Transition('c', 'c', '1'),
    'c-d 0': new Transition('c', 'd', '0'),
    'd-d 0': new Transition('d', 'd', '0'),
    'd-c 1': new Transition('d', 'c', '1'),
  }
};

export function reducer(
  state: State = initialState,
  action: AddTransitionAction): State {

    switch (action.type) {
      case Types.ADD_Transition: {
        const transition: Transition = action.payload.transition;
        return {
          transitions: {
            ...state.transitions,
            [transition.getId()] : transition
          }
        };
      }

      default:
          return state;
    }
}

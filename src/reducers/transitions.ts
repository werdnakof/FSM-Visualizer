import Transition from '../models/Transition'
import { Types, AddTransitionAction } from '../actions/transitions'

export interface State {
  transitions: { [id: string]: Transition; };
}

export const initialState: State = {
  transitions: {
    'a-b': new Transition('a', 'b', 'a-to-b'),
    'b-c': new Transition('b', 'c', 'b-to-c')
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

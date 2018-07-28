import Transition from '../models/Transition'
import { Types, AddTransitionAction } from '../actions/transitions'

export interface State {
  transitions: { [id: string]: Transition; };
}

export const initialState: State = {
  transitions: {
    '0-1': new Transition(0, 1, 0)
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

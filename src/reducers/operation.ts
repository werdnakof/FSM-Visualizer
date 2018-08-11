import Operation from '../models/Operation';
import { Types } from '../models/Operation';
import { UpdateOperationAction, Types as OpTypes } from '../actions/operations'

export interface State {
  operation: Operation
}

export const initialState: State = {
  operation: {
    type: Types.INTERSECTION,
    stateId1: 0,
    stateId2: 1
  }
};

type Action = UpdateOperationAction;

export function reducer(state: State = initialState,
                        action: Action): State {

  switch (action.type) {
    case OpTypes.UPDATE_OPERATION: {
      const operation = action.payload.operation;
      return {
        operation
      }
    }

    default:
      return state;
  }
}

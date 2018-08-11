import Operation from '../models/Operation';

export enum Types {
  UPDATE_OPERATION = '[operations] UPDATE_OPERATION'
}

export interface UpdateOperationAction {
  type: Types.UPDATE_OPERATION,
  payload: { operation: Operation }
}

export function UpdateOperation(operation: Operation): UpdateOperationAction {
  return {
    type: Types.UPDATE_OPERATION,
    payload: { operation }
  }
}
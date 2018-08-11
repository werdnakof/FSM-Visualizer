import { State } from '../reducers';
import { createSelector } from 'reselect';
import { Concatenation } from '../models/operations/Concatenation';
import { Product, Type } from '../models/operations/Product';
import { Types } from '../models/Operation';
import { Union } from '../models/operations/Union';
import { OperationType } from '../components/OperationGraph';

const getState = ((state: State) => state);

export const getOperationType = createSelector(
  [getState],
  (state: State): OperationType => {

    switch (state.operations.operation.type) {
      case Types.UNION: {
        return new Union(state);
      }

      case Types.CONCATENATION: {
        return new Concatenation(state);
      }

      case Types.INTERSECTION: {
        return new Product(state, Type.INTERSECTION);
      }

      case Types.DIFFERENCE: {
        return new Product(state, Type.DIFFERENCE);
      }
    }
  }
);
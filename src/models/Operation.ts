// @ts-ignore
import { SortedSet } from 'collections/sorted-set';

export enum Types {
  UNION,
  CONCATENATION,
  INTERSECTION,
  DIFFERENCE,
}

export default interface Operation {
  type: Types,
  stateId1: number,
  stateId2: number
}
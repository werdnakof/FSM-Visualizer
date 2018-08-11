export default interface StateMachine {
  id: number,
  label: string,
  startStateId: string,
  acceptedStateIds: string[],
  stateIds: string[],
  alphabetIds: string[],
  transitionIds: string[]
}
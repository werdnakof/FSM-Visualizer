export default interface StateMachine {
  label: string,
  startStateId: string,
  acceptedStateIds: string[],
  stateIds: string[],
  alphabetIds: string[],
  transitionIds: string[]
}
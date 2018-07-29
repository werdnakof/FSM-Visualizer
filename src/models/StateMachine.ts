export default interface StateMachine {
  label: string,
  startStateId: string,
  stateIds: string[],
  alphabetIds: string[],
  transitionIds: string[]
}
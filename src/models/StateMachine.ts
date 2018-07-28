export default interface StateMachine {
  label: string,
  startStateId: number,
  stateIds: number[],
  alphabetIds: number[],
  transitionIds: string[]
}
import { connect } from 'react-redux'
import { State } from '../reducers'
import { getStates } from '../selectors/vstates'
import { getTransitions } from '../selectors/transitions'
import Graph, { GraphProps } from '../components/Graph'
import { getDisplayStateMachineImpl, StateMachineImpl } from '../selectors/statemachines';

const mapStateToProps = (state: State): GraphProps => ({
  // states: getStates(state),
  // transitions: getTransitions(state)
  sm: getDisplayStateMachineImpl(state)
});

export default connect<any, any, any>(
  mapStateToProps,
  null)(Graph)

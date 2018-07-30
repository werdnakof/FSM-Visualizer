import { connect } from 'react-redux'
import { State } from '../reducers'
import Graph, { GraphProps } from '../components/Graph'
import { getDisplayStateMachineImpl } from '../selectors/statemachines';

const mapStateToProps = (state: State): GraphProps => ({
  // stateMachinesLabels: getStates(state),
  // edges: getTransitions(state)
  smi: getDisplayStateMachineImpl(state)
});

export default connect<any, any, any>(
  mapStateToProps,
  null)(Graph)

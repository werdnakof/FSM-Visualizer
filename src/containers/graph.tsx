import { connect } from 'react-redux'
import { State } from '../reducers'
import { getStates } from '../selectors/vstates'
import { getTransitions } from '../selectors/transitions'
import Graph from '../components/Graph'

const mapStateToProps = (state: State) => ({
  states: getStates(state),
  transitions: getTransitions(state)
});

export default connect<any, any, any>(
  mapStateToProps,
  null)(Graph)

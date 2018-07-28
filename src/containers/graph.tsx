import { connect } from 'react-redux'
import { State } from '../reducers'
import { getStates } from '../selectors/vstates'
import { getEdges } from '../selectors/edges'
import Graph, { GraphProps } from '../components/Graph'
import { getAlphabets } from '../selectors/alphabets';

const mapStateToProps = (state: State) => ({
  states: getStates(state),
  edges: getEdges(state)
});

export default connect<any, any, any>(
  mapStateToProps,
  null)(Graph)

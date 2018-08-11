import { connect } from 'react-redux'
import { State } from '../reducers'
import OperationGraph, { OperationGraphProps } from '../components/OperationGraph'
import { getOperationType } from '../selectors/operations';

const mapStateToProps = (state: State): OperationGraphProps => ({
  type: getOperationType(state)
});

export default connect<any, any, any>(
  mapStateToProps)(OperationGraph)

import { State } from '../reducers';
import { connect } from 'react-redux';
import { OperationForm } from '../components/OperationForm';
import { UpdateOperation } from '../actions/operations';
import { getStateMachines } from '../selectors/statemachines';

const mapStateToProps = (state: State) => ({
  stateMachines: getStateMachines(state)
});

const mapDispatchToProps = {
  handleSubmit: UpdateOperation
};

export default connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps)(OperationForm)
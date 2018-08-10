import StateMachineSelector from '../components/StateMachineSelector';
import { connect } from 'react-redux';
import { State } from '../reducers';
import { getStateMachineLabels } from '../selectors/statemachines';
import { addStateMachine, switchStateMachine } from '../actions/statemachines';

const mapStateToProps = (state: State) => ({
  displayedId: state.stateMachines.displayId,
  stateMachinesLabels: getStateMachineLabels(state)
});

const mapDispatchToProps = {
  addStateMachine,
  switchStateMachine
};

export default connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps)(StateMachineSelector)
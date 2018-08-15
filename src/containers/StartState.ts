import { State } from '../reducers';
import {
  getDisplayedSmAcceptedStates,
  getDisplayedSmStartState,
  getDisplayedSmStates
} from '../selectors/statemachines';
import { AddSMStartState } from '../actions/statemachines';
import { connect } from 'react-redux';
import { StartStateForm } from '../components/StartStateForm';

const mapStateToProps = (state: State) => ({
  acceptedStates: getDisplayedSmAcceptedStates(state),
  states: getDisplayedSmStates(state),
  startState: getDisplayedSmStartState(state)
});

const mapDispatchToProps = {
  handleSubmit: AddSMStartState
};

export default connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps)(StartStateForm)
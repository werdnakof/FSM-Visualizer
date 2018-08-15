import { getStates } from '../selectors/vstates';
import { connect } from 'react-redux';
import { State } from '../reducers'
import { AcceptedStateForm } from '../components/AcceptedStateForm';
import { AddSmAcceptedState, RemoveSmAcceptedState } from '../actions/statemachines';
import { getDisplayedSmAcceptedStates, getDisplayedSmStates } from '../selectors/statemachines';

const mapStateToProps = (state: State) => ({
  acceptedStates: getDisplayedSmAcceptedStates(state),
  states: getStates(state)
});

const mapDispatchToProps = {
  handleSubmit: AddSmAcceptedState,
  handleStateDelete: RemoveSmAcceptedState
};

export default connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps)(AcceptedStateForm)
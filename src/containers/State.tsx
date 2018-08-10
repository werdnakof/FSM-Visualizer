import { connect } from 'react-redux'
import { addVState, removeVState } from '../actions/vstates'
import StateForm from '../components/StateForm'
import { State } from '../reducers';
import { getStates } from '../selectors/vstates';
import { getAlphabets } from '../selectors/alphabets';
import { addTransition } from '../actions/transitions';
import { getDisplayedSmStateLabels } from '../selectors/statemachines';

const mapStateToProps = (state: State) => ({
  labels: getDisplayedSmStateLabels(state)
});

const mapDispatchToProps = {
  handleSubmit: addVState,
  handleStateDelete: removeVState
};

export default connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps
)(StateForm)

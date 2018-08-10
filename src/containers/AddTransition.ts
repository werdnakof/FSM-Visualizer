import { getStates } from '../selectors/vstates';
import { connect } from 'react-redux';
import { State } from '../reducers'
import { TransitionForm, Props } from '../components/TransitionForm';
import { addTransition, removeTransition } from '../actions/transitions';
import { getAlphabets } from '../selectors/alphabets';
import { getDisplayedSmTransitionIds } from '../selectors/statemachines';

const mapStateToProps = (state: State) => ({
  states: getStates(state),
  alphabets: getAlphabets(state),
  transitionIds: getDisplayedSmTransitionIds(state)
});

const mapDispatchToProps = {
  handleSubmit: addTransition,
  handleDelete: removeTransition
};

export default connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps)(TransitionForm)
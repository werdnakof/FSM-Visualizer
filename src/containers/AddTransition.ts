import { getStates } from '../selectors/vstates';
import { connect } from 'react-redux';
import { State } from '../reducers'
import { AddTransitionForm, Props } from '../components/AddTransitionForm';
import { addTransition } from '../actions/transitions';
import { getAlphabets } from '../selectors/alphabets';

const mapStateToProps = (state: State) => ({
  states: getStates(state),
  alphabets: getAlphabets(state)
});

const mapDispatchToProps = {
  handleSubmit: addTransition
};

export default connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps)(AddTransitionForm)
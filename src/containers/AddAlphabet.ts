import { connect } from 'react-redux'
import { addAlphabet } from '../actions/alphabets'
import AddAlphabetForm from '../components/AddAlphabetForm';

export default connect<any, any, any>(
  null,
  { handleSubmit: addAlphabet }
)(AddAlphabetForm)
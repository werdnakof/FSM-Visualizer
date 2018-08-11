import { connect } from 'react-redux'
import { addAlphabet } from '../actions/alphabets'
import AlphabetForm from '../components/AlphabetForm';

export default connect<any, any, any>(
  null,
  { handleSubmit: addAlphabet }
)(AlphabetForm)
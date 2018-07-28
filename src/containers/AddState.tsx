import { connect } from 'react-redux'
import { addVState } from '../actions/vstates'
import AddStateForm from '../components/AddStateForm'

export default connect<any, any, any>(
  null,
  { handleSubmit: addVState }
  )(AddStateForm)

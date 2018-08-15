import * as React from 'react';
import { FormEvent } from 'react';
import Input from './Input';

interface Props {
  handleSubmit: (value: string) => void
}

interface State {
  value: string
}

export default class AlphabetForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { value: '' }; // Value is empty by default
    this._updateValue = this._updateValue.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  _updateValue(value: string) {
    this.setState({ value })
  }

  _handleSubmit(e: FormEvent<any>) {

    e.preventDefault();

    if (!this.state.value.trim()) { return }

    this.props.handleSubmit(this.state.value);

    this.setState({ value: '' })
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit}>

        <div className="row m-1 mt-4">
          <label className="control-label col-md-12">Alphabet: </label>
        </div>

        <div className="row m-1">
          <div className="col-md-8">
            <Input placeholder={'Enter Here'}
                   getText={this._updateValue}
                   text={this.state.value}/>
          </div>
          <div className="col-md-4">
            <button className="btn btn-outline-secondary btn-block"
                    type="submit">Submit</button>
          </div>
        </div>
      </form>
    )
  }
}
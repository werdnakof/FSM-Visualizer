import * as React from 'react'
import { FormEvent } from 'react';
import Input from './Input';

interface Props {
  handleSubmit: (value: string) => void
}

interface State {
  value: string
}

export default class AddStateForm extends React.Component<Props, State> {
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
        <Input placeholder={'Enter Label'}
               getText={this._updateValue}
                text={this.state.value}/>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

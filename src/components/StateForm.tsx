import * as React from 'react'
import { FormEvent } from 'react';
import Input from './Input';
import VState from '../models/VState';

interface Props {
  labels: string[],
  handleSubmit: (value: string) => void,
  handleStateDelete: (label: string) => void
}

interface State {
  labels: Set<string>,
  value: string
}

export default class StateForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: '',
      labels: new Set(props.labels)
    };
    this._updateValue = this._updateValue.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleStateDelete = this._handleStateDelete.bind(this);
    this._populateStateButtons = this._populateStateButtons.bind(this);
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

  _handleStateDelete(e: FormEvent<HTMLButtonElement>) {

    e.preventDefault();

    const label: string = e.currentTarget.value;

    this.props.handleStateDelete(label);
  }

  _populateStateButtons() {
    return Array.from(this.props.labels).map((label) => (
      <button
        type="button"
        className="btn btn-secondary"
        key={label}
        value={label}
        onClick={this._handleStateDelete}>{label}</button>
    ));
  }

  render() {
    return (
      <div>
        <form onSubmit={this._handleSubmit}>
          <Input placeholder={'Enter State Label'}
                 getText={this._updateValue}
                  text={this.state.value}/>
          <button type="submit">Submit</button>
        </form>
        <div className="btn-group" role="group">
          {this._populateStateButtons()}
        </div>
      </div>
    )
  }
}

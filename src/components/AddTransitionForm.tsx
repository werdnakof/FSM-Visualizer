import Dropdown  from './Dropdown'
import VState from '../models/VState';
import Transition from '../models/Transition';
import * as React from 'react';
import { FormEvent } from 'react';
import Alphabet from '../models/Alphabet';

export interface Props {
  states: VState[],
  alphabets: Alphabet[]
  handleSubmit: (edge: Transition) => void
}

interface State {
  fromStateId: string,
  toStateId: string,
  label: string
}

export class AddTransitionForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fromStateId: null,
      toStateId: null,
      label: null
    };

    this._handleSubmit = this._handleSubmit.bind(this);
    this._updateFrom = this._updateFrom.bind(this);
    this._updateTo = this._updateTo.bind(this);
    this._updateLabel = this._updateLabel.bind(this);
  }

  _handleSubmit(e: FormEvent<any>) {

    e.preventDefault();
    console.log(this.state);
    if (this.state.fromStateId === null
        || this.state.toStateId === null
        || this.state.label === null) {
      return;
    }

    this.props.handleSubmit(new Transition(
      this.state.fromStateId,
      this.state.toStateId,
      this.state.label
    ));

    this.setState({});
  }

  _updateFrom(state: VState) {
    this.setState((prev => {
      return { ...prev, fromStateId: state.label }
    }));
  }

  _updateTo(state: VState) {
    this.setState((prev => {
      return { ...prev, toStateId: state.label }
    }));
  }

  _updateLabel(alphabet: Alphabet) {
    this.setState((prev => {
      return { ...prev, label: alphabet.label }
    }));
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit}>
        <Dropdown states={this.props.states} updateState={this._updateFrom}/>
        <Dropdown states={this.props.states} updateState={this._updateTo}/>
        <Dropdown states={this.props.alphabets} updateState={this._updateLabel}/>
        <button type="submit">Submit</button>
      </form>
    )
  }
}
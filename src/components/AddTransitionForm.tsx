import DropdownSelector  from './DropdownSelector'
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
  alphabetId: string
}

export class AddTransitionForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fromStateId: null,
      toStateId: null,
      alphabetId: null
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
        || this.state.alphabetId === null) {
      return;
    }

    this.props.handleSubmit(new Transition(
      this.state.fromStateId,
      this.state.toStateId,
      this.state.alphabetId
    ));
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
      return { ...prev, alphabetId: alphabet.label }
    }));
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit}>
        <DropdownSelector objects={this.props.states} update={this._updateFrom}/>
        <DropdownSelector objects={this.props.states} update={this._updateTo}/>
        <DropdownSelector objects={this.props.alphabets} update={this._updateLabel}/>
        <button type="submit">Submit</button>
      </form>
    )
  }
}
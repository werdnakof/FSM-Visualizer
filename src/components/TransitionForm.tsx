import DropDownSelector  from './DropDownSelector'
import VState from '../models/VState';
import Transition from '../models/Transition';
import * as React from 'react';
import { FormEvent } from 'react';
import Alphabet from '../models/Alphabet';

type StateDropDown = new () => DropDownSelector<VState>;
const StateDropDownSelector = DropDownSelector as StateDropDown;

type AlphabetDropDown = new () => DropDownSelector<Alphabet>;
const AlphabetDropDownSelector = DropDownSelector as AlphabetDropDown;

export interface TransitionFormProps {
  states: VState[],
  alphabets: Alphabet[],
  transitionIds: string[],
  handleSubmit: (edge: Transition) => void,
  handleDelete: (label: string) => void
}

interface TransitionFormState {
  fromStateId: string,
  toStateId: string,
  alphabetId: string
}

export class TransitionForm extends React.Component<TransitionFormProps, TransitionFormState> {
  constructor(props: TransitionFormProps) {
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
    this._handleDelete = this._handleDelete.bind(this);
  }

  _handleSubmit(e: FormEvent<any>) {

    e.preventDefault();
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

  _handleDelete(e: FormEvent<HTMLButtonElement>) {

    e.preventDefault();

    const label: string = e.currentTarget.value;

    this.props.handleDelete(label);
  }

  _populateButtons() {
    return Array.from(this.props.transitionIds).map((id) => (
      <button
        type="button"
        className="btn btn-secondary"
        key={id}
        value={id}
        onClick={this._handleDelete}>{id}</button>
    ));
  }

  render() {
    return (
      <div>
        <form onSubmit={this._handleSubmit}>
          <StateDropDownSelector objects={this.props.states} update={this._updateFrom}/>
          <StateDropDownSelector objects={this.props.states} update={this._updateTo}/>
          <AlphabetDropDownSelector objects={this.props.alphabets} update={this._updateLabel}/>
          <button type="submit">Submit</button>
        </form>
        <div className="btn-group" role="group">
          {this._populateButtons()}
        </div>
      </div>
    )
  }
}
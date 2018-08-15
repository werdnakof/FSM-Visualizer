import DropDownSelector  from './DropDownSelector'
import VState from '../models/VState';
import Transition from '../models/Transition';
import * as React from 'react';
import { FormEvent } from 'react';
import Alphabet from '../models/Alphabet';

interface TransitionDataObject {
  id: number,
  label: string
}

type StateDropDown = new () => DropDownSelector<VState>;
const StateDropDownSelector = DropDownSelector as StateDropDown;

type AlphabetDropDown = new () => DropDownSelector<Alphabet>;
const AlphabetDropDownSelector = DropDownSelector as AlphabetDropDown;

type TransitionDropDown = new () => DropDownSelector<TransitionDataObject>;
const TransitionDropDownSelector = DropDownSelector as TransitionDropDown;

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
  deleteTransitionId: string
}

export class TransitionForm extends React.Component<TransitionFormProps, TransitionFormState> {
  constructor(props: TransitionFormProps) {
    super(props);
    this.state = {
      fromStateId: null,
      toStateId: null,
      alphabetId: null,
      deleteTransitionId: null
    };

    this._handleSubmit = this._handleSubmit.bind(this);
    this._updateFrom = this._updateFrom.bind(this);
    this._updateTo = this._updateTo.bind(this);
    this._updateLabel = this._updateLabel.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this._getTranDataObjects = this._getTranDataObjects.bind(this);
    this._updateTransitionDelete = this._updateTransitionDelete.bind(this);
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

    if (this.state.deleteTransitionId === null) return

    this.props.handleDelete(this.state.deleteTransitionId);
  }

  _updateTransitionDelete(t: TransitionDataObject) {
    this.setState((prev => {
      return { ...prev, deleteTransitionId: t.label }
    }));
  }

  _getTranDataObjects(): TransitionDataObject[] {
    return this.props.transitionIds.map((label, id) => ({id, label}))
  }

  render() {
    return (
      <div>
        <div className="row m-1 mt-4">
          <label className="control-label col-md-12">Transitions: </label>
        </div>
        <div className="row m-1">
          <div className="col-md-3">
            <StateDropDownSelector objects={this.props.states} update={this._updateFrom}/>
          </div>
          <div className="col-md-3">
            <StateDropDownSelector objects={this.props.states} update={this._updateTo}/>
          </div>
          <div className="col-md-3">
            <AlphabetDropDownSelector objects={this.props.alphabets} update={this._updateLabel}/>
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-outline-secondary btn-block"
              onClick={this._handleSubmit} type="submit">Submit</button>
          </div>
        </div>
        <div className="row m-1">
          <div className="col-md-8">
            <TransitionDropDownSelector objects={this._getTranDataObjects()} update={this._updateTransitionDelete} />
          </div>
          <div className="col-md-4">
            <button className="btn btn-outline-secondary btn-block"
                    onClick={this._handleDelete}
                    type="submit">Remove</button>
          </div>
        </div>
      </div>
    )
  }
}
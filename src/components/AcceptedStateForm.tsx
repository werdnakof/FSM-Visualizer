import DropDownSelector  from './DropDownSelector'
import VState from '../models/VState';
import * as React from 'react';
import { FormEvent } from 'react';

type StateDropdown = new () => DropDownSelector<VState>;
const StateDropdownSelector = DropDownSelector as StateDropdown;

export interface Props {
  labels: string[],
  states: VState[],
  handleSubmit: (selectedState: VState) => void,
  handleStateDelete: (label: string) => void
}

interface State {
  selectedState: VState
}

export class AcceptedStateForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { selectedState: null };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._updateSelectedState = this._updateSelectedState.bind(this);
    this._handleStateDelete = this._handleStateDelete.bind(this);
    this._populateButtons = this._populateButtons.bind(this);
  }

  _handleSubmit(e: FormEvent<any>) {

    e.preventDefault();
    if (this.state.selectedState === null) return;

    this.props.handleSubmit(this.state.selectedState);
  }

  _updateSelectedState(state: VState) {
    this.setState((prev => {
      return { ...prev, selectedState: state }
    }));
  }

  _handleStateDelete(e: FormEvent<HTMLButtonElement>) {

    e.preventDefault();

    const label: string = e.currentTarget.value;

    this.props.handleStateDelete(label);
  }

  _populateButtons() {
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
          <StateDropdownSelector objects={this.props.states} update={this._updateSelectedState} />
          <button type="submit">Submit</button>
        </form>

        <div className="btn-group" role="group">
          {this._populateButtons()}
        </div>
      </div>
    )
  }
}
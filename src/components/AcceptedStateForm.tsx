import DropDownSelector  from './DropDownSelector'
import VState from '../models/VState';
import * as React from 'react';
import { FormEvent } from 'react';

type StateDropdown = new () => DropDownSelector<VState>;
const StateDropdownSelector = DropDownSelector as StateDropdown;

export interface Props {
  acceptedStates: VState[],
  states: VState[],
  handleSubmit: (selectedState: VState) => void,
  handleStateDelete: (selectedState: VState) => void
}

interface State {
  selectedAddState: VState
  selectedRemoveState: VState
}

export class AcceptedStateForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { selectedAddState: null, selectedRemoveState: null };
    this._handleStateAdd = this._handleStateAdd.bind(this);
    this._handleStateDelete = this._handleStateDelete.bind(this);

    this._updateSelectedAddState = this._updateSelectedAddState.bind(this);
    this._updateSelectedRemoveState = this._updateSelectedRemoveState.bind(this);
  }

  _handleStateAdd(e: FormEvent<any>) {

    e.preventDefault();

    if (this.state.selectedAddState === null) return;

    this.props.handleSubmit(this.state.selectedAddState);
  }

  _handleStateDelete(e: FormEvent<any>) {

    e.preventDefault();

    if (this.state.selectedRemoveState === null) return;

    console.log(this.state.selectedRemoveState);

    this.props.handleStateDelete(this.state.selectedRemoveState);
  }

  _updateSelectedAddState(state: VState) {
    this.setState((prev => {
      return { ...prev, selectedAddState: state }
    }));
  }

  _updateSelectedRemoveState(state: VState) {
    this.setState((prev => {
      return { ...prev, selectedRemoveState: state }
    }));
  }

  render() {
    return (
      <div>
        <div className="row m-1 mt-4">
          <label className="control-label col-md-12">Accepted State: </label>
        </div>
        <div className="row m-1">
          <div className="col-md-8">
            <StateDropdownSelector objects={this.props.states} update={this._updateSelectedAddState} />
          </div>
          <div className="col-md-4">
            <button className="btn btn-outline-secondary btn-block"
                    onClick={this._handleStateAdd}
                    type="submit">Add</button>
          </div>
        </div>

        <div className="row m-1">
          <div className="col-md-8">
            <StateDropdownSelector objects={this.props.acceptedStates} update={this._updateSelectedRemoveState} />
          </div>
          <div className="col-md-4">
            <button className="btn btn-outline-secondary btn-block"
                    onClick={this._handleStateDelete}
                    type="submit">Remove</button>
          </div>
        </div>
      </div>
    )
  }
}
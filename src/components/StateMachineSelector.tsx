import * as React from 'react';
import VState from '../models/VState';
import Alphabet from '../models/Alphabet';
import StateMachine from '../models/StateMachine';
import { switchStateMachine } from '../actions/statemachines';

export interface Props {
  displayedId: number
  stateMachinesLabels: string[]
  addStateMachine: (label: string) => void
  switchStateMachine: (displayedId: number) => void
}

interface State {
  selected: number;
  newStateMachineLabel: string
}

export default class StateMachineSelector extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      selected: props.displayedId,
      newStateMachineLabel: ''
    };

    this._updateDisplayed = this._updateDisplayed.bind(this);
    this.populateDropdown = this.populateDropdown.bind(this);
    this._addStateMachine = this._addStateMachine.bind(this);
    this._getNewMachineLabelText = this._getNewMachineLabelText.bind(this);
  }

  populateDropdown() {
    return this.props.stateMachinesLabels
      .map((label, index) => (
        <option key={index}
                value={index}
                selected={index === this.props.displayedId}>
          {label}
        </option>
      ));
  }

  _updateDisplayed(e: React.FormEvent<HTMLSelectElement>) {
    if (e.currentTarget.value == null) return;
    this.props.switchStateMachine(Number(e.currentTarget.value));
  }

  _addStateMachine(e: React.FormEvent<any>) {

    e.preventDefault();

    if (this.state.newStateMachineLabel.length === 0) return;

    this.props.addStateMachine(this.state.newStateMachineLabel);

    this.setState((prev) => ({
      ...prev,
      newStateMachineLabel: ''
    }));
  }

  _getNewMachineLabelText(text: string) {
    this.setState((prev) => ({
      ...prev,
      newStateMachineLabel: text
    }));
  }

  render() {
    return (
      <form onSubmit={this._addStateMachine}>
        <div className="row m-1">
          <div className="col-md-12">
            <label className="control-label">State Machine Name: </label>
          </div>
        </div>
        <div className="row m-1">
          <div className="col-md-8">
            <input className="form-control"
                     type="text"
                     placeholder={'Enter State Machine Name'}
                     value={this.state.newStateMachineLabel}
                     onChange={e => this._getNewMachineLabelText(e.target.value)}/>
          </div>
          <div className="col-md-4">
            <button type="submit"
                    className="btn btn-outline-secondary btn-block"
                    onClick={this._addStateMachine}>{'Submit'}</button>
          </div>
        </div>
        <div className="row m-1 mt-4">
          <div className="col-md-12">
            <label className="control-label">Displayed State Machine: </label>
            <select className="custom-select"
                    onChange={this._updateDisplayed}>
              {this.populateDropdown()}
            </select>
          </div>
        </div>
      </form>
    )
  }
}

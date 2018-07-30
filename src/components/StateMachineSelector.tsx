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
    console.log(props);

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

  _addStateMachine(e: React.FormEvent<HTMLButtonElement>) {
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
      <div>
        <input type="text"
               placeholder={'Enter State Machine Label'}
               value={this.state.newStateMachineLabel}
               onChange={e => this._getNewMachineLabelText(e.target.value)}/>
        <button onClick={this._addStateMachine}>Add State Machine</button>
        <br/>
        <select onChange={this._updateDisplayed}>
          {this.populateDropdown()}
        </select>
      </div>
    )
  }
}

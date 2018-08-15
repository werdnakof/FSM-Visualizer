import DropDownSelector  from './DropDownSelector'
import VState from '../models/VState';
import * as React from 'react';
import { FormEvent } from 'react';

type StateDropdown = new () => DropDownSelector<VState>;
const StateDropdownSelector = DropDownSelector as StateDropdown;

export interface Props {
  startState: VState,
  states: VState[],
  handleSubmit: (selected: VState) => void
}

interface State {
  selectedStartState: VState
}

export class StartStateForm extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { selectedStartState: null };
    this._handleSubmit = this._handleSubmit.bind(this);

    this._updateSelectedStartState = this._updateSelectedStartState.bind(this);
  }

  _handleSubmit(e: FormEvent<any>) {

    e.preventDefault();

    if (this.state.selectedStartState === null) return;

    this.props.handleSubmit(this.state.selectedStartState);
  }

  _updateSelectedStartState(state: VState) {
    this.setState((prev => {
      return { ...prev, selectedStartState: state }
    }));
  }

  render() {
    return (
      <div>
        <div className="row m-1 mt-4">
          <label className="control-label col-md-12">Start State: </label>
        </div>
        <div className="row m-1">
          <div className="col-md-8">
            <StateDropdownSelector objects={this.props.states} update={this._updateSelectedStartState} />
          </div>
          <div className="col-md-4">
            <button className="btn btn-outline-secondary btn-block"
                    onClick={this._handleSubmit}
                    type="submit">Submit</button>
          </div>
        </div>
      </div>
    )
  }
}
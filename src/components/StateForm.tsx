import * as React from 'react'
import { FormEvent } from 'react';
import Input from './Input';
import VState from '../models/VState';
import DropDownSelector from './DropDownSelector';

type StateDropdown = new () => DropDownSelector<VState>;
const StateDropdownSelector = DropDownSelector as StateDropdown;

interface Props {
  states: VState[],
  handleSubmit: (value: string) => void,
  handleStateDelete: (state: VState) => void
}

interface State {
  value: string
  selectedRemoveState: VState
}

export default class StateForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: '',
      selectedRemoveState: null
    };

    this._updateValue = this._updateValue.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleStateDelete = this._handleStateDelete.bind(this);
    this._updateSelectedRemoveState = this._updateSelectedRemoveState.bind(this);
  }

  _updateSelectedRemoveState(state: VState) {
    this.setState((prev => {
      return { ...prev, selectedRemoveState: state }
    }));
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

  _handleStateDelete(e: FormEvent<any>) {

    e.preventDefault();

    if (this.state.selectedRemoveState === null) return;

    this.props.handleStateDelete(this.state.selectedRemoveState);
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit}>
        <div className="row m-1 mt-4">
          <label className={'control-label col-md-12'}>States: </label>
        </div>
        <div className="row m-1">
          <div className="col-md-8">
            <Input placeholder={'Enter Here'}
                   getText={this._updateValue}
                   text={this.state.value}/>
          </div>
          <div className="col-md-4">
            <button
              className="btn btn-outline-secondary btn-block"
              onClick={this._handleSubmit} type="submit">Submit</button>
          </div>
        </div>

        <div className="row m-1">
          <div className="col-md-8">
            <StateDropdownSelector objects={this.props.states} update={this._updateSelectedRemoveState} />
          </div>
          <div className="col-md-4">
            <button className="btn btn-outline-secondary btn-block"
                    onClick={this._handleStateDelete}
                    type="submit">Remove</button>
          </div>
        </div>
      </form>
    )
  }
}

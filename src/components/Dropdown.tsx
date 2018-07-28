import * as React from 'react';
import VState from '../models/VState';
import Alphabet from '../models/Alphabet';

type DataObject = VState | Alphabet;

export interface Props {
  states: DataObject[]
  updateState: (state: DataObject) => void
}

interface State {
  selected: DataObject;
}

export default class Dropdown extends React.Component<Props, State> {

  static populateOptions(options: DataObject[]) {
    return options.map((option) => (
      <option key={option.id} value={option.id}>{option.label}</option>
    ));
  }

  constructor(props: Props) {
    super(props);
    console.log(props);
    this._updateSelect = this._updateSelect.bind(this);
  }

  _updateSelect(e: React.FormEvent<HTMLSelectElement>) {

    const v: number = Number(e.currentTarget.value);

    for (const state of this.props.states) {
      if (state.id === v) {
        this.props.updateState(state);
        break;
      }
    }
  }

  render() {
    return (
      <select onChange={this._updateSelect}>
        <option/>
        {Dropdown.populateOptions(this.props.states)}
      </select>
    )
  }
}

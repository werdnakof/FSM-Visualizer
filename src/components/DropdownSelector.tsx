import * as React from 'react';
import VState from '../models/VState';
import Alphabet from '../models/Alphabet';

type DataObject = VState | Alphabet;

export interface Props {
  objects: DataObject[]
  update: (state: DataObject) => void
}

interface State {
  selected: DataObject;
}

export default class DropdownSelector extends React.Component<Props, State> {

  static populateOptions(options: DataObject[]) {
    return options.map((option) => (
      <option key={option.id} value={option.id}>{option.label}</option>
    ));
  }

  constructor(props: Props) {
    super(props);
    this._update = this._update.bind(this);
  }

  _update(e: React.FormEvent<HTMLSelectElement>) {

    const v: number = Number(e.currentTarget.value);

    for (const object of this.props.objects) {
      if (object.id === v) {
        this.props.update(object);
        break;
      }
    }
  }

  render() {
    return (
      <a>
        <select onChange={this._update}>
          <option/>
          {DropdownSelector.populateOptions(this.props.objects)}
        </select>
      </a>
    )
  }
}

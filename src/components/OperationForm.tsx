import * as React from 'react';
import DropDownSelector from './DropDownSelector';
import Operation from '../models/Operation';
import StateMachine from '../models/StateMachine';
import { Types } from '../models/Operation';
import { FormEvent } from 'react';

type StateMachineDropDown = new () => DropDownSelector<StateMachine>;
const StateMachineDropDownSelector = DropDownSelector as StateMachineDropDown;

export interface OperationFormProps {
  stateMachines: StateMachine[]
  handleSubmit: (operation: Operation) => void
}

interface OperationFormState {
  sm1: StateMachine
  sm2: StateMachine
  type: Types
}

interface TypeDataObject {
  id: number
  label: string
}

export class OperationForm extends React.Component<OperationFormProps, OperationFormState> {
  constructor(props: OperationFormProps) {
    super(props);
    this._updateSm1 = this._updateSm1.bind(this);
    this._updateSm2 = this._updateSm2.bind(this);
    this._updateType = this._updateType.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  populateTypes(): TypeDataObject[] {
    return [
      { id: 0, label: Types[Types.UNION] },
      { id: 1, label: Types[Types.CONCATENATION] },
      { id: 2, label: Types[Types.DIFFERENCE] },
      { id: 3, label: Types[Types.INTERSECTION] },
    ];
  }

  _updateSm1(sm: StateMachine) {
    this.setState((prev => {
      return { ...prev, sm1: sm }
    }));
  }

  _updateSm2(sm: StateMachine) {
    this.setState((prev => {
      return { ...prev, sm2: sm }
    }));
  }

  _updateType(opType: TypeDataObject) {
    console.log(opType.label);
    const tt: Types = Types[opType.label];
    console.log(tt);
    this.setState((prev => {
      return { ...prev, type: tt }
    }));
  }

  _handleSubmit(e: FormEvent<any>) {

    e.preventDefault();
    if (this.state.sm2 === null
      || this.state.sm1 === null
      || this.state.type === null) {
      return;
    }

    this.props.handleSubmit({
      type: this.state.type,
      stateId1: this.state.sm1.id,
      stateId2: this.state.sm2.id,
    });
  }

  render() {
    return (
      <form>
        <div className="row m-1">
          <label className="control-label col-md-12">Operations: </label>
        </div>
        <div className="row m-1">
          <div className="col-md-12">
            <StateMachineDropDownSelector objects={this.props.stateMachines} update={this._updateSm1}/>
          </div>
        </div>
        <div className="row m-1">
          <div className="col-md-12">
            <StateMachineDropDownSelector objects={this.props.stateMachines} update={this._updateSm2}/>
          </div>
        </div>
        <div className="row m-1">
          <div className="col-md-12">
            <StateMachineDropDownSelector objects={this.populateTypes()} update={this._updateType}/>
          </div>
        </div>
        <div className="row m-1">
          <button className={'btn btn-outline-secondary btn-block'}
                  onClick={this._handleSubmit} type="submit">Submit</button>
        </div>
      </form>
    )
  }
}
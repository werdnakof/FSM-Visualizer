import * as React from 'react'
import AddStateContainer from '../containers/State'
import GraphContainer from '../containers/graph'
import AddTransitionContainer from '../containers/AddTransition'
import AddAlphabetContainer from '../containers/AddAlphabet'
import EditStateMachineContainer from '../containers/EditStateMachine'
import AddAcceptedStateContainer from '../containers/AcceptedState'
import OperatedGraphContainer from '../containers/OperatedGraph'
import OperationSubmitContainer from '../containers/OperationSubmit'
import StartStateContainer from '../containers/StartState'

import './css/app.css';

class App extends React.Component {
  render() {
    return (
      <div className="my-fluid-container">
        <div className="row first-row">
          <div className="col-md-4 mt-3">
            <EditStateMachineContainer />
            <AddStateContainer />
            <StartStateContainer />
            <AddAcceptedStateContainer />
            <AddAlphabetContainer />
            <AddTransitionContainer />
          </div>
          <div className="col-md-8 mt-4">
            <GraphContainer/>
          </div>
        </div>
        <hr />
        <div className="row first-row">
          <div className="col-md-4">
            <OperationSubmitContainer />
          </div>
          <div className="col-md-8">
            <OperatedGraphContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

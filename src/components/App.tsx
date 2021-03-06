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
import Description from './Description';

import './css/app.css';

class App extends React.Component {
  render() {
    return (
      <div className="my-fluid-container">
        <div className="row first-row">
          <div className="col-md-8 mt-2">
            <Description />
            <GraphContainer/>
          </div>
          <div className="col-md-4 mt-3 right-side">
            <EditStateMachineContainer />
            <AddStateContainer />
            <StartStateContainer />
            <AddAcceptedStateContainer />
            <AddAlphabetContainer />
            <AddTransitionContainer />
          </div>
        </div>
        <hr />
        <div className="row first-row mb-2">
          <div className="col-md-8">
            <OperatedGraphContainer />
          </div>
          <div className="col-md-4 right-side">
            <OperationSubmitContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

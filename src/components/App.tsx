import * as React from 'react'
import AddStateContainer from '../containers/State'
import GraphContainer from '../containers/graph'
import AddTransitionContainer from '../containers/AddTransition'
import AddAlphabetContainer from '../containers/AddAlphabet'
import EditStateMachineContainer from '../containers/EditStateMachine'
import AddAcceptedStateContainer from '../containers/AcceptedState'
import OperatedGraphContainer from '../containers/OperatedGraph'
import OperationSubmitContainer from '../containers/OperationSubmit'

class App extends React.Component {
  render() {
    return (
      <div>
        <EditStateMachineContainer />
        <AddStateContainer />
        <AddAcceptedStateContainer />
        <AddAlphabetContainer />
        <AddTransitionContainer />
        <GraphContainer/>
        <OperationSubmitContainer />
        <OperatedGraphContainer />
      </div>
    );
  }
}

export default App;

import * as React from 'react'
import AddStateContainer from '../containers/State'
import GraphContainer from '../containers/graph'
import AddTransitionContainer from '../containers/AddTransition'
import AddAlphabetContainer from '../containers/AddAlphabet'
import EditStateMachineContainer from '../containers/EditStateMachine'
import AddAcceptedStateContainer from '../containers/AcceptedState'

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
      </div>
    );
  }
}

export default App;

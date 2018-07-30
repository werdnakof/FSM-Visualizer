import * as React from 'react'
import AddStateContainer from '../containers/AddState'
import GraphContainer from '../containers/graph'
import AddTransitionContainer from '../containers/AddTransition'
import AddAlphabetContainer from '../containers/AddAlphabet'
import EditStateMachineContainer from '../containers/EditStateMachine'

class App extends React.Component {
  render() {
    return (
      <div>
        <EditStateMachineContainer />
        <AddStateContainer />
        <AddAlphabetContainer />
        <AddTransitionContainer />
        <GraphContainer/>
      </div>
    );
  }
}

export default App;

import * as React from 'react'
import AddStateContainer from '../containers/AddState'
import GraphContainer from '../containers/graph'
import AddTransitionContainer from '../containers/AddTransition'
import AddAlphabetContainer from '../containers/AddAlphabet'

class App extends React.Component {
  render() {
    return (
      <div>
        <AddStateContainer />
        <AddAlphabetContainer />
        <AddTransitionContainer />
        <GraphContainer/>
      </div>
    );
  }
}

export default App;

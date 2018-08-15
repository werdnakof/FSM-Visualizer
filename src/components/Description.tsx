import * as React from 'react';

export default class Description extends React.Component {
  render() {
    return (
      <div>
        <h1>A FSM Simulator</h1>
        <h3><i>Visualize your DFAs/NFAs one symbol at a time!</i></h3>
        <p><i>(or...you can upload a json)</i></p>
        <p className={'code-text'}>Code available on <a href={'https://github.com/werdnakof/FSM-Visualizer'}>GitHub </a>
          and under <a href={'http://www.apache.org/licenses/LICENSE-2.0'}>Apache License v2.0</a></p>
      </div>
    )
  }
}
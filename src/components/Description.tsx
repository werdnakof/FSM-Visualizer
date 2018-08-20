import * as React from 'react';

export default class Description extends React.Component {
  render() {
    return (
      <div>
        <h1>A FSM Simulator</h1>
        <h3><i>Visualize your DFAs/NFAs one symbol at a time!</i></h3>
        {/*<p><i>(or...you can upload a json)</i></p>*/}
        <p className={'code-text'}>Code available on <a href={'https://github.com/werdnakof/FSM-Visualizer'}>GitHub </a>
          and under <a href={'http://www.apache.org/licenses/LICENSE-2.0'}>Apache License v2.0</a></p>
        <hr />
        <p><b>What is a Finite State Machine (FSM) ?</b><br />
          A Finite State Machine (aka Finite State Automaton)
          is a mathematical model of computation which describes a definite
          state of a system at a given point of time. The formal definition can be summarised
          <a href={'https://en.wikipedia.org/wiki/Deterministic_finite_automaton#Formal_definition'}> here.</a>
        </p>
        <p>
          <b>But...what is it used for?</b>
          <br />
          Designing <a href={'https://cdn-images-1.medium.com/max/1600/1*_QivJY19d1Se_4iUuQ2z2g.gif'}> Pac Man</a>!
          <br />
        </p>
        <p>
          <b>How do I use this application?</b>
          <p>Enter your own state machine name, set of states, accepted states, start state and transitions.< br/>
          Whenever you submit an item, the canvas area will update automatically.</p>
        </p>
      </div>
    )
  }
}
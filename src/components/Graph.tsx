import * as React from 'react';
import { Network, DataSet } from 'vis';
import VState from '../models/VState'
import Transition from '../models/Transition'
import './css/graph.css';
import Alphabet from '../models/Alphabet';
import { StateMachineImpl } from '../selectors/statemachines';

export interface GraphProps {
  // states: VState[];
  // edges: Transition[];
  smi: StateMachineImpl
}

export default class Graph extends React.Component<GraphProps, {}> {
  constructor(props: GraphProps) {
    super(props);
    this.updateGraph.bind(this)
  }

  render() { return <div id="graph" />; }

  updateGraph() {
    console.log(this.props.smi);
    const nodes = new DataSet([...this.props.smi.states]);

    // create an array with edges
    const edges = new DataSet([...this.props.smi.edges]);

    // create a network
    const container = document.getElementById('graph');

    // provide the data in the vis format
    const data = { nodes, edges };

    const options = {};

    // initialize your network!
    const nw = new Network(container, data, options);
  }

  componentDidUpdate() {
    console.log('graph - componentDidUpdate');
    this.updateGraph()
  }

  componentDidMount() {
    console.log('graph - componentDidMount');
    this.updateGraph();
  }
}

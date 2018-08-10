import * as React from 'react';
import { Network, DataSet } from 'vis';
import VState from '../models/VState'
import Transition from '../models/Transition'
import './css/graph.css';
import Alphabet from '../models/Alphabet';
import { StateMachineImpl } from '../selectors/statemachines';

export interface GraphProps {
  // stateMachinesLabels: VState[];
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

    const nodes = new DataSet([...this.props.smi.states]);

    // create an array with edges
    const edges = new DataSet([...this.props.smi.edges]);

    // create a network
    const container = document.getElementById('graph');

    // provide the data in the vis format
    const data = { nodes, edges };

    const options = {
      nodes: {
        shape: 'dot',
        size: 16,
        font: { size: 12 },
        borderWidth: 1,
        margin: {
          top: 10,
          bottom: 20
        }
      },
      edges: {
        width: 1,
        font: { size: 12 }
      },
      interaction: {
        dragNodes: false,
        dragView: false,
        zoomView: false
      },
      layout: {
        randomSeed: 4,
        hierarchical: { sortMethod: 'directed', direction: 'LR' } }
    };

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

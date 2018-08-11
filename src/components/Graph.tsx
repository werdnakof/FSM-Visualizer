import * as React from 'react';
import { Network, DataSet } from 'vis';
import './css/graph.css';
import { StateMachineImpl } from '../models/StateMachineImpl';

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

    const data = { nodes, edges };

    const options = {
      // height: '500px',
      // width: '50%',
      // nodes: {
      //   shape: 'dot'
      // }
    };

    const nw = new Network(container, data, options);
  }

  componentDidUpdate() {
    this.updateGraph()
  }

  componentDidMount() {
    this.updateGraph();
  }
}

import * as React from 'react';
import { Network, DataSet } from 'vis';
import './css/graph.css';
import { StateMachineImpl } from '../models/StateMachineImpl';

export interface GraphProps {
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

    const edges = new DataSet([...this.props.smi.edges]);

    const container = document.getElementById('graph');

    const data = { nodes, edges };

    const options = {
      height: '100%',
      width: '100%',
      edges: {
        length: 600,
        font: { size: 24 }
      },
      nodes: { font: { size: 38 } },
      layout: { randomSeed: 3 }
    };

    const nw = new Network(container, data, options);

    nw.fit();
  }

  componentDidUpdate() {
    this.updateGraph()
  }

  componentDidMount() {
    this.updateGraph();
  }
}

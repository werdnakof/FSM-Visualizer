import * as React from 'react';
import { Network, DataSet } from 'vis';
import './css/graph.css';
import { Concatenation } from '../models/operations/Concatenation';
import { Union } from '../models/operations/Union';
import { Product } from '../models/operations/Product';

export type OperationType = Concatenation | Union | Product;

export interface OperationGraphProps {
  type: OperationType
}

export default class OperationGraph extends React.Component<OperationGraphProps, {}> {
  constructor(props: OperationGraphProps) {
    super(props);
    this.updateGraph.bind(this)
  }

  render() { return <div id="op_graph" />; }

  updateGraph() {
    const nodes = new DataSet(Array.from(this.props.type.states));

    // create an array with edges
    const edges = new DataSet(Array.from(this.props.type.edges));

    // create a network
    const container = document.getElementById('op_graph');

    // provide the data in the vis format
    const data = { nodes, edges };

    const options = {
      height: '100%',
      width: '100%',
      edges: {
        length: 700,
        font: { size: 24 }
      },
      nodes: { font: { size: 38 } },
      layout: { randomSeed: 3 }
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

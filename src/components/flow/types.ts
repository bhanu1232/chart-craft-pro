
import { Node, Edge } from '@xyflow/react';

// Define the data structure for flow nodes
export interface FlowNodeData {
  label: string;
  imageUrl?: string;
  style?: React.CSSProperties;
  [key: string]: unknown; // Add index signature to satisfy Record<string, unknown>
}

// Define custom node type
export type FlowNode = Node<FlowNodeData>;

// Define custom edge type
export type FlowEdge = Edge;


import React, { useState, useCallback, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  MarkerType,
} from '@xyflow/react';
import { toPng } from 'html-to-image';
import { toast } from "sonner";
import '@xyflow/react/dist/style.css';

import { NodeSelector } from './NodeSelector';
import { 
  DecisionNode, 
  ActionNode, 
  SuccessNode, 
  ErrorNode,
  FlagNode,
  QRCodeNode,
  CardNode
} from './CustomNodes';

// Initial nodes and edges
const initialNodes = [
  {
    id: 'decision-1',
    type: 'decision',
    position: { x: 300, y: 50 },
    data: { label: 'Is Valid Country?' },
  },
  {
    id: 'flag-1',
    type: 'flag',
    position: { x: 150, y: 150 },
    data: { label: 'International' },
  },
  {
    id: 'action-1',
    type: 'action',
    position: { x: 450, y: 150 },
    data: { label: 'Domestic' },
  },
  {
    id: 'decision-2',
    type: 'decision',
    position: { x: 450, y: 250 },
    data: { label: 'Shows QR code?' },
  },
  {
    id: 'qrcode-1',
    type: 'qrcode',
    position: { x: 350, y: 350 },
    data: { label: 'QR Payment' },
  },
  {
    id: 'card-1',
    type: 'card',
    position: { x: 550, y: 350 },
    data: { label: 'Pay Cards' },
  },
];

const initialEdges = [
  { 
    id: 'e1-2', 
    source: 'decision-1', 
    target: 'flag-1', 
    sourceHandle: 'yes',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    label: 'Yes' 
  },
  { 
    id: 'e1-3', 
    source: 'decision-1', 
    target: 'action-1', 
    sourceHandle: 'no',
    markerEnd: { type: MarkerType.ArrowClosed },
    label: 'No' 
  },
  { 
    id: 'e3-4', 
    source: 'action-1', 
    target: 'decision-2',
    markerEnd: { type: MarkerType.ArrowClosed } 
  },
  { 
    id: 'e4-5', 
    source: 'decision-2', 
    target: 'qrcode-1', 
    sourceHandle: 'yes',
    markerEnd: { type: MarkerType.ArrowClosed },
    label: 'Yes' 
  },
  { 
    id: 'e4-6', 
    source: 'decision-2', 
    target: 'card-1', 
    sourceHandle: 'no',
    markerEnd: { type: MarkerType.ArrowClosed },
    label: 'No' 
  },
];

// Node types mapping
const nodeTypes = {
  decision: DecisionNode,
  action: ActionNode,
  success: SuccessNode,
  error: ErrorNode,
  flag: FlagNode,
  qrcode: QRCodeNode,
  card: CardNode,
};

const FlowEditor: React.FC = () => {
  const reactFlowRef = useRef<HTMLDivElement>(null);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeCount, setNodeCount] = useState({
    action: 1,
    decision: 2,
    success: 0,
    error: 0,
    flag: 1,
    qrcode: 1,
    card: 1,
  });

  const onConnect = useCallback((params: any) => {
    setEdges((eds) => 
      addEdge({ 
        ...params, 
        markerEnd: { type: MarkerType.ArrowClosed },
        animated: false,
      }, eds)
    );
  }, [setEdges]);

  const handleAddNode = (type: string) => {
    const count = nodeCount[type as keyof typeof nodeCount] + 1;
    setNodeCount({
      ...nodeCount,
      [type]: count,
    });

    const id = `${type}-${count}`;
    let newNode = {
      id,
      type,
      position: { x: 100 + Math.random() * 300, y: 100 + Math.random() * 100 },
      data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${count}` },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const handleDownload = () => {
    if (reactFlowRef.current === null) return;

    const nodesBounds = document.querySelector('.react-flow__nodes');
    if (!nodesBounds) return;

    toast("Preparing download...");

    toPng(reactFlowRef.current, {
      backgroundColor: '#F7F9FB',
      quality: 1,
      filter: (node) => {
        // Skip hidden elements and control panel
        if (node?.classList?.contains('react-flow__panel')) return false;
        if (node?.classList?.contains('react-flow__attribution')) return false;
        return true;
      }
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'flowchart.png';
        link.href = dataUrl;
        link.click();
        toast.success("Flowchart downloaded successfully!");
      })
      .catch((error) => {
        console.error('Error downloading image:', error);
        toast.error("Failed to download flowchart");
      });
  };

  return (
    <div className="h-full w-full" style={{ height: 'calc(100vh - 16px)' }}>
      <ReactFlow
        ref={reactFlowRef}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.2}
        maxZoom={1.5}
        deleteKeyCode={['Delete', 'Backspace']}
      >
        <Controls position="bottom-right" />
        <MiniMap
          nodeColor={(node) => {
            switch (node.type) {
              case 'action':
                return '#4DABF7';
              case 'decision':
                return '#FCC419';
              case 'success':
                return '#40C057';
              case 'error':
                return '#FA5252';
              default:
                return '#7950F2';
            }
          }}
          maskColor="rgba(240, 240, 240, 0.6)"
        />
        <Background gap={16} size={1} />
        
        <Panel position="top-left">
          <NodeSelector 
            onAddNode={handleAddNode} 
            onDownload={handleDownload} 
          />
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default FlowEditor;

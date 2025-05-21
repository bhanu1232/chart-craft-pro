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
  Edge,
  Connection,
  Node,
  useReactFlow,
  NodeChange,
  EdgeChange,
} from '@xyflow/react';
import { toPng } from 'html-to-image';
import { toast } from "sonner";
import '@xyflow/react/dist/style.css';

import { 
  DecisionNode, 
  ActionNode, 
  SuccessNode, 
  ErrorNode,
  FlagNode,
  QRCodeNode,
  CardNode,
  ImageNode
} from './CustomNodes';
import { ToolbarPanel } from './ToolbarPanel';
import { NodeSettingsPanel } from './NodeSettingsPanel';

// Node types mapping
const nodeTypes = {
  decision: DecisionNode,
  action: ActionNode,
  success: SuccessNode,
  error: ErrorNode,
  flag: FlagNode,
  qrcode: QRCodeNode,
  card: CardNode,
  image: ImageNode,
};

// Initial nodes and edges - no type changes needed here
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
  {
    id: 'image-1',
    type: 'image',
    position: { x: 250, y: 450 },
    data: { 
      label: 'Sample Image',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475'
    },
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

// Define our custom node type that matches the structure used throughout the app
interface FlowNodeData {
  label: string;
  imageUrl?: string;
  style?: React.CSSProperties;
}

type FlowNode = Node<FlowNodeData>;
type FlowEdge = Edge;

const FlowEditor: React.FC = () => {
  const reactFlowRef = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useReactFlow();
  
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNodeData>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeCount, setNodeCount] = useState({
    action: 1,
    decision: 2,
    success: 0,
    error: 0,
    flag: 1,
    qrcode: 1,
    card: 1,
    image: 1,
  });
  const [history, setHistory] = useState<{nodes: FlowNode[], edges: FlowEdge[]}[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);
  const [showNodeSettings, setShowNodeSettings] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Handle node selection
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node as FlowNode);
    setShowNodeSettings(true);
  }, []);

  // Handle node styling update
  const handleUpdateNode = useCallback((id: string, data: any) => {
    setNodes(nds => 
      nds.map(node => {
        if (node.id === id) {
          return { ...node, data: { ...data } };
        }
        return node;
      })
    );
    setTimeout(() => saveToHistory(), 0);
  }, [setNodes]);

  // Save current state to history
  const saveToHistory = useCallback(() => {
    const currentState = {
      nodes: JSON.parse(JSON.stringify(nodes)) as FlowNode[],
      edges: JSON.parse(JSON.stringify(edges)) as FlowEdge[]
    };
    
    // Only save if there are actual changes
    if (historyIndex >= 0) {
      const lastState = history[historyIndex];
      if (JSON.stringify(lastState) === JSON.stringify(currentState)) {
        return;
      }
    }
    
    // Remove future history if we're not at the latest point
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, currentState]);
    setHistoryIndex(newHistory.length);
  }, [nodes, edges, history, historyIndex]);

  // Undo function
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const previousState = history[newIndex];
      setNodes(previousState.nodes as any);
      setEdges(previousState.edges as any);
      setHistoryIndex(newIndex);
      toast("Undo successful");
    } else {
      toast("Nothing to undo");
    }
  }, [historyIndex, history, setNodes, setEdges]);

  // Redo function
  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const nextState = history[newIndex];
      setNodes(nextState.nodes as any);
      setEdges(nextState.edges as any);
      setHistoryIndex(newIndex);
      toast("Redo successful");
    } else {
      toast("Nothing to redo");
    }
  }, [historyIndex, history, setNodes, setEdges]);

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => {
      const newEdges = addEdge({ 
        ...params, 
        markerEnd: { type: MarkerType.ArrowClosed },
        animated: false,
      }, eds);
      
      setTimeout(() => saveToHistory(), 0);
      return newEdges;
    });
  }, [setEdges, saveToHistory]);

  const handleAddNode = useCallback((type: string, options = {}) => {
    const count = nodeCount[type as keyof typeof nodeCount] + 1;
    setNodeCount({
      ...nodeCount,
      [type]: count,
    });

    const id = `${type}-${count}`;
    const newNode: FlowNode = {
      id,
      type,
      position: { x: 100 + Math.random() * 300, y: 100 + Math.random() * 100 },
      data: { 
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${count}`,
        ...options
      },
    };

    setNodes((nds) => {
      const updatedNodes = nds.concat(newNode as any);
      setTimeout(() => saveToHistory(), 0);
      return updatedNodes;
    });
  }, [nodeCount, setNodes, saveToHistory]);

  const handleDownload = useCallback(() => {
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
  }, []);

  const handleImageUpload = useCallback(() => {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          handleAddNode('image', { imageUrl });
          toast.success("Image added successfully!");
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }, [handleAddNode]);

  const handleZoomIn = useCallback(() => {
    const flow = reactFlowInstance;
    if (flow) {
      const { x, y, zoom } = flow.getViewport();
      flow.setViewport({ x, y, zoom: zoom * 1.2 });
      setZoomLevel(zoom * 1.2);
    }
  }, [reactFlowInstance]);

  const handleZoomOut = useCallback(() => {
    const flow = reactFlowInstance;
    if (flow) {
      const { x, y, zoom } = flow.getViewport();
      flow.setViewport({ x, y, zoom: zoom / 1.2 });
      setZoomLevel(zoom / 1.2);
    }
  }, [reactFlowInstance]);

  const handleAutoLayout = useCallback(() => {
    // Simple auto-layout algorithm
    const nodesByType = nodes.reduce((acc: Record<string, Node[]>, node) => {
      const type = node.type || 'default';
      if (!acc[type]) acc[type] = [];
      acc[type].push(node);
      return acc;
    }, {});

    let layoutedNodes = [...nodes];
    let yOffset = 50;
    
    Object.entries(nodesByType).forEach(([type, typeNodes]) => {
      const spacing = 180;
      const nodesPerRow = 3;
      
      typeNodes.forEach((node, i) => {
        const xPos = 100 + (i % nodesPerRow) * spacing;
        const yPos = yOffset + Math.floor(i / nodesPerRow) * 150;
        
        layoutedNodes = layoutedNodes.map(n => {
          if (n.id === node.id) {
            return {
              ...n,
              position: { x: xPos, y: yPos }
            };
          }
          return n;
        });
      });
      
      yOffset += Math.ceil(typeNodes.length / nodesPerRow) * 150 + 50;
    });
    
    setNodes(layoutedNodes);
    toast.success("Flow automatically arranged");
    setTimeout(() => saveToHistory(), 0);
  }, [nodes, setNodes, saveToHistory]);

  const handleDeleteSelection = useCallback(() => {
    if (selectedNode) {
      setNodes(nodes => nodes.filter(n => n.id !== selectedNode.id));
      setSelectedNode(null);
      setShowNodeSettings(false);
      toast("Node deleted");
      setTimeout(() => saveToHistory(), 0);
    } else {
      toast.error("No node selected");
    }
  }, [selectedNode, setNodes, saveToHistory]);

  const handleCopyNode = useCallback(() => {
    if (selectedNode) {
      const newNodeType = selectedNode.type || 'action';
      const count = nodeCount[newNodeType as keyof typeof nodeCount] + 1;
      
      setNodeCount(prev => ({
        ...prev,
        [newNodeType]: count
      }));
      
      // Create a properly typed copy of the node
      const newNode: FlowNode = {
        ...selectedNode,
        id: `${newNodeType}-${count}`,
        position: {
          x: selectedNode.position.x + 50,
          y: selectedNode.position.y + 50
        }
      };
      
      setNodes(prev => [...prev, newNode as any]);
      toast.success("Node duplicated");
      setTimeout(() => saveToHistory(), 0);
    } else {
      toast.error("No node selected");
    }
  }, [selectedNode, nodeCount, setNodes, saveToHistory]);

  // Initialize history with initial state
  React.useEffect(() => {
    if (history.length === 0) {
      saveToHistory();
    }
  }, [history, saveToHistory]);

  // Monitor keyboard for shortcuts
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Undo: Ctrl/Cmd + Z
      if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
        event.preventDefault();
        handleUndo();
      }
      // Redo: Ctrl/Cmd + Y or Ctrl/Cmd + Shift + Z
      if ((event.ctrlKey || event.metaKey) && (event.key === 'y' || (event.shiftKey && event.key === 'z'))) {
        event.preventDefault();
        handleRedo();
      }
      // Space to quick add node
      if (event.code === 'Space') {
        event.preventDefault();
        handleAddNode('action');
      }
      // Save with Ctrl/Cmd + S
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        handleDownload();
      }
      // Delete selected node with Delete key
      if (event.key === 'Delete' && selectedNode) {
        event.preventDefault();
        handleDeleteSelection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleUndo, handleRedo, handleAddNode, handleDownload, handleDeleteSelection, selectedNode]);

  // Monitor changes to save to history
  React.useEffect(() => {
    const saveTimeout = setTimeout(() => {
      if (history.length > 0) {
        saveToHistory();
      }
    }, 500);
    
    return () => clearTimeout(saveTimeout);
  }, [nodes, edges, saveToHistory, history.length]);

  return (
    <div className="h-full w-full" style={{ height: 'calc(100vh - 61px)' }}>
      <ReactFlow
        ref={reactFlowRef}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        minZoom={0.2}
        maxZoom={1.5}
        deleteKeyCode={['Delete', 'Backspace']}
        className="bg-gray-50"
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
              case 'image':
                return '#7950F2';
              default:
                return '#7950F2';
            }
          }}
          maskColor="rgba(240, 240, 240, 0.6)"
        />
        <Background gap={16} size={1} />
        
        <Panel position="top-left" className="bg-white shadow-md rounded-lg p-0 overflow-hidden">
          <ToolbarPanel 
            onAddNode={handleAddNode} 
            onDownload={handleDownload}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onImageUpload={handleImageUpload}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onAutoLayout={handleAutoLayout}
            onDeleteSelection={handleDeleteSelection}
            onCopyNode={handleCopyNode}
          />
        </Panel>
        
        {showNodeSettings && selectedNode && (
          <NodeSettingsPanel 
            selectedNode={selectedNode} 
            onClose={() => setShowNodeSettings(false)} 
            onUpdateNode={handleUpdateNode} 
          />
        )}
      </ReactFlow>
    </div>
  );
};

export default FlowEditor;

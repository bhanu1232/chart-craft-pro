
import React from 'react';
import { Handle, Position } from '@xyflow/react';

type NodeProps = {
  data: {
    label: string;
  };
  isConnectable: boolean;
};

export const DecisionNode: React.FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="node-content">{data.label}</div>
      <Handle
        type="source"
        position={Position.Right}
        id="yes"
        style={{ top: '50%', right: '-4px' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="no"
        isConnectable={isConnectable}
      />
    </>
  );
};

export const ActionNode: React.FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </>
  );
};

export const SuccessNode: React.FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="flex items-center justify-center">
        <span className="mr-2">✓</span>
        {data.label}
      </div>
    </>
  );
};

export const ErrorNode: React.FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="flex items-center justify-center">
        <span className="mr-2">✕</span>
        {data.label}
      </div>
    </>
  );
};

export const FlagNode: React.FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="p-1">
        <div className="grid grid-cols-3 gap-1">
          <div className="bg-red-500 w-6 h-4 rounded-sm"></div>
          <div className="bg-yellow-500 w-6 h-4 rounded-sm"></div>
          <div className="bg-green-500 w-6 h-4 rounded-sm"></div>
          <div className="bg-blue-500 w-6 h-4 rounded-sm"></div>
          <div className="bg-purple-500 w-6 h-4 rounded-sm"></div>
          <div className="bg-orange-500 w-6 h-4 rounded-sm"></div>
          <div className="bg-gray-500 w-6 h-4 rounded-sm"></div>
          <div className="bg-pink-500 w-6 h-4 rounded-sm"></div>
          <div className="bg-teal-500 w-6 h-4 rounded-sm"></div>
        </div>
        <div className="mt-2 text-xs">{data.label}</div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </>
  );
};

export const QRCodeNode: React.FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="p-1">
        <div className="bg-white w-16 h-16 mx-auto mb-1 flex items-center justify-center">
          <div className="w-12 h-12 bg-black p-1">
            <div className="grid grid-cols-4 gap-0.5">
              {Array(16).fill(0).map((_, i) => (
                <div key={i} className={`${Math.random() > 0.5 ? 'bg-white' : 'bg-black'} w-2 h-2`}></div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-xs">{data.label}</div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </>
  );
};

export const CardNode: React.FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="p-1">
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 w-20 h-12 rounded-md mx-auto mb-1 relative p-1">
          <div className="absolute top-2 left-1 w-4 h-3 bg-yellow-300 rounded-sm"></div>
          <div className="absolute bottom-1 left-1 text-[6px] text-white">1234 5678 9012</div>
        </div>
        <div className="text-xs">{data.label}</div>
      </div>
    </>
  );
};

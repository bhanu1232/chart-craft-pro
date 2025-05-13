
import React from 'react';
import FlowEditor from '@/components/flow/FlowEditor';

const Index: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="p-3 border-b bg-white shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold flex items-center">
            <span className="mr-1 text-blue-600">ꟻ</span> Finix Flow
          </h1>
          <p className="text-xs text-gray-500">Professional Flow Editor</p>
        </div>
        <div className="text-xs text-gray-500">
          Press Space to quick-add nodes or Ctrl+S to save your flow
        </div>
      </div>
      
      <div className="flex-1">
        <FlowEditor />
      </div>
    </div>
  );
};

export default Index;

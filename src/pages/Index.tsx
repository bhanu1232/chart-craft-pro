
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import FlowEditor from '@/components/flow/FlowEditor';

const Index: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b bg-white shadow-sm">
          <h1 className="text-xl font-semibold">User Flow</h1>
          <p className="text-sm text-gray-500">Design and manage user payment flow</p>
        </div>
        
        <div className="flex-1 p-2">
          <FlowEditor />
        </div>
      </div>
    </div>
  );
};

export default Index;

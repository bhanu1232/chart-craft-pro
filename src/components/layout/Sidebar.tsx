
import React from 'react';
import { 
  Circle,
  Square, 
  Triangle, 
  CreditCard, 
  Image,
  Layers,
  Settings,
  Download,
  Upload,
  Component,
  Palette,
  Undo,
  Redo,
  Plus,
  Search,
  Layout,
  Check,
  X,
  QrCode,
  Flag
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <div className="flow-sidebar w-64 min-h-screen p-4 text-white">
      <div className="flex items-center mb-10 pl-2">
        <div className="text-2xl font-bold">
          <span className="mr-1">ꟻ</span> Finix Flow
        </div>
      </div>

      <div className="mb-8">
        <div className="text-xs uppercase text-gray-400 mb-2 pl-2">Elements</div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <Square className="w-5 h-5 mr-3 text-flow-blue" />
          <span>Action</span>
        </div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <Triangle className="w-5 h-5 mr-3 text-flow-yellow" />
          <span>Decision</span>
        </div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <Check className="w-5 h-5 mr-3 text-flow-green" />
          <span>Success</span>
        </div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <X className="w-5 h-5 mr-3 text-flow-red" />
          <span>Error</span>
        </div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <CreditCard className="w-5 h-5 mr-3 text-blue-400" />
          <span>Card</span>
        </div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <Image className="w-5 h-5 mr-3 text-purple-400" />
          <span>Image</span>
        </div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <QrCode className="w-5 h-5 mr-3 text-gray-400" />
          <span>QR Code</span>
        </div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <Flag className="w-5 h-5 mr-3 text-green-400" />
          <span>Flag</span>
        </div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <Plus className="w-5 h-5 mr-3 text-gray-400" />
          <span>Add Custom</span>
        </div>
      </div>

      <div className="mb-8">
        <div className="text-xs uppercase text-gray-400 mb-2 pl-2">Tools</div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <Layers className="w-5 h-5 mr-3" />
          <span>Layers</span>
        </div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <Component className="w-5 h-5 mr-3" />
          <span>Components</span>
        </div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <Layout className="w-5 h-5 mr-3" />
          <span>Layout</span>
        </div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <Palette className="w-5 h-5 mr-3" />
          <span>Colors</span>
        </div>
      </div>

      <div className="mb-8">
        <div className="text-xs uppercase text-gray-400 mb-2 pl-2">Actions</div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <Undo className="w-5 h-5 mr-3" />
          <span>Undo</span>
        </div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <Redo className="w-5 h-5 mr-3" />
          <span>Redo</span>
        </div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <Download className="w-5 h-5 mr-3" />
          <span>Download</span>
        </div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <Upload className="w-5 h-5 mr-3" />
          <span>Import</span>
        </div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <Search className="w-5 h-5 mr-3" />
          <span>Search</span>
        </div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <Settings className="w-5 h-5 mr-3" />
          <span>Settings</span>
        </div>
      </div>

      <div className="mt-auto pt-4">
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="text-sm mb-2">Pro tip</div>
          <div className="text-xs text-gray-400">Press Space to quick-add nodes or Ctrl+S to save your flow.</div>
        </div>
      </div>
    </div>
  );
};

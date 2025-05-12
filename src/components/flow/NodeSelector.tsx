
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Square,
  Circle,
  Triangle,
  Check,
  X,
  Flag,
  QrCode,
  CreditCard,
  Download,
  Undo,
  Redo,
  Image,
  Layers,
  Palette,
  Layout,
  Component,
  Search,
  Settings
} from 'lucide-react';

interface NodeSelectorProps {
  onAddNode: (type: string) => void;
  onDownload: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onImageUpload: () => void;
}

export const NodeSelector: React.FC<NodeSelectorProps> = ({ 
  onAddNode, 
  onDownload, 
  onUndo, 
  onRedo, 
  onImageUpload 
}) => {
  return (
    <Card className="flow-panel w-64">
      <CardContent className="p-3">
        <div className="font-semibold mb-2">Elements</div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex flex-col items-center p-3 h-auto"
            onClick={() => onAddNode('action')}
          >
            <Square className="h-6 w-6 mb-1 text-flow-blue" />
            <span className="text-xs">Action</span>
          </Button>

          <Button 
            variant="outline" 
            size="sm" 
            className="flex flex-col items-center p-3 h-auto"
            onClick={() => onAddNode('decision')}
          >
            <Triangle className="h-6 w-6 mb-1 text-flow-yellow" />
            <span className="text-xs">Decision</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex flex-col items-center p-3 h-auto"
            onClick={() => onAddNode('success')}
          >
            <Check className="h-6 w-6 mb-1 text-flow-green" />
            <span className="text-xs">Success</span>
          </Button>

          <Button 
            variant="outline" 
            size="sm" 
            className="flex flex-col items-center p-3 h-auto"
            onClick={() => onAddNode('error')}
          >
            <X className="h-6 w-6 mb-1 text-flow-red" />
            <span className="text-xs">Error</span>
          </Button>

          <Button 
            variant="outline" 
            size="sm" 
            className="flex flex-col items-center p-3 h-auto"
            onClick={() => onAddNode('flag')}
          >
            <Flag className="h-6 w-6 mb-1 text-purple-500" />
            <span className="text-xs">Flags</span>
          </Button>

          <Button 
            variant="outline" 
            size="sm" 
            className="flex flex-col items-center p-3 h-auto"
            onClick={() => onAddNode('qrcode')}
          >
            <QrCode className="h-6 w-6 mb-1" />
            <span className="text-xs">QR Code</span>
          </Button>

          <Button 
            variant="outline" 
            size="sm" 
            className="flex flex-col items-center p-3 h-auto"
            onClick={() => onAddNode('card')}
          >
            <CreditCard className="h-6 w-6 mb-1 text-blue-500" />
            <span className="text-xs">Card</span>
          </Button>

          <Button 
            variant="outline" 
            size="sm" 
            className="flex flex-col items-center p-3 h-auto"
            onClick={onImageUpload}
          >
            <Image className="h-6 w-6 mb-1 text-purple-500" />
            <span className="text-xs">Image</span>
          </Button>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center flex-1"
              onClick={onUndo}
            >
              <Undo className="h-4 w-4 mr-1" />
              Undo
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center flex-1"
              onClick={onRedo}
            >
              <Redo className="h-4 w-4 mr-1" />
              Redo
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex flex-col items-center h-14 p-1">
                  <Layers className="h-5 w-5 mb-1" />
                  <span className="text-xs">Layers</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-3 w-48">
                <div className="text-sm font-semibold mb-2">Layers</div>
                <div className="text-xs text-gray-500">
                  Manage flow diagram layers
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex flex-col items-center h-14 p-1">
                  <Component className="h-5 w-5 mb-1" />
                  <span className="text-xs">Components</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-3 w-48">
                <div className="text-sm font-semibold mb-2">Components</div>
                <div className="text-xs text-gray-500">
                  Reusable components library
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex flex-col items-center h-14 p-1">
                  <Layout className="h-5 w-5 mb-1" />
                  <span className="text-xs">Layout</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-3 w-48">
                <div className="text-sm font-semibold mb-2">Layout Tools</div>
                <div className="text-xs text-gray-500">
                  Auto-arrange your diagram
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex flex-col items-center h-14 p-1">
                  <Palette className="h-5 w-5 mb-1" />
                  <span className="text-xs">Colors</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-3 w-48">
                <div className="text-sm font-semibold mb-2">Color Theme</div>
                <div className="text-xs text-gray-500">
                  Customize your diagram colors
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Button 
            className="w-full flex items-center justify-center"
            onClick={onDownload}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Flowchart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

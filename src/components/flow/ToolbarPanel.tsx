
import React from 'react';
import { 
  Square,
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
  Settings,
  Plus,
  Copy,
  Trash,
  ZoomIn,
  ZoomOut,
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ToolbarPanelProps {
  onAddNode: (type: string) => void;
  onDownload: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onImageUpload: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onAutoLayout: () => void;
  onDeleteSelection: () => void;
  onCopyNode: () => void;
}

export const ToolbarPanel: React.FC<ToolbarPanelProps> = ({ 
  onAddNode, 
  onDownload, 
  onUndo, 
  onRedo, 
  onImageUpload,
  onZoomIn,
  onZoomOut,
  onAutoLayout,
  onDeleteSelection,
  onCopyNode
}) => {
  return (
    <div className="p-3 flex flex-col gap-3">
      <div>
        <div className="text-sm font-semibold mb-2">Elements</div>
        <div className="grid grid-cols-4 gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="aspect-square"
                onClick={() => onAddNode('action')}
              >
                <Square className="h-5 w-5 text-blue-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Action Node</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="aspect-square"
                onClick={() => onAddNode('decision')}
              >
                <Triangle className="h-5 w-5 text-yellow-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Decision Node</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="aspect-square"
                onClick={() => onAddNode('success')}
              >
                <Check className="h-5 w-5 text-green-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Success Node</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="aspect-square"
                onClick={() => onAddNode('error')}
              >
                <X className="h-5 w-5 text-red-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Error Node</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="aspect-square"
                onClick={() => onAddNode('flag')}
              >
                <Flag className="h-5 w-5 text-purple-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Flag Node</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="aspect-square"
                onClick={() => onAddNode('qrcode')}
              >
                <QrCode className="h-5 w-5 text-gray-700" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>QR Code Node</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="aspect-square"
                onClick={() => onAddNode('card')}
              >
                <CreditCard className="h-5 w-5 text-blue-400" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Payment Card</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="aspect-square"
                onClick={onImageUpload}
              >
                <Image className="h-5 w-5 text-purple-400" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Image</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <Separator />

      <div>
        <div className="text-sm font-semibold mb-2">Edit</div>
        <div className="grid grid-cols-4 gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="aspect-square"
                onClick={onUndo}
              >
                <Undo className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="aspect-square"
                onClick={onRedo}
              >
                <Redo className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo (Ctrl+Y)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="aspect-square"
                onClick={onCopyNode}
              >
                <Copy className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Duplicate (Ctrl+D)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="aspect-square"
                onClick={onDeleteSelection}
              >
                <Trash className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete Selection</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <Separator />

      <div>
        <div className="text-sm font-semibold mb-2">View</div>
        <div className="grid grid-cols-4 gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="aspect-square"
                onClick={onZoomIn}
              >
                <ZoomIn className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Zoom In</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="aspect-square"
                onClick={onZoomOut}
              >
                <ZoomOut className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Zoom Out</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="aspect-square"
                onClick={onAutoLayout}
              >
                <Layout className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Auto Layout</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="aspect-square"
              >
                <Palette className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Theme</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <Separator />
      
      <div>
        <div className="text-sm font-semibold mb-2">Actions</div>
        <div className="flex flex-col gap-2">
          <Button 
            variant="default" 
            className="w-full flex items-center gap-2 justify-center"
            onClick={onDownload}
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2 justify-center"
          >
            <Save className="h-4 w-4" />
            <span>Save Project</span>
          </Button>
        </div>
      </div>

      <div className="mt-2 text-xs text-gray-500">
        <p className="mb-1 font-medium">Keyboard shortcuts:</p>
        <p>Space: Quick add node</p>
        <p>Ctrl+S: Download</p>
        <p>Delete: Remove selected</p>
        <p>Click node: Edit properties</p>
      </div>
    </div>
  );
};

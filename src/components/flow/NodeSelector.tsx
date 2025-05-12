
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Square,
  Circle,
  Triangle,
  Check,
  X,
  Flag,
  QrCode,
  CreditCard,
  Download
} from 'lucide-react';

interface NodeSelectorProps {
  onAddNode: (type: string) => void;
  onDownload: () => void;
}

export const NodeSelector: React.FC<NodeSelectorProps> = ({ onAddNode, onDownload }) => {
  return (
    <div className="flow-panel p-4 mb-4">
      <div className="font-semibold mb-3">Add Node</div>
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
      </div>

      <Button 
        className="w-full flex items-center justify-center"
        onClick={onDownload}
      >
        <Download className="mr-2 h-4 w-4" />
        Download Flowchart
      </Button>
    </div>
  );
};

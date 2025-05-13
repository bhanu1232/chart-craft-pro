
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Palette, X } from 'lucide-react';
import { toast } from 'sonner';

interface NodeSettingsPanelProps {
  selectedNode: any;
  onClose: () => void;
  onUpdateNode: (id: string, data: any) => void;
}

const NODE_COLORS = [
  { bg: '#4DABF7', text: '#ffffff', label: 'Blue' },
  { bg: '#FCC419', text: '#000000', label: 'Yellow' },
  { bg: '#40C057', text: '#ffffff', label: 'Green' },
  { bg: '#FA5252', text: '#ffffff', label: 'Red' },
  { bg: '#7950F2', text: '#ffffff', label: 'Purple' },
  { bg: '#212529', text: '#ffffff', label: 'Black' },
  { bg: '#F8F9FA', text: '#212529', label: 'White' },
  { bg: '#FF922B', text: '#ffffff', label: 'Orange' },
];

export const NodeSettingsPanel: React.FC<NodeSettingsPanelProps> = ({ 
  selectedNode, 
  onClose,
  onUpdateNode 
}) => {
  if (!selectedNode) return null;
  
  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateNode(selectedNode.id, { 
      ...selectedNode.data, 
      label: e.target.value 
    });
  };
  
  const handleColorChange = (bg: string, text: string) => {
    onUpdateNode(selectedNode.id, { 
      ...selectedNode.data,
      style: { 
        ...selectedNode.data.style,
        backgroundColor: bg,
        color: text
      }
    });
    toast.success("Node style updated");
  };
  
  const handleSizeChange = (value: number[]) => {
    onUpdateNode(selectedNode.id, { 
      ...selectedNode.data,
      style: { 
        ...selectedNode.data.style,
        width: value[0],
        height: Math.round(value[0] * 0.7) // Keep aspect ratio
      }
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 absolute right-4 top-20 z-10 w-64">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold flex items-center">
          <Palette className="h-4 w-4 mr-2" />
          Node Settings
        </h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium block mb-1">Node Label</label>
          <input
            type="text"
            value={selectedNode.data.label || ''}
            onChange={handleLabelChange}
            className="w-full p-2 border rounded text-sm"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium block mb-1">Node Color</label>
          <div className="grid grid-cols-4 gap-2">
            {NODE_COLORS.map((color, index) => (
              <button
                key={index}
                onClick={() => handleColorChange(color.bg, color.text)}
                className="w-full aspect-square rounded-md border hover:scale-110 transition-transform"
                style={{ backgroundColor: color.bg }}
                title={color.label}
              />
            ))}
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium block mb-1">Node Size</label>
          <Slider
            defaultValue={[selectedNode.width || 140]}
            min={80}
            max={300}
            step={10}
            onValueChange={handleSizeChange}
            className="my-4"
          />
          <div className="text-xs text-gray-500 text-center">
            {selectedNode.width || 140}px × {Math.round((selectedNode.width || 140) * 0.7)}px
          </div>
        </div>
      </div>
    </div>
  );
};

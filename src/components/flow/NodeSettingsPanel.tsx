
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Palette, X, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';
import { FlowNode, FlowNodeData } from './types';

interface NodeSettingsPanelProps {
  selectedNode: FlowNode;
  onClose: () => void;
  onUpdateNode: (id: string, data: FlowNodeData) => void;
}

// Color palette for node styling
const NODE_COLORS = [
  { bg: '#4DABF7', text: '#ffffff', label: 'Blue' },
  { bg: '#FCC419', text: '#000000', label: 'Yellow' },
  { bg: '#40C057', text: '#ffffff', label: 'Green' },
  { bg: '#FA5252', text: '#ffffff', label: 'Red' },
  { bg: '#7950F2', text: '#ffffff', label: 'Purple' },
  { bg: '#212529', text: '#ffffff', label: 'Black' },
  { bg: '#F8F9FA', text: '#212529', label: 'White' },
  { bg: '#FF922B', text: '#ffffff', label: 'Orange' },
  { bg: '#FF6B6B', text: '#ffffff', label: 'Coral' },
  { bg: '#20C997', text: '#ffffff', label: 'Teal' },
  { bg: '#BE4BDB', text: '#ffffff', label: 'Violet' },
  { bg: '#495057', text: '#ffffff', label: 'Dark Gray' },
];

// Border style options
const BORDER_STYLES = [
  { value: 'solid', label: 'Solid' },
  { value: 'dashed', label: 'Dashed' },
  { value: 'dotted', label: 'Dotted' },
  { value: 'double', label: 'Double' },
  { value: 'none', label: 'None' },
];

// Font family options
const FONT_FAMILIES = [
  { value: 'Inter, sans-serif', label: 'Inter' },
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Helvetica, sans-serif', label: 'Helvetica' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'monospace', label: 'Monospace' },
];

export const NodeSettingsPanel: React.FC<NodeSettingsPanelProps> = ({ 
  selectedNode, 
  onClose,
  onUpdateNode 
}) => {
  const [activeTab, setActiveTab] = useState('style');
  
  if (!selectedNode) return null;
  
  // Get initial style values from the node or use defaults
  const nodeStyle = selectedNode.data.style || {};
  
  // Extract style properties with fallbacks
  const nodeWidth = nodeStyle.width || 140;
  const nodeHeight = nodeStyle.height || 100;
  const nodeBorderRadius = nodeStyle.borderRadius || 5;
  const nodeBorderWidth = nodeStyle.borderWidth || 1;
  const nodeFontSize = nodeStyle.fontSize || 12;
  const nodeOpacity = (nodeStyle.opacity || 1) * 100;
  const nodeBorderStyle = nodeStyle.borderStyle || 'solid';
  const nodeFontFamily = nodeStyle.fontFamily || 'Inter, sans-serif';
  const nodeRotation = nodeStyle.transform ? 
    parseInt(nodeStyle.transform.replace('rotate(', '').replace('deg)', '')) || 0 : 0;

  // Handle basic label change
  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateNode(selectedNode.id, { 
      ...selectedNode.data, 
      label: e.target.value 
    });
  };
  
  // Handle color change (background and text)
  const handleColorChange = (bg: string, text: string) => {
    onUpdateNode(selectedNode.id, { 
      ...selectedNode.data,
      style: { 
        ...selectedNode.data.style,
        backgroundColor: bg,
        color: text,
        '--custom-bg': bg, // CSS variable for styling
        '--custom-color': text
      }
    });
    toast.success("Node style updated");
  };
  
  // Handle size change with aspect ratio option
  const handleSizeChange = (value: number[], keepRatio: boolean = false) => {
    const width = value[0];
    const height = keepRatio ? Math.round(width * 0.7) : nodeHeight;
    
    onUpdateNode(selectedNode.id, { 
      ...selectedNode.data,
      style: { 
        ...selectedNode.data.style,
        width,
        height
      }
    });
  };
  
  // Handle height change independently
  const handleHeightChange = (value: number[]) => {
    onUpdateNode(selectedNode.id, { 
      ...selectedNode.data,
      style: { 
        ...selectedNode.data.style,
        height: value[0]
      }
    });
  };
  
  // Handle border radius change
  const handleBorderRadiusChange = (value: number[]) => {
    onUpdateNode(selectedNode.id, { 
      ...selectedNode.data,
      style: { 
        ...selectedNode.data.style,
        borderRadius: value[0]
      }
    });
  };
  
  // Handle border width change
  const handleBorderWidthChange = (value: number[]) => {
    onUpdateNode(selectedNode.id, { 
      ...selectedNode.data,
      style: { 
        ...selectedNode.data.style,
        borderWidth: value[0],
        borderStyle: nodeBorderStyle
      }
    });
  };
  
  // Handle opacity change
  const handleOpacityChange = (value: number[]) => {
    onUpdateNode(selectedNode.id, { 
      ...selectedNode.data,
      style: { 
        ...selectedNode.data.style,
        opacity: value[0] / 100
      }
    });
  };
  
  // Handle font size change
  const handleFontSizeChange = (value: number[]) => {
    onUpdateNode(selectedNode.id, { 
      ...selectedNode.data,
      style: { 
        ...selectedNode.data.style,
        fontSize: value[0]
      }
    });
  };
  
  // Handle border style change
  const handleBorderStyleChange = (value: string) => {
    onUpdateNode(selectedNode.id, { 
      ...selectedNode.data,
      style: { 
        ...selectedNode.data.style,
        borderStyle: value,
        borderColor: nodeStyle.borderColor || '#d1d5db'
      }
    });
  };
  
  // Handle font family change
  const handleFontFamilyChange = (value: string) => {
    onUpdateNode(selectedNode.id, { 
      ...selectedNode.data,
      style: { 
        ...selectedNode.data.style,
        fontFamily: value
      }
    });
  };
  
  // Handle rotation change
  const handleRotationChange = (value: number[]) => {
    onUpdateNode(selectedNode.id, { 
      ...selectedNode.data,
      style: { 
        ...selectedNode.data.style,
        transform: `rotate(${value[0]}deg)`
      }
    });
  };
  
  // Handle shadow toggle
  const handleShadowToggle = (enabled: boolean) => {
    onUpdateNode(selectedNode.id, { 
      ...selectedNode.data,
      style: { 
        ...selectedNode.data.style,
        boxShadow: enabled 
          ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' 
          : 'none'
      }
    });
  };
  
  // Handle image URL update
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedNode.type === 'image') {
      onUpdateNode(selectedNode.id, { 
        ...selectedNode.data, 
        imageUrl: e.target.value 
      });
    }
  };
  
  // Preview style for the color picker
  const stylePreview = (bg: string, text: string) => ({
    backgroundColor: bg,
    color: text,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '9px'
  });

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 absolute right-4 top-20 z-10 w-80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold flex items-center">
          <Palette className="h-4 w-4 mr-2" />
          Node Settings
        </h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="style">Style</TabsTrigger>
          <TabsTrigger value="size">Size</TabsTrigger>
          <TabsTrigger value="text">Text</TabsTrigger>
        </TabsList>
        
        <TabsContent value="style" className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Node Label</label>
            <Input
              value={selectedNode.data.label || ''}
              onChange={handleLabelChange}
              className="w-full p-2 text-sm"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium block mb-1">Node Color</label>
            <div className="grid grid-cols-4 gap-2">
              {NODE_COLORS.map((color, index) => (
                <Popover key={index}>
                  <PopoverTrigger asChild>
                    <button
                      className="w-full aspect-square rounded-md border hover:scale-110 transition-transform"
                      style={{ backgroundColor: color.bg }}
                    >
                      <span className="sr-only">{color.label}</span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-32 p-2">
                    <button 
                      className="w-full p-2 rounded text-xs mb-1"
                      style={stylePreview(color.bg, color.text)} 
                      onClick={() => handleColorChange(color.bg, color.text)}
                    >
                      {color.label}
                    </button>
                  </PopoverContent>
                </Popover>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Drop Shadow</label>
            <Switch 
              checked={nodeStyle.boxShadow !== 'none'} 
              onCheckedChange={handleShadowToggle}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium block mb-1">Border Style</label>
            <Select 
              value={nodeBorderStyle}
              onValueChange={handleBorderStyleChange}
            >
              <SelectTrigger className="w-full h-8 text-xs">
                <SelectValue placeholder="Select border style" />
              </SelectTrigger>
              <SelectContent>
                {BORDER_STYLES.map((style) => (
                  <SelectItem key={style.value} value={style.value}>
                    {style.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium block mb-1">Border Width</label>
            <Slider
              defaultValue={[nodeBorderWidth]}
              min={0}
              max={5}
              step={1}
              onValueChange={handleBorderWidthChange}
            />
            <div className="text-xs text-gray-500 text-center mt-1">
              {nodeBorderWidth}px
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium block mb-1">Opacity</label>
            <Slider
              defaultValue={[nodeOpacity]}
              min={20}
              max={100}
              step={5}
              onValueChange={handleOpacityChange}
            />
            <div className="text-xs text-gray-500 text-center mt-1">
              {nodeOpacity}%
            </div>
          </div>
          
          {selectedNode.type === 'image' && (
            <div>
              <label className="text-sm font-medium block mb-1">Image URL</label>
              <Input
                value={selectedNode.data.imageUrl || ''}
                onChange={handleImageUrlChange}
                placeholder="https://example.com/image.jpg"
                className="w-full p-2 text-sm"
              />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="size" className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Width</label>
            <div className="flex items-center">
              <Slider
                defaultValue={[nodeWidth]}
                min={80}
                max={400}
                step={10}
                className="flex-1 mx-2"
                onValueChange={(val) => handleSizeChange(val, false)}
              />
              <span className="text-xs w-8 text-center">{nodeWidth}px</span>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium block mb-1">Height</label>
            <div className="flex items-center">
              <Slider
                defaultValue={[nodeHeight]}
                min={40}
                max={300}
                step={10}
                className="flex-1 mx-2"
                onValueChange={handleHeightChange}
              />
              <span className="text-xs w-8 text-center">{nodeHeight}px</span>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium block mb-1">Corner Radius</label>
            <div className="flex items-center">
              <Slider
                defaultValue={[nodeBorderRadius]}
                min={0}
                max={20}
                step={1}
                className="flex-1 mx-2"
                onValueChange={handleBorderRadiusChange}
              />
              <span className="text-xs w-8 text-center">{nodeBorderRadius}px</span>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium block mb-1">Rotation</label>
            <div className="flex items-center">
              <Slider
                defaultValue={[nodeRotation]}
                min={0}
                max={360}
                step={5}
                className="flex-1 mx-2"
                onValueChange={handleRotationChange}
              />
              <span className="text-xs w-8 text-center">{nodeRotation}°</span>
            </div>
          </div>
          
          <div className="p-3 border rounded-md bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              {nodeWidth}px × {nodeHeight}px
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="text" className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Font Size</label>
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-6 w-6"
                onClick={() => handleFontSizeChange([Math.max(8, nodeFontSize - 1)])}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <Slider
                defaultValue={[nodeFontSize]}
                min={8}
                max={24}
                step={1}
                className="flex-1 mx-2"
                onValueChange={handleFontSizeChange}
              />
              <Button 
                variant="outline" 
                size="icon" 
                className="h-6 w-6"
                onClick={() => handleFontSizeChange([Math.min(24, nodeFontSize + 1)])}
              >
                <Plus className="h-3 w-3" />
              </Button>
              <span className="text-xs w-8 text-center ml-2">{nodeFontSize}px</span>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium block mb-1">Font Family</label>
            <Select 
              value={nodeFontFamily}
              onValueChange={handleFontFamilyChange}
            >
              <SelectTrigger className="w-full h-8 text-xs">
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                {FONT_FAMILIES.map((font) => (
                  <SelectItem key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium block mb-1">Preview</label>
            <div 
              className="p-4 border rounded-md text-center"
              style={{ 
                fontFamily: nodeFontFamily,
                fontSize: `${nodeFontSize}px`
              }}
            >
              {selectedNode.data.label}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-4 pt-4 border-t flex justify-end">
        <Button variant="secondary" size="sm" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

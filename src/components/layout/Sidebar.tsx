
import React from 'react';
import { 
  Circle,
  Square, 
  Triangle, 
  CreditCard, 
  DollarSign, 
  BarChart, 
  Clock,
  Globe,
  Shield,
  HeadphonesIcon
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <div className="flow-sidebar w-64 min-h-screen p-4 text-white">
      <div className="flex items-center mb-10 pl-2">
        <div className="text-2xl font-bold">
          <span className="mr-1">ꟻ</span> Finix
        </div>
      </div>

      <div className="mb-8">
        <div className="text-xs uppercase text-gray-400 mb-2 pl-2">Core Banking</div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <CreditCard className="w-5 h-5 mr-3" />
          <span>Account Setup</span>
        </div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <DollarSign className="w-5 h-5 mr-3" />
          <span>Fund Management</span>
        </div>
        <div className="flow-sidebar-item flex items-center p-2 rounded bg-gray-800">
          <Square className="w-5 h-5 mr-3" />
          <span>Payment/Transfer</span>
        </div>
      </div>

      <div className="mb-8">
        <div className="text-xs uppercase text-gray-400 mb-2 pl-2">Financial Management</div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <BarChart className="w-5 h-5 mr-3" />
          <span>Budget Tracking</span>
        </div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <Clock className="w-5 h-5 mr-3" />
          <span>Savings Goals</span>
        </div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <Globe className="w-5 h-5 mr-3" />
          <span>Multi-Currency Settings</span>
        </div>
      </div>

      <div>
        <div className="text-xs uppercase text-gray-400 mb-2 pl-2">Advanced Features</div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <Circle className="w-5 h-5 mr-3" />
          <span>Credit Services</span>
        </div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <Triangle className="w-5 h-5 mr-3" />
          <span>Premium Features</span>
        </div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <Shield className="w-5 h-5 mr-3" />
          <span>Security Settings</span>
        </div>
        <div className="flow-sidebar-item flex items-center p-2 rounded hover:bg-gray-800">
          <HeadphonesIcon className="w-5 h-5 mr-3" />
          <span>Customer Support</span>
        </div>
      </div>
    </div>
  );
};

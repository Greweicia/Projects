import React from 'react';
import { Factory, Zap, Activity, MoreVertical, Home, Tractor, Box, Link, Trash2, Play, RotateCcw, Download, Droplets, Wind, Sun, Flame, Leaf, X } from 'lucide-react';
import { NodeType, ValidationResult, WIRE_TYPES } from '../types';

interface BuildSidebarProps {
  buildTool: NodeType | 'connect' | 'delete' | null;
  setBuildTool: (tool: NodeType | 'connect' | 'delete' | null) => void;
  connectWireType: string;
  setConnectWireType: (type: string) => void;
  onTest: () => void;
  validationResults: ValidationResult[] | null;
  onReset: () => void;
  onLoadExample: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const TOOLS: { id: NodeType; label: string; icon: any }[] = [
  { id: 'PowerPlant', label: 'Fossil Plant', icon: Factory },
  { id: 'NuclearPlant', label: 'Nuclear', icon: Activity },
  { id: 'HydroDam', label: 'Hydro Dam', icon: Droplets },
  { id: 'WindTurbine', label: 'Wind', icon: Wind },
  { id: 'SolarFarm', label: 'Solar', icon: Sun },
  { id: 'CombustionEngine', label: 'Combustion', icon: Flame },
  { id: 'Biomass', label: 'Biomass', icon: Leaf },
  { id: 'Transformer', label: 'Transformer', icon: Zap },
  { id: 'Tower', label: 'Tower', icon: Activity },
  { id: 'Pole', label: 'Pole', icon: MoreVertical },
  { id: 'Factory', label: 'Factory', icon: Factory },
  { id: 'House', label: 'House', icon: Home },
  { id: 'Farm', label: 'Farm', icon: Tractor },
  { id: 'Vault', label: 'Vault', icon: Box },
];

export default function BuildSidebar({ buildTool, setBuildTool, connectWireType, setConnectWireType, onTest, validationResults, onReset, onLoadExample, isOpen, onClose }: BuildSidebarProps) {
  return (
    <div className={`w-full md:w-96 h-full bg-white shadow-xl flex flex-col z-20 absolute left-0 top-0 overflow-y-auto border-r border-slate-200 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      <div className="p-6 bg-slate-800 text-white shrink-0 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold mb-2">Build Mode</h1>
          <p className="text-slate-300 text-sm">Design and test your own power grid.</p>
        </div>
        <button className="md:hidden p-2 -mr-2 text-slate-300 hover:text-white" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="p-6 flex-1 flex flex-col gap-6">
        <div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Tools</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setBuildTool('connect')}
              className={`flex items-center gap-2 p-2 rounded border ${buildTool === 'connect' ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
            >
              <Link size={16} /> Connect
            </button>
            <button
              onClick={() => setBuildTool('delete')}
              className={`flex items-center gap-2 p-2 rounded border ${buildTool === 'delete' ? 'bg-red-100 border-red-500 text-red-700' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
          
          {buildTool === 'connect' && (
            <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-lg animate-in fade-in slide-in-from-top-2">
              <label className="block text-xs font-semibold text-slate-600 mb-2">Select Line Type:</label>
              <div className="space-y-1.5">
                {WIRE_TYPES.map(wire => (
                  <button
                    key={wire.id}
                    onClick={() => setConnectWireType(wire.id)}
                    className={`w-full flex items-center gap-2 p-2 rounded text-sm transition-colors ${connectWireType === wire.id ? 'bg-white shadow-sm border border-slate-300 font-medium' : 'hover:bg-slate-100 text-slate-600 border border-transparent'}`}
                  >
                    <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: wire.color }} />
                    <span className="truncate">{wire.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Components</h3>
          <div className="grid grid-cols-2 gap-2">
            {TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setBuildTool(tool.id)}
                className={`flex flex-col items-center justify-center gap-2 p-3 rounded border transition-colors ${buildTool === tool.id ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'}`}
              >
                <tool.icon size={24} />
                <span className="text-xs font-medium text-center">{tool.label}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-3">Select a component, then click on the grid to place it.</p>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-200 space-y-3">
          <button
            onClick={onTest}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Play size={18} /> Test Grid
          </button>
          <div className="flex gap-2">
            <button onClick={onReset} className="flex-1 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded font-medium flex items-center justify-center gap-2 text-sm">
              <RotateCcw size={16} /> Clear
            </button>
            <button onClick={onLoadExample} className="flex-1 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded font-medium flex items-center justify-center gap-2 text-sm">
              <Download size={16} /> Example
            </button>
          </div>
        </div>

        {validationResults && (
          <div className="mt-4 space-y-2">
            <h3 className="font-bold text-slate-800">Test Results</h3>
            {validationResults.map((res, i) => (
              <div key={i} className={`p-3 rounded text-sm ${res.status === 'success' ? 'bg-emerald-100 text-emerald-800' : res.status === 'error' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                {res.message}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

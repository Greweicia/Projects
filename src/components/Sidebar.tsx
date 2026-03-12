import React from 'react';
import { Info, Zap, Shield, Activity, BookOpen, List, GitCommit, Settings, X } from 'lucide-react';
import { NodeData, WireData, NodeType } from '../types';
import { getPdfDataForNode } from '../data/pdfData';

interface SidebarProps {
  selectedItem: NodeData | WireData | null;
  onChangeNodeType?: (id: string, newType: NodeType) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ selectedItem, onChangeNodeType, isOpen, onClose }: SidebarProps) {
  const isWire = selectedItem && 'from' in selectedItem;
  const nodeData = !isWire ? (selectedItem as NodeData) : null;
  const wireData = isWire ? (selectedItem as WireData) : null;
  
  const pdfInfo = nodeData ? getPdfDataForNode(nodeData.id, nodeData.type) : null;

  const isGenerationNode = nodeData && ['PowerPlant', 'HydroDam', 'WindTurbine', 'SolarFarm', 'NuclearPlant', 'CombustionEngine', 'Biomass'].includes(nodeData.type);

  return (
    <div className={`w-full md:w-96 h-full bg-white shadow-xl flex flex-col z-20 absolute left-0 top-0 overflow-y-auto border-r border-slate-200 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      <div className="p-6 bg-slate-800 text-white shrink-0 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold mb-2">Electric Supply Systems</h1>
          <p className="text-slate-300 text-sm">Interactive Power Grid</p>
        </div>
        <button className="md:hidden p-2 -mr-2 text-slate-300 hover:text-white" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="p-6 flex-1">
        {nodeData && (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                {pdfInfo?.category || 'Component'}
              </div>
              <h2 className="text-2xl font-bold text-slate-800 leading-tight">{nodeData.label}</h2>
              <div className="flex flex-wrap gap-2 mt-3">
                <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-800 rounded-md text-sm font-medium">
                  <Zap size={14} />
                  {nodeData.volts}
                </div>
                {pdfInfo && pdfInfo.voltage !== nodeData.volts && (
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-sm font-medium" title="Typical range from manual">
                    <Zap size={14} />
                    Range: {pdfInfo.voltage}
                  </div>
                )}
              </div>
            </div>

            {isGenerationNode && onChangeNodeType && (
              <div className="bg-slate-100 p-4 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-2 text-sm">
                  <Settings size={16} className="text-slate-500" /> Change Generation Type
                </h3>
                <select 
                  className="w-full p-2 rounded border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={nodeData.type}
                  onChange={(e) => onChangeNodeType(nodeData.id, e.target.value as NodeType)}
                >
                  <option value="PowerPlant">Fossil-Fired Steam</option>
                  <option value="NuclearPlant">Nuclear-Fired Steam</option>
                  <option value="HydroDam">Hydroelectric</option>
                  <option value="CombustionEngine">Combustion Engine</option>
                  <option value="WindTurbine">Wind Generation</option>
                  <option value="SolarFarm">Solar Generation</option>
                  <option value="Biomass">Biomass / Resource Recovery</option>
                </select>
              </div>
            )}

            <div className="space-y-4">
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <h3 className="font-semibold text-blue-900 flex items-center gap-2 mb-2">
                  <Info size={16} className="text-blue-600" /> Description
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {pdfInfo ? pdfInfo.description : getDescription(nodeData.id)}
                </p>
              </div>

              {pdfInfo && (
                <>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-3">
                      <List size={16} className="text-slate-500" /> Key Elements
                    </h3>
                    <ul className="space-y-3">
                      {pdfInfo.bulletPoints.map((bp, idx) => (
                        <li key={idx} className="text-sm">
                          <span className="font-semibold text-slate-700 block mb-0.5">{bp.label}</span>
                          <span className="text-slate-600">{bp.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-2">
                      <BookOpen size={16} className="text-slate-500" /> Manual Details
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed italic">
                      "{pdfInfo.details}"
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {wireData && (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
             <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Power Line
              </div>
              <h2 className="text-2xl font-bold text-slate-800 leading-tight">{wireData.type} Line</h2>
              <div className="flex flex-wrap gap-2 mt-3">
                <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-800 rounded-md text-sm font-medium">
                  <Zap size={14} />
                  {wireData.voltage}
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              <h3 className="font-semibold text-blue-900 flex items-center gap-2 mb-2">
                <GitCommit size={16} className="text-blue-600" /> Connection
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                This line carries power from the source to the destination. Its color indicates its role in the grid.
              </p>
            </div>
          </div>
        )}

        {!selectedItem && (
          <div className="text-center text-slate-500 mt-10">
            <Activity size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium text-slate-600 mb-2">Select a Component</p>
            <p className="text-sm">Click on any component or power line in the 3D scene to view its details.</p>
          </div>
        )}
      </div>

      <div className="p-6 bg-slate-50 border-t border-slate-200 shrink-0">
        <h3 className="font-semibold text-slate-700 mb-3 text-xs uppercase tracking-wider">Grid Sections</h3>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> Generation</li>
          <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Transmission (138kV+)</li>
          <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> Subtransmission (34.5kV)</li>
          <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Distribution (13.8kV)</li>
        </ul>
      </div>
    </div>
  );
}

function getDescription(id: string) {
  const descriptions: Record<string, string> = {
    gen: "Electricity is produced at generating stations in bulk quantities.",
    stepup: "Steps up the voltage for efficient long-distance transmission.",
    tower1: "High-voltage transmission lines carry electricity over long distances.",
    tower2: "High-voltage transmission lines carry electricity over long distances.",
    trans_sub: "Subdivides electricity into quantities at lower voltages.",
    ind_cust1: "Large industrial facilities receiving power directly from subtransmission lines.",
    sub_pole: "Carries subtransmission voltage to distribution substations.",
    dist_sub: "Further steps down voltage for local distribution.",
    dist_pole1: "Carries distribution voltage to commercial and residential areas.",
    comm_ind: "Commercial or industrial customers receiving 220/440 volts.",
    vault: "Underground step-down transformer for densely populated or commercial areas.",
    comm_cust: "Commercial customers receiving standard 120/240 volts.",
    dist_pole2: "Final stage of distribution before reaching residential customers.",
    farm: "Rural customers receiving 120/240 volts via pole-mounted transformers.",
    res: "Residential customers receiving standard 120/240 volts for household use."
  };
  return descriptions[id] || "Component of the electric supply system.";
}

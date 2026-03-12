import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Environment, ContactShadows } from '@react-three/drei';
import { Zap, LayoutGrid, Menu } from 'lucide-react';
import GridScene from './components/GridScene';
import Sidebar from './components/Sidebar';
import BuildSidebar from './components/BuildSidebar';
import { NodeData, WireData, NodeType, ValidationResult, WIRE_TYPES } from './types';
import { initialNodes, initialWires, fossilGrid, hydroGrid, windGrid, solarMicroGrid } from './data/initialGrid';
import { validateGrid } from './utils/gridValidator';

export default function App() {
  const [mode, setMode] = useState<'explore' | 'build'>('explore');
  const [nodes, setNodes] = useState<NodeData[]>(initialNodes);
  const [wires, setWires] = useState<WireData[]>(initialWires);
  const [selectedItem, setSelectedItem] = useState<NodeData | WireData | null>(null);
  const [currentGrid, setCurrentGrid] = useState<string>('fossil');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Build Mode State
  const [buildTool, setBuildTool] = useState<NodeType | 'connect' | 'delete' | null>(null);
  const [connectStart, setConnectStart] = useState<string | null>(null);
  const [connectWireType, setConnectWireType] = useState<string>('Transmission');
  const [validationResults, setValidationResults] = useState<ValidationResult[] | null>(null);

  const handleSelectGrid = (gridType: string) => {
    setCurrentGrid(gridType);
    setSelectedItem(null);
    setIsSidebarOpen(false);
    switch (gridType) {
      case 'fossil':
        setNodes(fossilGrid.nodes);
        setWires(fossilGrid.wires);
        break;
      case 'hydro':
        setNodes(hydroGrid.nodes);
        setWires(hydroGrid.wires);
        break;
      case 'wind':
        setNodes(windGrid.nodes);
        setWires(windGrid.wires);
        break;
      case 'solar':
        setNodes(solarMicroGrid.nodes);
        setWires(solarMicroGrid.wires);
        break;
    }
  };

  const handleSelectNode = (node: NodeData) => {
    setIsSidebarOpen(true);
    if (mode === 'explore') {
      setSelectedItem(prev => prev?.id === node.id ? null : node);
    } else if (mode === 'build') {
      if (buildTool === 'delete') {
        setNodes(nodes.filter(n => n.id !== node.id));
        setWires(wires.filter(w => w.from !== node.id && w.to !== node.id));
      } else if (buildTool === 'connect') {
        if (!connectStart) {
          setConnectStart(node.id);
        } else {
          if (connectStart !== node.id) {
            const selectedWireDef = WIRE_TYPES.find(w => w.id === connectWireType) || WIRE_TYPES[2];
            const newWire: WireData = {
              id: `wire_${Date.now()}`,
              from: connectStart,
              to: node.id,
              color: selectedWireDef.color,
              voltage: selectedWireDef.voltage,
              type: selectedWireDef.label
            };
            setWires([...wires, newWire]);
          }
          setConnectStart(null);
        }
      } else {
        setSelectedItem(prev => prev?.id === node.id ? null : node);
      }
    }
  };

  const handleSelectWire = (wire: WireData) => {
    setIsSidebarOpen(true);
    if (mode === 'explore') {
      setSelectedItem(prev => prev?.id === wire.id ? null : wire);
    } else if (mode === 'build' && buildTool === 'delete') {
      setWires(wires.filter(w => w.id !== wire.id));
    } else {
      setSelectedItem(prev => prev?.id === wire.id ? null : wire);
    }
  };

  const handleAddNode = (type: NodeType, pos: [number, number, number]) => {
    const id = `node_${Date.now()}`;
    setNodes([...nodes, { id, type, pos, label: type, volts: '?', labelY: 8 }]);
  };

  const handleChangeNodeType = (id: string, newType: NodeType) => {
    setNodes(nodes.map(n => {
      if (n.id === id) {
        // Update label based on type
        let newLabel = n.label;
        if (newType === 'PowerPlant') newLabel = 'Fossil-Fired Station';
        if (newType === 'NuclearPlant') newLabel = 'Nuclear Station';
        if (newType === 'HydroDam') newLabel = 'Hydroelectric Dam';
        if (newType === 'CombustionEngine') newLabel = 'Combustion Generator';
        if (newType === 'WindTurbine') newLabel = 'Wind Farm';
        if (newType === 'SolarFarm') newLabel = 'Solar Array';
        if (newType === 'Biomass') newLabel = 'Biomass Facility';
        
        return { ...n, type: newType, label: newLabel };
      }
      return n;
    }));
    
    // Update selected item if it's the one being changed
    if (selectedItem && !('from' in selectedItem) && selectedItem.id === id) {
      setSelectedItem(prev => {
        if (!prev || 'from' in prev) return prev;
        let newLabel = prev.label;
        if (newType === 'PowerPlant') newLabel = 'Fossil-Fired Station';
        if (newType === 'NuclearPlant') newLabel = 'Nuclear Station';
        if (newType === 'HydroDam') newLabel = 'Hydroelectric Dam';
        if (newType === 'CombustionEngine') newLabel = 'Combustion Generator';
        if (newType === 'WindTurbine') newLabel = 'Wind Farm';
        if (newType === 'SolarFarm') newLabel = 'Solar Array';
        if (newType === 'Biomass') newLabel = 'Biomass Facility';
        return { ...prev, type: newType, label: newLabel };
      });
    }
  };

  return (
    <div className="w-full h-screen flex flex-col relative bg-slate-50 overflow-hidden">
      {/* Top Bar */}
      <div className="h-auto min-h-14 py-2 bg-slate-900 text-white flex flex-col md:flex-row items-center px-4 md:px-6 justify-between z-30 shrink-0 gap-3 shadow-md">
        <div className="w-full md:w-auto flex items-center justify-between">
          <div className="font-bold flex items-center gap-2">
            <button className="md:hidden p-1.5 bg-slate-800 rounded text-slate-300 hover:text-white" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <Menu size={18} />
            </button>
            <Zap size={18} className="text-amber-400"/> 
            <span className="truncate">Power Grid Simulator</span>
          </div>
        </div>
        
        {mode === 'explore' && (
          <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 w-full md:w-auto overflow-x-auto">
            <LayoutGrid size={16} className="text-slate-400 shrink-0" />
            <span className="text-sm text-slate-400 font-medium shrink-0">Grid:</span>
            <select 
              className="bg-slate-900 text-white text-sm border border-slate-600 rounded px-2 py-1 outline-none focus:border-blue-500 w-full md:w-auto"
              value={currentGrid}
              onChange={(e) => handleSelectGrid(e.target.value)}
            >
              <option value="fossil">Fossil Fuel Grid</option>
              <option value="hydro">Hydroelectric Grid</option>
              <option value="wind">Wind Farm Grid</option>
              <option value="solar">Solar Micro-Grid</option>
            </select>
          </div>
        )}

        <div className="flex bg-slate-800 rounded-lg p-1 w-full md:w-auto">
          <button 
            className={`flex-1 md:flex-none px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === 'explore' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-700'}`}
            onClick={() => {
              setMode('explore');
              handleSelectGrid(currentGrid);
              setIsSidebarOpen(false);
            }}
          >
            Explore Mode
          </button>
          <button 
            className={`flex-1 md:flex-none px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === 'build' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-700'}`}
            onClick={() => { 
              setMode('build'); 
              setNodes([]); 
              setWires([]); 
              setSelectedItem(null); 
              setValidationResults(null);
              setIsSidebarOpen(true);
            }}
          >
            Build & Test Mode
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex relative overflow-hidden">
        {mode === 'explore' ? (
          <Sidebar 
            selectedItem={selectedItem} 
            onChangeNodeType={handleChangeNodeType} 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
          />
        ) : (
          <BuildSidebar 
            buildTool={buildTool} 
            setBuildTool={setBuildTool} 
            connectWireType={connectWireType}
            setConnectWireType={setConnectWireType}
            onTest={() => { setValidationResults(validateGrid(nodes, wires)); setIsSidebarOpen(true); }}
            validationResults={validationResults}
            onReset={() => { setNodes([]); setWires([]); setValidationResults(null); setConnectStart(null); }}
            onLoadExample={() => { setNodes(initialNodes); setWires(initialWires); setValidationResults(null); setConnectStart(null); }}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}
        
        <div className="flex-1 h-full w-full md:pl-96">
          <Canvas camera={{ position: [0, 25, 60], fov: 45 }} shadows onPointerMissed={() => setSelectedItem(null)}>
            <color attach="background" args={['#e2e8f0']} />
            
            <ambientLight intensity={0.5} />
            <directionalLight 
              position={[20, 40, 20]} 
              castShadow 
              intensity={1.5} 
              shadow-mapSize={[2048, 2048]} 
              shadow-camera-left={-50}
              shadow-camera-right={50}
              shadow-camera-top={50}
              shadow-camera-bottom={-50}
            />
            
            <Suspense fallback={null}>
              <GridScene 
                nodes={nodes}
                wires={wires}
                mode={mode}
                buildTool={buildTool}
                connectStart={connectStart}
                selectedItem={selectedItem}
                onSelectNode={handleSelectNode}
                onSelectWire={handleSelectWire}
                onAddNode={handleAddNode}
              />
              <Environment preset="city" />
              <ContactShadows position={[0, -0.1, 0]} opacity={0.4} scale={150} blur={2} far={10} />
            </Suspense>
            
            <OrbitControls 
              makeDefault 
              minPolarAngle={0} 
              maxPolarAngle={Math.PI / 2 - 0.05} 
              target={[0, 0, 0]}
            />
            
            <Grid infiniteGrid fadeDistance={150} sectionColor="#94a3b8" cellColor="#cbd5e1" />
          </Canvas>
        </div>
      </div>
    </div>
  );
}

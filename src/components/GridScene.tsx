import React from 'react';
import * as THREE from 'three';
import { Line, Html } from '@react-three/drei';
import { PowerPlant, Transformer, Tower, Pole, Factory, House, Farm, Vault, HydroDam, WindTurbine, SolarFarm, NuclearPlant, CombustionEngine, Biomass } from './Models';
import { NodeData, WireData, NodeType } from '../types';

interface GridSceneProps {
  nodes: NodeData[];
  wires: WireData[];
  mode: 'explore' | 'build';
  buildTool: NodeType | 'connect' | 'delete' | null;
  connectStart: string | null;
  selectedItem: NodeData | WireData | null;
  onSelectNode: (node: NodeData) => void;
  onSelectWire: (wire: WireData) => void;
  onAddNode: (type: NodeType, pos: [number, number, number]) => void;
}

export function getWireAttachmentPoint(node: NodeData): [number, number, number] {
  const [x, y, z] = node.pos;
  switch (node.type) {
    case 'PowerPlant': return [x, y + 5, z];
    case 'HydroDam': return [x, y + 8, z];
    case 'WindTurbine': return [x, y + 12, z];
    case 'SolarFarm': return [x, y + 1, z];
    case 'NuclearPlant': return [x, y + 6, z];
    case 'CombustionEngine': return [x, y + 5, z];
    case 'Biomass': return [x, y + 4, z];
    case 'Transformer': return [x, y + 4.5, z];
    case 'Tower': return [x, y + 10, z];
    case 'Pole': return [x, y + 7.3, z];
    case 'Factory': return [x, y + 4, z];
    case 'House': return [x, y + 1.5, z];
    case 'Farm': return [x, y + 4, z];
    case 'Vault': return [x, y - 0.5, z];
    default: return [x, y, z];
  }
}

function WireHitbox({ start, end, onClick, onPointerOver, onPointerOut }: any) {
  const vecStart = new THREE.Vector3(...start);
  const vecEnd = new THREE.Vector3(...end);
  const distance = vecStart.distanceTo(vecEnd);
  const position = vecStart.clone().lerp(vecEnd, 0.5);
  
  const direction = vecEnd.clone().sub(vecStart).normalize();
  const up = new THREE.Vector3(0, 1, 0);
  let quaternion = new THREE.Quaternion();
  
  if (direction.lengthSq() > 0.0001) {
      quaternion.setFromUnitVectors(up, direction);
  }

  return (
    <mesh
      position={position}
      quaternion={quaternion}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <cylinderGeometry args={[0.8, 0.8, distance, 8]} />
      <meshBasicMaterial visible={false} />
    </mesh>
  );
}

const Label = ({ position, text, subtext }: { position: [number, number, number], text: string, subtext?: string }) => (
  <Html position={position} center distanceFactor={15} zIndexRange={[100, 0]}>
    <div className="bg-white/90 p-2 rounded shadow-md text-center pointer-events-none border border-gray-200 w-max">
      <div className="font-bold text-sm text-gray-800">{text}</div>
      {subtext && <div className="text-xs text-gray-500 font-mono">{subtext}</div>}
    </div>
  </Html>
);

export default function GridScene({ nodes, wires, mode, buildTool, connectStart, selectedItem, onSelectNode, onSelectWire, onAddNode }: GridSceneProps) {
  
  return (
    <group>
      {/* Ground Plane for adding nodes */}
      {mode === 'build' && (
        <mesh 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, -0.05, 0]} 
          receiveShadow
          onClick={(e) => {
            if (buildTool && buildTool !== 'connect' && buildTool !== 'delete') {
              onAddNode(buildTool as NodeType, [e.point.x, 0, e.point.z]);
            }
          }}
          onPointerOver={(e) => {
            if (buildTool && buildTool !== 'connect' && buildTool !== 'delete') {
              document.body.style.cursor = 'crosshair';
            }
          }}
          onPointerOut={() => document.body.style.cursor = 'auto'}
        >
          <planeGeometry args={[200, 200]} />
          <meshStandardMaterial color="#f8fafc" visible={false} />
        </mesh>
      )}

      {/* Render Wires */}
      {wires.map((wire) => {
        const fromNode = nodes.find(n => n.id === wire.from);
        const toNode = nodes.find(n => n.id === wire.to);
        if (!fromNode || !toNode) return null;

        const start = getWireAttachmentPoint(fromNode);
        const end = getWireAttachmentPoint(toNode);
        const isSelected = selectedItem?.id === wire.id;

        return (
          <group key={wire.id}>
            <Line 
              points={[start, end]} 
              color={isSelected ? '#9333ea' : wire.color} 
              lineWidth={isSelected ? 4 : 2} 
            />
            <WireHitbox 
              start={start} 
              end={end} 
              onClick={(e: any) => {
                e.stopPropagation();
                onSelectWire(wire);
              }}
              onPointerOver={(e: any) => {
                e.stopPropagation();
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={(e: any) => {
                e.stopPropagation();
                document.body.style.cursor = 'auto';
              }}
            />
          </group>
        );
      })}

      {/* Render Nodes */}
      {nodes.map((node) => {
        let Component: any;
        switch (node.type) {
          case 'PowerPlant': Component = PowerPlant; break;
          case 'HydroDam': Component = HydroDam; break;
          case 'WindTurbine': Component = WindTurbine; break;
          case 'SolarFarm': Component = SolarFarm; break;
          case 'NuclearPlant': Component = NuclearPlant; break;
          case 'CombustionEngine': Component = CombustionEngine; break;
          case 'Biomass': Component = Biomass; break;
          case 'Transformer': Component = Transformer; break;
          case 'Tower': Component = Tower; break;
          case 'Pole': Component = Pole; break;
          case 'Factory': Component = Factory; break;
          case 'House': Component = House; break;
          case 'Farm': Component = Farm; break;
          case 'Vault': Component = Vault; break;
          default: Component = 'group';
        }

        const isSelected = selectedItem?.id === node.id;
        const isConnectStart = connectStart === node.id;

        return (
          <group 
            key={node.id} 
            position={node.pos} 
            onClick={(e) => { 
              e.stopPropagation(); 
              onSelectNode(node); 
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              if (mode === 'build' && buildTool === 'delete') document.body.style.cursor = 'no-drop';
              else document.body.style.cursor = 'pointer';
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'auto';
            }}
          >
            {/* Highlight ring for selected or connect start */}
            {(isSelected || isConnectStart) && (
              <mesh position={[0, 0.1, 0]} rotation={[-Math.PI/2, 0, 0]}>
                <ringGeometry args={[4, 4.5, 32]} />
                <meshBasicMaterial color={isConnectStart ? "#3b82f6" : "#9333ea"} />
              </mesh>
            )}
            <Component hasTransformer={node.hasTransformer} />
            <Label position={[0, node.labelY, 0]} text={node.label} subtext={node.volts} />
          </group>
        );
      })}
    </group>
  );
}

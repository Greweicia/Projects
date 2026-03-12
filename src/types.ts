export type NodeType = 'PowerPlant' | 'Transformer' | 'Tower' | 'Pole' | 'Factory' | 'House' | 'Farm' | 'Vault' | 'HydroDam' | 'WindTurbine' | 'SolarFarm' | 'NuclearPlant' | 'CombustionEngine' | 'Biomass';

export interface NodeData {
  id: string;
  type: NodeType;
  pos: [number, number, number];
  label: string;
  volts: string;
  labelY: number;
  hasTransformer?: boolean;
}

export interface WireData {
  id: string;
  from: string;
  to: string;
  color: string;
  voltage: string;
  type: string;
}

export interface ValidationResult {
  status: 'success' | 'error' | 'warning';
  message: string;
}

export interface WireTypeDef {
  id: string;
  label: string;
  color: string;
  voltage: string;
}

export const WIRE_TYPES: WireTypeDef[] = [
  { id: 'Generation', label: 'Generation (13.8kV+)', color: '#ef4444', voltage: '20,000 V' },
  { id: 'EHV_Transmission', label: 'EHV Transmission (500kV)', color: '#1d4ed8', voltage: '500,000 V' },
  { id: 'Transmission', label: 'Transmission (138kV+)', color: '#3b82f6', voltage: '138,000 V' },
  { id: 'Subtransmission', label: 'Subtransmission (34.5kV)', color: '#22c55e', voltage: '34,500 V' },
  { id: 'Distribution', label: 'Distribution (13.8kV)', color: '#eab308', voltage: '13,800 V' },
  { id: 'Underground', label: 'Underground (13.8kV)', color: '#fef08a', voltage: '13,800 V' },
  { id: 'Service', label: 'Service Drop (120/240V)', color: '#fbbf24', voltage: '120/240 V' }
];

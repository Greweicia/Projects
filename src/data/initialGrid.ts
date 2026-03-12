import { NodeData, WireData } from '../types';

export const fossilGrid = {
  name: 'Fossil Fuel Grid',
  nodes: [
    { id: 'gen', type: 'PowerPlant', pos: [-40, 0, -20], label: 'Fossil-Fired Station', volts: '20,000 V', labelY: 12 },
    { id: 'stepup', type: 'Transformer', pos: [-25, 0, -20], label: 'Step-Up Transformer', volts: '138,000 V', labelY: 8 },
    { id: 'tower1', type: 'Tower', pos: [-5, 0, -20], label: 'Transmission Tower', volts: '138,000 V', labelY: 14 },
    { id: 'tower2', type: 'Tower', pos: [15, 0, -20], label: 'Transmission Tower', volts: '138,000 V', labelY: 14 },
    { id: 'trans_sub', type: 'Transformer', pos: [35, 0, -20], label: 'Transmission Substation', volts: '34,500 V', labelY: 8 },
    { id: 'ind_cust1', type: 'Factory', pos: [35, 0, -5], label: 'Industrial Customer', volts: '440 V', labelY: 8 },
    { id: 'sub_pole', type: 'Pole', pos: [15, 0, -5], label: 'Subtransmission Pole', volts: '34,500 V', labelY: 10 },
    { id: 'dist_sub', type: 'Transformer', pos: [-5, 0, -5], label: 'Distribution Substation', volts: '13,800 V', labelY: 8 },
    { id: 'dist_pole1', type: 'Pole', pos: [-25, 0, -5], label: 'Distribution Pole', volts: '13,800 V', labelY: 10, hasTransformer: true },
    { id: 'comm_ind', type: 'Factory', pos: [-25, 0, 10], label: 'Commercial/Industrial', volts: '220/440 V', labelY: 8 },
    { id: 'vault', type: 'Vault', pos: [-10, -0.5, 10], label: 'Underground Vault', volts: '13,800 V', labelY: 3 },
    { id: 'comm_cust', type: 'House', pos: [-10, 0, 20], label: 'Commercial Customer', volts: '120/240 V', labelY: 7 },
    { id: 'dist_pole2', type: 'Pole', pos: [10, 0, 10], label: 'Distribution Pole', volts: '13,800 V', labelY: 10, hasTransformer: true },
    { id: 'farm', type: 'Farm', pos: [30, 0, 10], label: 'Farm-Rural Customer', volts: '120/240 V', labelY: 10 },
    { id: 'res', type: 'House', pos: [10, 0, 25], label: 'Residential Customer', volts: '120/240 V', labelY: 7 },
  ] as NodeData[],
  wires: [
    { id: 'w1', from: 'gen', to: 'stepup', color: '#ef4444', voltage: '20,000 V', type: 'Generation' },
    { id: 'w2', from: 'stepup', to: 'tower1', color: '#3b82f6', voltage: '138,000 V', type: 'Transmission' },
    { id: 'w3', from: 'tower1', to: 'tower2', color: '#3b82f6', voltage: '138,000 V', type: 'Transmission' },
    { id: 'w4', from: 'tower2', to: 'trans_sub', color: '#3b82f6', voltage: '138,000 V', type: 'Transmission' },
    { id: 'w5', from: 'trans_sub', to: 'ind_cust1', color: '#22c55e', voltage: '34,500 V', type: 'Subtransmission' },
    { id: 'w6', from: 'trans_sub', to: 'sub_pole', color: '#22c55e', voltage: '34,500 V', type: 'Subtransmission' },
    { id: 'w7', from: 'sub_pole', to: 'dist_sub', color: '#22c55e', voltage: '34,500 V', type: 'Subtransmission' },
    { id: 'w8', from: 'dist_sub', to: 'dist_pole1', color: '#eab308', voltage: '13,800 V', type: 'Distribution' },
    { id: 'w9', from: 'dist_pole1', to: 'comm_ind', color: '#eab308', voltage: '13,800 V', type: 'Distribution' },
    { id: 'w10', from: 'dist_pole1', to: 'vault', color: '#fef08a', voltage: '13,800 V', type: 'Underground Distribution' },
    { id: 'w11', from: 'vault', to: 'comm_cust', color: '#fef08a', voltage: '120/240 V', type: 'Underground Service' },
    { id: 'w12', from: 'dist_sub', to: 'dist_pole2', color: '#eab308', voltage: '13,800 V', type: 'Distribution' },
    { id: 'w13', from: 'dist_pole2', to: 'farm', color: '#eab308', voltage: '120/240 V', type: 'Service Drop' },
    { id: 'w14', from: 'dist_pole2', to: 'res', color: '#eab308', voltage: '120/240 V', type: 'Service Drop' },
  ] as WireData[]
};

export const hydroGrid = {
  name: 'Hydroelectric Grid',
  nodes: [
    { id: 'gen', type: 'HydroDam', pos: [-40, 0, -20], label: 'Hydroelectric Dam', volts: '24,000 V', labelY: 14 },
    { id: 'stepup', type: 'Transformer', pos: [-20, 0, -20], label: 'Step-Up Transformer', volts: '500,000 V', labelY: 8 },
    { id: 'tower1', type: 'Tower', pos: [0, 0, -20], label: '500kV Tower', volts: '500,000 V', labelY: 14 },
    { id: 'trans_sub', type: 'Transformer', pos: [25, 0, -20], label: 'Transmission Substation', volts: '230,000 V', labelY: 8 },
    { id: 'tower2', type: 'Tower', pos: [25, 0, 0], label: '230kV Tower', volts: '230,000 V', labelY: 14 },
    { id: 'dist_sub', type: 'Transformer', pos: [0, 0, 10], label: 'Distribution Substation', volts: '12,470 V', labelY: 8 },
    { id: 'dist_pole1', type: 'Pole', pos: [-20, 0, 10], label: 'Distribution Pole', volts: '12,470 V', labelY: 10, hasTransformer: true },
    { id: 'res', type: 'House', pos: [-20, 0, 25], label: 'Residential Customer', volts: '120/240 V', labelY: 7 },
  ] as NodeData[],
  wires: [
    { id: 'w1', from: 'gen', to: 'stepup', color: '#ef4444', voltage: '24,000 V', type: 'Generation' },
    { id: 'w2', from: 'stepup', to: 'tower1', color: '#1d4ed8', voltage: '500,000 V', type: 'Extra High Voltage Transmission' },
    { id: 'w3', from: 'tower1', to: 'trans_sub', color: '#1d4ed8', voltage: '500,000 V', type: 'Extra High Voltage Transmission' },
    { id: 'w4', from: 'trans_sub', to: 'tower2', color: '#3b82f6', voltage: '230,000 V', type: 'Transmission' },
    { id: 'w5', from: 'tower2', to: 'dist_sub', color: '#3b82f6', voltage: '230,000 V', type: 'Transmission' },
    { id: 'w6', from: 'dist_sub', to: 'dist_pole1', color: '#eab308', voltage: '12,470 V', type: 'Distribution' },
    { id: 'w7', from: 'dist_pole1', to: 'res', color: '#eab308', voltage: '120/240 V', type: 'Service Drop' },
  ] as WireData[]
};

export const windGrid = {
  name: 'Wind Farm Grid',
  nodes: [
    { id: 'gen1', type: 'WindTurbine', pos: [-45, 0, -25], label: 'Wind Turbine 1', volts: '690 V', labelY: 18 },
    { id: 'gen2', type: 'WindTurbine', pos: [-35, 0, -35], label: 'Wind Turbine 2', volts: '690 V', labelY: 18 },
    { id: 'gen3', type: 'WindTurbine', pos: [-25, 0, -25], label: 'Wind Turbine 3', volts: '690 V', labelY: 18 },
    { id: 'collector', type: 'Transformer', pos: [-10, 0, -20], label: 'Collector Station', volts: '69,000 V', labelY: 8 },
    { id: 'sub_pole1', type: 'Pole', pos: [10, 0, -20], label: '69kV Subtransmission', volts: '69,000 V', labelY: 10 },
    { id: 'sub_sub', type: 'Transformer', pos: [30, 0, -10], label: 'Subtransmission Substation', volts: '34,500 V', labelY: 8 },
    { id: 'sub_pole2', type: 'Pole', pos: [10, 0, 5], label: '34.5kV Subtransmission', volts: '34,500 V', labelY: 10 },
    { id: 'dist_sub', type: 'Transformer', pos: [-10, 0, 15], label: 'Distribution Substation', volts: '12,470 V', labelY: 8 },
    { id: 'dist_pole', type: 'Pole', pos: [-30, 0, 15], label: 'Distribution Pole', volts: '12,470 V', labelY: 10, hasTransformer: true },
    { id: 'farm', type: 'Farm', pos: [-30, 0, 30], label: 'Agricultural Customer', volts: '120/240 V', labelY: 10 },
  ] as NodeData[],
  wires: [
    { id: 'w1', from: 'gen1', to: 'collector', color: '#ef4444', voltage: '690 V', type: 'Generation Collection' },
    { id: 'w2', from: 'gen2', to: 'collector', color: '#ef4444', voltage: '690 V', type: 'Generation Collection' },
    { id: 'w3', from: 'gen3', to: 'collector', color: '#ef4444', voltage: '690 V', type: 'Generation Collection' },
    { id: 'w4', from: 'collector', to: 'sub_pole1', color: '#22c55e', voltage: '69,000 V', type: 'Subtransmission' },
    { id: 'w5', from: 'sub_pole1', to: 'sub_sub', color: '#22c55e', voltage: '69,000 V', type: 'Subtransmission' },
    { id: 'w6', from: 'sub_sub', to: 'sub_pole2', color: '#16a34a', voltage: '34,500 V', type: 'Subtransmission' },
    { id: 'w7', from: 'sub_pole2', to: 'dist_sub', color: '#16a34a', voltage: '34,500 V', type: 'Subtransmission' },
    { id: 'w8', from: 'dist_sub', to: 'dist_pole', color: '#eab308', voltage: '12,470 V', type: 'Distribution' },
    { id: 'w9', from: 'dist_pole', to: 'farm', color: '#eab308', voltage: '120/240 V', type: 'Service Drop' },
  ] as WireData[]
};

export const solarMicroGrid = {
  name: 'Solar Micro-Grid',
  nodes: [
    { id: 'main_sub', type: 'Transformer', pos: [-30, 0, -10], label: 'Main Substation', volts: '13,800 V', labelY: 8 },
    { id: 'dist_pole1', type: 'Pole', pos: [-10, 0, -10], label: 'Distribution Pole', volts: '13,800 V', labelY: 10 },
    { id: 'comm_ind', type: 'Factory', pos: [10, 0, -10], label: 'Commercial Customer', volts: '480 V', labelY: 8 },
    { id: 'solar', type: 'SolarFarm', pos: [30, 0, -10], label: 'Dispersed Micro-Generation', volts: '480 V', labelY: 5 },
    { id: 'dist_pole2', type: 'Pole', pos: [-10, 0, 10], label: 'Distribution Pole', volts: '13,800 V', labelY: 10, hasTransformer: true },
    { id: 'res', type: 'House', pos: [10, 0, 10], label: 'Residential Customer', volts: '120/240 V', labelY: 7 },
  ] as NodeData[],
  wires: [
    { id: 'w1', from: 'main_sub', to: 'dist_pole1', color: '#eab308', voltage: '13,800 V', type: 'Distribution' },
    { id: 'w2', from: 'dist_pole1', to: 'comm_ind', color: '#eab308', voltage: '13,800 V', type: 'Distribution' },
    { id: 'w3', from: 'solar', to: 'comm_ind', color: '#ef4444', voltage: '480 V', type: 'Micro-Generation Tie-in' },
    { id: 'w4', from: 'dist_pole1', to: 'dist_pole2', color: '#eab308', voltage: '13,800 V', type: 'Distribution' },
    { id: 'w5', from: 'dist_pole2', to: 'res', color: '#eab308', voltage: '120/240 V', type: 'Service Drop' },
  ] as WireData[]
};

export const initialNodes = fossilGrid.nodes;
export const initialWires = fossilGrid.wires;


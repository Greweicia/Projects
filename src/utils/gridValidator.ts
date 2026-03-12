import { NodeData, WireData, ValidationResult } from '../types';

export function validateGrid(nodes: NodeData[], wires: WireData[]): ValidationResult[] {
  const results: ValidationResult[] = [];

  const powerPlants = nodes.filter(n => ['PowerPlant', 'HydroDam', 'WindTurbine', 'SolarFarm', 'NuclearPlant', 'CombustionEngine', 'Biomass'].includes(n.type));
  if (powerPlants.length === 0) {
    results.push({ status: 'error', message: 'No Generating Station found. The grid needs a power source.' });
    return results;
  }
  results.push({ status: 'success', message: 'Generating Station is present.' });

  const adj: Record<string, string[]> = {};
  nodes.forEach(n => adj[n.id] = []);
  wires.forEach(w => {
    if(adj[w.from] && adj[w.to]) {
        adj[w.from].push(w.to);
        adj[w.to].push(w.from);
    }
  });

  const visited = new Set<string>();
  const nodeVoltages: Record<string, number> = {};

  const queue: { id: string, voltage: number, path: string[] }[] = [];
  powerPlants.forEach(p => {
    queue.push({ id: p.id, voltage: 20, path: [p.id] });
  });

  let housesPowered = 0;

  while (queue.length > 0) {
    const { id, voltage, path } = queue.shift()!;
    if (visited.has(id)) continue;
    visited.add(id);
    nodeVoltages[id] = voltage;

    const node = nodes.find(n => n.id === id)!;
    let outputVoltage = voltage;

    if (node.type === 'Tower') {
      if (voltage < 69) {
        results.push({ status: 'warning', message: `Tower is carrying low voltage (${voltage}kV). Towers are designed for high voltage.` });
      } else if (voltage > 765) {
         results.push({ status: 'error', message: `Voltage too high for Tower.` });
      }
    } else if (node.type === 'Transformer') {
      if (voltage === 20) {
        outputVoltage = 138;
        results.push({ status: 'success', message: 'Step-up transformer successfully increased voltage to 138kV for transmission.' });
      } else if (voltage === 138) {
        outputVoltage = 34.5;
        results.push({ status: 'success', message: 'Substation stepped down voltage to 34.5kV.' });
      } else if (voltage === 34.5) {
        outputVoltage = 13.8;
        results.push({ status: 'success', message: 'Substation stepped down voltage to 13.8kV for distribution.' });
      } else {
        results.push({ status: 'error', message: `Transformer received unexpected voltage: ${voltage}kV.` });
      }
    } else if (node.type === 'Pole') {
      if (voltage > 34.5) {
        results.push({ status: 'error', message: `Pole received ${voltage}kV! Wood poles cannot safely handle transmission voltages.` });
      }
      // If it's a distribution pole (13.8kV) and connects to a house, it acts as a transformer
      if (voltage <= 34.5) {
        outputVoltage = 0.24; // Assume it has a pole-mounted transformer for downstream
      }
    } else if (node.type === 'Vault') {
      if (voltage > 34.5) {
        results.push({ status: 'error', message: `Underground Vault received dangerous voltage: ${voltage}kV.` });
      } else {
        outputVoltage = 0.24;
        results.push({ status: 'success', message: 'Vault stepped down voltage to 120/240V.' });
      }
    } else if (node.type === 'House' || node.type === 'Farm') {
      if (voltage > 0.48) {
        results.push({ status: 'error', message: `DANGER! ${node.type} received ${voltage}kV! You need a step-down transformer before residential connections.` });
      } else {
        housesPowered++;
      }
    } else if (node.type === 'Factory') {
      if (voltage > 34.5) {
         results.push({ status: 'error', message: `Factory received ${voltage}kV! Too high for direct connection.` });
      } else {
         housesPowered++;
      }
    }

    adj[id].forEach(neighborId => {
      if (!visited.has(neighborId)) {
        queue.push({ id: neighborId, voltage: outputVoltage, path: [...path, neighborId] });
      }
    });
  }

  const unpowered = nodes.filter(n => !visited.has(n.id));
  if (unpowered.length > 0) {
    results.push({ status: 'warning', message: `${unpowered.length} components are not connected to the power source.` });
  }

  if (housesPowered > 0 && !results.some(r => r.status === 'error')) {
    results.push({ status: 'success', message: `Great job! Safely powered ${housesPowered} customers.` });
  }

  // Deduplicate messages
  const uniqueResults = Array.from(new Set(results.map(r => JSON.stringify(r)))).map(s => JSON.parse(s));

  return uniqueResults;
}

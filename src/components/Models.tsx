import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const PowerPlant = () => (
  <group>
    {/* Main Building */}
    <mesh position={[0, 3, 0]} castShadow receiveShadow>
      <boxGeometry args={[8, 6, 6]} />
      <meshStandardMaterial color="#cbd5e1" />
    </mesh>
    {/* Secondary Building */}
    <mesh position={[6, 2, 0]} castShadow receiveShadow>
      <boxGeometry args={[4, 4, 5]} />
      <meshStandardMaterial color="#94a3b8" />
    </mesh>
    {/* Smokestacks */}
    <mesh position={[-2, 8, -1.5]} castShadow>
      <cylinderGeometry args={[0.8, 1, 10]} />
      <meshStandardMaterial color="#64748b" />
    </mesh>
    <mesh position={[2, 8, -1.5]} castShadow>
      <cylinderGeometry args={[0.8, 1, 10]} />
      <meshStandardMaterial color="#64748b" />
    </mesh>
  </group>
);

export const HydroDam = () => (
  <group>
    {/* Dam wall */}
    <mesh position={[0, 4, 0]} castShadow receiveShadow>
      <boxGeometry args={[12, 8, 4]} />
      <meshStandardMaterial color="#94a3b8" />
    </mesh>
    {/* Water high */}
    <mesh position={[0, 3, -6]} receiveShadow>
      <boxGeometry args={[12, 6, 8]} />
      <meshStandardMaterial color="#0ea5e9" transparent opacity={0.8} />
    </mesh>
    {/* Water low */}
    <mesh position={[0, 0.5, 6]} receiveShadow>
      <boxGeometry args={[12, 1, 8]} />
      <meshStandardMaterial color="#0ea5e9" transparent opacity={0.8} />
    </mesh>
  </group>
);

export const WindTurbine = () => {
  const bladesRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (bladesRef.current) {
      bladesRef.current.rotation.z -= 0.02;
    }
  });
  return (
    <group>
      {/* Tower */}
      <mesh position={[0, 6, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.5, 12]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      {/* Nacelle */}
      <mesh position={[0, 12, 0]} castShadow>
        <boxGeometry args={[1, 1, 2]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      {/* Blades */}
      <group position={[0, 12, 1]} ref={bladesRef}>
        {[0, 1, 2].map(i => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI * 2) / 3]} position={[0,0,0]}>
            <boxGeometry args={[0.2, 5, 0.1]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
        ))}
      </group>
    </group>
  );
};

export const SolarFarm = () => (
  <group>
    {[-3, 0, 3].map(x => 
      [-3, 0, 3].map(z => (
        <group key={`${x}-${z}`} position={[x, 0.5, z]}>
          {/* Stand */}
          <mesh position={[0, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 1]} />
            <meshStandardMaterial color="#64748b" />
          </mesh>
          {/* Panel */}
          <mesh position={[0, 1, 0]} rotation={[Math.PI/6, 0, 0]} castShadow>
            <boxGeometry args={[2.5, 0.1, 1.5]} />
            <meshStandardMaterial color="#1d4ed8" />
          </mesh>
        </group>
      ))
    )}
  </group>
);

export const NuclearPlant = () => (
  <group>
    {/* Cooling Tower 1 */}
    <mesh position={[-3, 4, 0]} castShadow>
      <cylinderGeometry args={[2, 3, 8, 16, 1, true]} />
      <meshStandardMaterial color="#cbd5e1" side={THREE.DoubleSide} />
    </mesh>
    {/* Cooling Tower 2 */}
    <mesh position={[3, 4, 0]} castShadow>
      <cylinderGeometry args={[2, 3, 8, 16, 1, true]} />
      <meshStandardMaterial color="#cbd5e1" side={THREE.DoubleSide} />
    </mesh>
    {/* Reactor Building */}
    <mesh position={[0, 3, 4]} castShadow>
      <sphereGeometry args={[3, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial color="#94a3b8" />
    </mesh>
    <mesh position={[0, 1.5, 4]} castShadow>
      <cylinderGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color="#94a3b8" />
    </mesh>
  </group>
);

export const CombustionEngine = () => (
  <group>
    <mesh position={[0, 2, 0]} castShadow>
      <boxGeometry args={[8, 4, 4]} />
      <meshStandardMaterial color="#b91c1c" />
    </mesh>
    <mesh position={[0, 4.5, 0]} castShadow>
      <cylinderGeometry args={[0.5, 0.5, 1]} rotation={[0, 0, Math.PI/2]} />
      <meshStandardMaterial color="#475569" />
    </mesh>
  </group>
);

export const Biomass = () => (
  <group>
    <mesh position={[-2, 2, 0]} castShadow>
      <boxGeometry args={[4, 4, 6]} />
      <meshStandardMaterial color="#94a3b8" />
    </mesh>
    <mesh position={[3, 1.5, 0]} castShadow>
      <coneGeometry args={[3, 3, 4]} />
      <meshStandardMaterial color="#b45309" />
    </mesh>
  </group>
);

export const Transformer = () => (
  <group>
    {/* Base */}
    <mesh position={[0, 2, 0]} castShadow receiveShadow>
      <boxGeometry args={[4, 4, 3]} />
      <meshStandardMaterial color="#475569" />
    </mesh>
    {/* Cooling Fins */}
    <mesh position={[-2.2, 2, 0]} castShadow>
      <boxGeometry args={[0.4, 3, 2.5]} />
      <meshStandardMaterial color="#334155" />
    </mesh>
    <mesh position={[2.2, 2, 0]} castShadow>
      <boxGeometry args={[0.4, 3, 2.5]} />
      <meshStandardMaterial color="#334155" />
    </mesh>
    {/* Bushings */}
    {[-1, 0, 1].map((x, i) => (
      <group key={i} position={[x, 4.5, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.15, 0.3, 1]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.2]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
      </group>
    ))}
  </group>
);

export const Tower = () => (
  <group>
    {/* Base structure - simplified lattice */}
    <mesh position={[0, 6, 0]} castShadow>
      <cylinderGeometry args={[0.5, 3, 12, 4]} />
      <meshStandardMaterial color="#94a3b8" wireframe={false} />
    </mesh>
    {/* Cross arms */}
    <mesh position={[0, 10, 0]} castShadow>
      <boxGeometry args={[10, 0.5, 0.5]} />
      <meshStandardMaterial color="#64748b" />
    </mesh>
    <mesh position={[0, 8, 0]} castShadow>
      <boxGeometry args={[14, 0.5, 0.5]} />
      <meshStandardMaterial color="#64748b" />
    </mesh>
    {/* Insulators */}
    {[-5, 5, -7, 7].map((x, i) => (
      <mesh key={i} position={[x, i < 2 ? 9.5 : 7.5, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 1]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
    ))}
  </group>
);

export const Pole = ({ hasTransformer = false }: { hasTransformer?: boolean }) => (
  <group>
    {/* Wood pole */}
    <mesh position={[0, 4, 0]} castShadow>
      <cylinderGeometry args={[0.25, 0.3, 8]} />
      <meshStandardMaterial color="#78350f" />
    </mesh>
    {/* Cross arm */}
    <mesh position={[0, 7, 0]} castShadow>
      <boxGeometry args={[4, 0.3, 0.3]} />
      <meshStandardMaterial color="#78350f" />
    </mesh>
    {/* Insulators */}
    {[-1.5, 0, 1.5].map((x, i) => (
      <mesh key={i} position={[x, 7.3, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.4]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
    ))}
    {/* Pole-mounted transformer */}
    {hasTransformer && (
      <mesh position={[0.5, 5.5, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.6, 1.5]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
    )}
  </group>
);

export const Factory = () => (
  <group>
    {/* Main building */}
    <mesh position={[0, 2, 0]} castShadow receiveShadow>
      <boxGeometry args={[8, 4, 6]} />
      <meshStandardMaterial color="#b91c1c" />
    </mesh>
    {/* Sawtooth roof */}
    {[-2, 0, 2].map((x, i) => (
      <mesh key={i} position={[x, 4.5, 0]} rotation={[Math.PI/2, 0, Math.PI/2]} castShadow>
        <cylinderGeometry args={[1.5, 1.5, 6, 3]} />
        <meshStandardMaterial color="#991b1b" />
      </mesh>
    ))}
  </group>
);

export const House = ({ color = "#e0f2fe" }: { color?: string }) => (
  <group>
    {/* Base */}
    <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
      <boxGeometry args={[4, 3, 4]} />
      <meshStandardMaterial color={color} />
    </mesh>
    {/* Roof */}
    <mesh position={[0, 3.8, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
      <coneGeometry args={[3.5, 2, 4]} />
      <meshStandardMaterial color="#334155" />
    </mesh>
  </group>
);

export const Farm = () => (
  <group>
    <House color="#fef08a" />
    {/* Silo */}
    <mesh position={[4, 4, -2]} castShadow receiveShadow>
      <cylinderGeometry args={[1.5, 1.5, 8]} />
      <meshStandardMaterial color="#f1f5f9" />
    </mesh>
    <mesh position={[4, 8, -2]} castShadow>
      <sphereGeometry args={[1.5, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial color="#94a3b8" />
    </mesh>
    {/* Barn */}
    <mesh position={[0, 2, -6]} castShadow receiveShadow>
      <boxGeometry args={[6, 4, 5]} />
      <meshStandardMaterial color="#dc2626" />
    </mesh>
    <mesh position={[0, 4.5, -6]} rotation={[0, Math.PI / 4, 0]} castShadow>
      <coneGeometry args={[4.5, 2, 4]} />
      <meshStandardMaterial color="#991b1b" />
    </mesh>
  </group>
);

export const Vault = () => (
  <group>
    <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
      <boxGeometry args={[3, 1, 2]} />
      <meshStandardMaterial color="#334155" />
    </mesh>
    <mesh position={[0, 1.01, 0]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
      <planeGeometry args={[2.8, 1.8]} />
      <meshStandardMaterial color="#1e293b" />
    </mesh>
  </group>
);

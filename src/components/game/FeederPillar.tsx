"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text, Float } from "@react-three/drei";

export function FeederPillar({ onClick }: { onClick?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <group position={[0, -0.5, 0]}>
      {/* Main Box Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 3, 1]} />
        <meshStandardMaterial color="#2c2e3a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <boxGeometry args={[2.2, 0.2, 1.2]} />
        <meshStandardMaterial color="#1a1c23" />
      </mesh>

      {/* Door (Placeholder) */}
      <mesh 
        position={[0, 0, 0.51]} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <planeGeometry args={[1.8, 2.8]} />
        <meshStandardMaterial 
          color={isOpen ? "#333" : "#3d4050"} 
          metalness={0.5} 
          roughness={0.5}
          emissive={isOpen ? "#000" : "#111"}
        />
      </mesh>

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[1.2, -1, 0]} onClick={onClick}>
          <capsuleGeometry args={[0.05, 0.4, 4, 8]} />
          <meshStandardMaterial color="#ff4444" emissive="#ff0000" emissiveIntensity={0.5} />
        </mesh>
      </Float>

      {/* Labels */}
      <Text
        position={[0, 1.8, 0.6]}
        fontSize={0.1}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        UNIT-FP-042
      </Text>
    </group>
  );
}

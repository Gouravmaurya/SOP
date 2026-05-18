"use client";

import { Canvas } from "@react-three/fiber";
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  ContactShadows,
  Float,
  Text
} from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import { FeederPillar } from "./FeederPillar";
import { motion } from "framer-motion";
import { Timer, Target, AlertTriangle } from "lucide-react";

interface SimulationCanvasProps {
  onHazardFound: (points: number) => void;
  onComplete: () => void;
  timeLimit?: number;
}

export function SimulationCanvas({ onHazardFound, onComplete, timeLimit = 60 }: SimulationCanvasProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  const handleHazardClick = () => {
    setScore(prev => prev + 100);
    onHazardFound(100);
  };

  return (
    <div className="relative w-full h-full bg-[#050b16]">
      {/* In-Mission HUD */}
      <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-10 pointer-events-none">
        <div className="flex gap-4">
          <div className="glass-panel px-4 py-2 bg-black/40 flex items-center gap-3 border-white/10">
            <Timer className={timeLeft < 10 ? "text-red-500 animate-pulse" : "text-[#0ea5e9]"} size={20} />
            <div className="flex flex-col">
              <span className="text-[8px] text-white/40 font-black uppercase tracking-widest">Time Remaining</span>
              <span className={timeLeft < 10 ? "text-lg font-black text-red-500 italic" : "text-lg font-black text-white italic"}>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className="glass-panel px-4 py-2 bg-black/40 flex items-center gap-3 border-white/10">
            <Target className="text-[#facc15]" size={20} />
            <div className="flex flex-col">
              <span className="text-[8px] text-white/40 font-black uppercase tracking-widest">Score</span>
              <span className="text-lg font-black text-white italic">{score}</span>
            </div>
          </div>
        </div>

        <div className="glass-panel px-6 py-3 bg-[#ef4444]/10 border-[#ef4444]/20 flex items-center gap-3">
          <AlertTriangle className="text-[#ef4444] animate-bounce" size={24} />
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-[#ef4444] uppercase tracking-widest">Emergency Mission</span>
            <span className="text-xs font-bold text-white">Identify High-Risk Hazards</span>
          </div>
        </div>
      </div>

      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={50} />
          <OrbitControls 
            enablePan={false} 
            maxPolarAngle={Math.PI / 2} 
            minDistance={3}
            maxDistance={10}
          />
          
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={1} />

          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <FeederPillar onClick={handleHazardClick} />
          </Float>

          {/* Environmental elements */}
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.4} 
            scale={20} 
            blur={2.4} 
            far={4.5} 
          />
          <Environment preset="city" />

          {/* Instructions in 3D Space */}
          <Text
            position={[0, 4, -2]}
            fontSize={0.5}
            color="white"
            font="/fonts/Geist-Black.woff"
            anchorX="center"
            anchorY="middle"
          >
            ROTATE & INSPECT
          </Text>
        </Suspense>
      </Canvas>

      {/* Control Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass-panel px-6 py-2 bg-white/5 border-white/10 text-[10px] text-white/40 font-bold uppercase tracking-widest">
        Drag to rotate • Scroll to zoom • Click hazards to identify
      </div>
    </div>
  );
}

"use client";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function DoraemonModel({ speaking }: { speaking: boolean }) {
  const rightArmRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (speaking && rightArmRef.current) {
      // Wave arm back and forth between roughly -0.2 and 1.8
      rightArmRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 8) * 0.8 + 0.8;
    } else if (rightArmRef.current) {
      // Rest arm downwards
      rightArmRef.current.rotation.z = -1.0;
    }
  });

  return (
    <group position={[0, -1, 0]}>
      {/* Head */}
      <mesh position={[0, 2.7, 0]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial color="#00A0E9" roughness={0.3} />
      </mesh>
      {/* Face (White part) */}
      <mesh position={[0, 2.6, 0.4]}>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshStandardMaterial color="white" roughness={0.4} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.3, 3.1, 1.3]} rotation={[0.2, -0.4, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0.3, 3.1, 1.3]} rotation={[0.2, 0.4, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[-0.2, 3.1, 1.5]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[0.2, 3.1, 1.5]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      {/* Nose */}
      <mesh position={[0, 2.8, 1.4]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="red" />
      </mesh>
      {/* Body */}
      <mesh position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.9, 1.0, 1.8, 32]} />
        <meshStandardMaterial color="#00A0E9" roughness={0.3} />
      </mesh>
      {/* Belly (White part) */}
      <mesh position={[0, 1.0, 0.4]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="white" roughness={0.4} />
      </mesh>
      {/* Collar/Necklace */}
      <mesh position={[0, 1.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.95, 0.08, 16, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>
      {/* Bell */}
      <mesh position={[0, 1.8, 0.95]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      
      {/* Left Arm */}
      <group position={[-1.1, 1.6, 0]} rotation={[0, 0, 1.2]}>
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.8, 16]} />
          <meshStandardMaterial color="#00A0E9" />
        </mesh>
        <mesh position={[0, -0.9, 0]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </group>

      {/* Right Arm (Waving) */}
      <group position={[1.1, 1.6, 0]} ref={rightArmRef}>
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.8, 16]} />
          <meshStandardMaterial color="#00A0E9" />
        </mesh>
        <mesh position={[0, -0.9, 0]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </group>

      {/* Feet */}
      <mesh position={[-0.4, 0.1, 0.2]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0.4, 0.1, 0.2]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>

      <ContactShadows position={[0, -0.1, 0]} opacity={0.6} scale={6} blur={2.5} far={2} />
    </group>
  );
}

export default function DoraemonIntro({ onComplete }: { onComplete: () => void }) {
  const [started, setStarted] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [fading, setFading] = useState(false);

  const handleStart = () => {
    setStarted(true);
    setSpeaking(true);

    // Some browsers require speech synthesis to be initialized directly in event handler
    const msg = new SpeechSynthesisUtterance("Hey, welcome to Sachin's portfolio");
    msg.pitch = 1.3;
    msg.rate = 1.0;
    
    msg.onend = () => {
      setSpeaking(false);
      setTimeout(() => {
        setFading(true);
        setTimeout(onComplete, 1000);
      }, 1000);
    };

    window.speechSynthesis.speak(msg);
    
    // Safety fallback in case onend never fires (e.g. some Safari cases)
    setTimeout(() => {
      setSpeaking(false);
      setFading(true);
      setTimeout(onComplete, 1000);
    }, 6000);
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-1000 ${fading ? 'opacity-0' : 'opacity-100'} ${fading ? 'pointer-events-none' : ''}`}>
      {!started && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white mb-12">
            Ready to <span className="text-neon-blue">Explore?</span>
          </h1>
          <button
            onClick={handleStart}
            className="px-10 py-5 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(0,240,255,0.8)] transition-all text-xl"
          >
            Enter Portfolio
          </button>
        </div>
      )}
      
      <div className="w-full h-full relative">
        <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} />
          <Environment preset="city" />
          {started && <DoraemonModel speaking={speaking} />}
        </Canvas>
        
        {speaking && (
          <div className="absolute bottom-20 left-0 right-0 flex justify-center">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl max-w-lg text-center shadow-[0_0_20px_rgba(0,240,255,0.4)]">
              <p className="text-2xl font-bold text-white">Hey, welcome to Sachin&apos;s portfolio!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

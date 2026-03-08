import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

const MakeupBrush = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Brush handle */}
        <mesh position={[0, -0.8, 0]}>
          <cylinderGeometry args={[0.08, 0.06, 2.2, 16]} />
          <meshStandardMaterial color="#d4a574" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Gold ring */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.15, 16]} />
          <meshStandardMaterial color="#c9a84c" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Brush bristles */}
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.25, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#f5e6d3" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.1, 0.25, 0.5, 16]} />
          <meshStandardMaterial color="#f0d5c0" roughness={0.8} />
        </mesh>

        {/* Floating powder particles */}
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (i / 20) * Math.PI * 2;
          const radius = 0.4 + Math.random() * 0.6;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius,
                0.8 + Math.random() * 0.8,
                Math.sin(angle) * radius,
              ]}
            >
              <sphereGeometry args={[0.015 + Math.random() * 0.02, 8, 8]} />
              <meshStandardMaterial
                color={i % 3 === 0 ? "#e8a0b5" : i % 3 === 1 ? "#c9a84c" : "#f5d0d6"}
                transparent
                opacity={0.6 + Math.random() * 0.4}
                emissive={i % 3 === 0 ? "#e8a0b5" : "#c9a84c"}
                emissiveIntensity={0.3}
              />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
};

const Hero3DScene = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} color="#ffeedd" />
          <pointLight position={[-3, 2, 3]} intensity={0.8} color="#e8a0b5" />
          <pointLight position={[3, -1, 2]} intensity={0.5} color="#c9a84c" />
          <MakeupBrush />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero3DScene;

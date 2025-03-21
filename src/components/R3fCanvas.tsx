"use client";

import { Environment, OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { CustomSphere } from "./CustomSphere";
import { CustomTorus } from "./CustomTorus";
import GlassPanel from "./GlassPanel";

interface R3fCanvasProps {
  onLoad: () => void;
}

export function R3fCanvas({ onLoad }: R3fCanvasProps) {
  return (
    <Canvas>
      {/* <OrbitControls /> */}
      <OrthographicCamera
        position={[0, 0, 30]}
        makeDefault
        left={-5}
        bottom={-5}
        right={5}
        top={5}
      />
      <Environment preset="city" environmentIntensity={0.1} />
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <CustomTorus position={[5, -3, 0]} />
      <CustomTorus position={[-5, 3, 0]} />
      <CustomSphere position={[-5, -3, -10]} />
      <CustomSphere position={[5, 3, -10]} />
      <CustomSphere position={[5, 0, -10]} />
      <GlassPanel onLoad={onLoad} />
    </Canvas>
  );
}

"use client";

import { Environment, OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import PixelatedPanel from "./meshes/PixelatedPanel";

interface StackCanvasProps {
  onLoad: () => void;
}

export function StackCanvas({ onLoad }: StackCanvasProps) {
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
      <PixelatedPanel onLoad={onLoad} />
    </Canvas>
  );
}

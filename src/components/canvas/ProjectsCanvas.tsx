"use client";

import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import StripePanel from "./meshes/StripePanel";
import { Euler } from "three";

interface ProjectsCanvasProps {
  onLoad: () => void;
}

export function ProjectsCanvas({ onLoad }: ProjectsCanvasProps) {
  return (
    <Canvas>
      {/* <OrbitControls
        onChange={(ev) =>
          console.log(
            ev?.target.object.rotation,
            ev?.target.object.position,
            ev?.target.object.zoom
          )
        }
      /> */}
      <OrthographicCamera
        position={[-7.272, -4.943, 28.683]}
        rotation={new Euler(0.171, -0.245, 0.042)}
        zoom={1.851}
        makeDefault
        left={-5}
        bottom={-5}
        right={5}
        top={5}
      />
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <StripePanel onLoad={onLoad} />
    </Canvas>
  );
}

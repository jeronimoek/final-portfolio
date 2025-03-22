import type { ThreeElements } from "@react-three/fiber";
import type { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { useMotionValue, useSpring, useVelocity } from "framer-motion";
import { useLayoutEffect, useRef } from "react";

export function CustomTorus(props: ThreeElements["mesh"]) {
  const meshRef = useRef<Mesh>(null);
  const xPos = useMotionValue(0);
  const yPos = useMotionValue(0);
  const xVelocity = useVelocity(xPos);
  const yVelocity = useVelocity(yPos);
  const xSpring = useSpring(xVelocity, { stiffness: 20 });
  const ySpring = useSpring(yVelocity, { stiffness: 20 });

  useLayoutEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      xPos.set(ev.clientX);
      yPos.set(ev.clientY);
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  useFrame(() => {
    if (!meshRef.current) {
      return;
    }
    const vel = Math.min(
      100,
      Math.sqrt(xSpring.get() ** 2 + ySpring.get() ** 2)
    );
    meshRef.current.rotation.x += 0.01 + vel / 1000;
  });
  return (
    <mesh {...props} ref={meshRef} rotation={[0, 1, 0]}>
      <torusGeometry args={[2, 0.5, 16, 100]} />
      <meshPhysicalMaterial metalness={1} roughness={0.127} color="gray" />
    </mesh>
  );
}

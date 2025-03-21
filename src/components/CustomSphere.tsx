import type { ThreeElements } from "@react-three/fiber";
import type { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { useMotionValue, useSpring, useVelocity } from "framer-motion";
import { useEffect, useRef } from "react";

export function CustomSphere(props: ThreeElements["mesh"]) {
  const meshRef = useRef<Mesh>(null);
  const xPos = useMotionValue(0);
  const yPos = useMotionValue(0);
  const xVelocity = useVelocity(xPos);
  const yVelocity = useVelocity(yPos);
  const xSpring = useSpring(xVelocity, { stiffness: 20 });
  const ySpring = useSpring(yVelocity, { stiffness: 20 });

  useEffect(() => {
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
      1000,
      Math.sqrt(xSpring.get() ** 2 + ySpring.get() ** 2)
    );
    const scalar = Math.max(0.1, 1 - vel / 1000);
    meshRef.current.scale.set(scalar, scalar, scalar);
    meshRef.current.position.x += 0.001 + vel / 10000;
    meshRef.current.position.y += 0.001 + vel / 10000;
    if (meshRef.current.position.x > 6) {
      meshRef.current.position.x = -6;
    }
    if (meshRef.current.position.y > 6) {
      meshRef.current.position.y = -6;
    }
  });
  return (
    <mesh {...props} ref={meshRef}>
      <sphereGeometry args={[1]} />
      <meshPhysicalMaterial metalness={1} roughness={0.127} color="gray" />
    </mesh>
  );
}

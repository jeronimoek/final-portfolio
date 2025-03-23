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
    const updateMousePosition = (ev: PointerEvent) => {
      xPos.set(ev.clientX);
      yPos.set(ev.clientY);
    };
    function onTouchStart() {
      xPos.set(xPos.get() + 400);
      yPos.set(yPos.get() + 400);
    }

    window.addEventListener("pointermove", updateMousePosition);
    window.addEventListener("touchstart", onTouchStart);

    return () => {
      window.removeEventListener("pointermove", updateMousePosition);
      window.removeEventListener("touchstart", onTouchStart);
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
    meshRef.current.position.x += 0.01 + vel / 10000;
    meshRef.current.position.y += 0.01 + vel / 10000;
    if (meshRef.current.position.x > 6) {
      meshRef.current.position.x = -6;
    }
    if (meshRef.current.position.y > 6) {
      meshRef.current.position.y = -6;
    }
  });
  return (
    <mesh {...props} ref={meshRef}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshPhysicalMaterial metalness={1} roughness={0.127} color="gray" />
    </mesh>
  );
}

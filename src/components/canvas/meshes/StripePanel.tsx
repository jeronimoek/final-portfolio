import type { BufferGeometry, Mesh, ShaderMaterial } from "three";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Color, DoubleSide, PlaneGeometry } from "three";
import vertex from "../../../glsl/stripe/vertex.vert";
import fragment from "../../../glsl/stripe/fragment.frag";
import { useFrame } from "@react-three/fiber";
import {
  getDocumentHeight,
  getScrollPosition,
  getWindowHeight,
} from "../../../utils/tools";

interface StripePanelProps {
  onLoad: () => void;
}

const CAMERA_UNITS = 10;
const HEIGHT = CAMERA_UNITS;

export default function StripePanel({ onLoad }: StripePanelProps) {
  const meshRef = useRef<Mesh>(null);
  const shaderRef = useRef<ShaderMaterial>(null);
  const [geometry, setGeometry] = useState<BufferGeometry>();

  const palette = useMemo(() => {
    const threejsColors = [
      "#000000",
      "#026102",
      "#476600",
      "#451E66",
      "#355c7d",
    ].map((color) => new Color(color));
    return threejsColors;
  }, []);

  const uniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uColor: { value: palette },
    };
  }, []);

  useLayoutEffect(() => {
    const windowHeight = getWindowHeight();
    const docHeight = getDocumentHeight();

    // Create geometry
    const rectWidth = 10;
    setGeometry(new PlaneGeometry(rectWidth, 10, 100, 100));

    const proportion = docHeight / windowHeight;
    meshRef.current?.scale.set(1, proportion, 1);
    meshRef.current?.position.set(0, -(HEIGHT / 2) * (proportion - 1), 0);

    function onScroll() {
      const scrollPosition = getScrollPosition();

      const scrollCanvasDiff =
        -(HEIGHT / 2) * (proportion - 1) +
        (scrollPosition / windowHeight) * CAMERA_UNITS;
      meshRef.current?.position.set(0, scrollCanvasDiff, 0);
    }

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef} geometry={geometry} onAfterRender={onLoad}>
      <shaderMaterial
        ref={shaderRef}
        side={DoubleSide}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        // wireframe
      />
    </mesh>
  );
}

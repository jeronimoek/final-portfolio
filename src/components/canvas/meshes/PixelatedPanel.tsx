import type { Mesh, ShaderMaterial } from "three";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { DoubleSide, ShapeGeometry, Vector3 } from "three";
import vertex from "../../../glsl/vertex.vert";
import fragment from "../../../glsl/fragment.frag";
import { useFrame } from "@react-three/fiber";
import {
  getDocumentHeight,
  getDocumentWidth,
  getWindowHeight,
  roundedRect,
} from "../../../utils/tools";
import { getColorTexture } from "../../../constants/colors";

interface PixelatedPanelProps {
  onLoad: () => void;
}

const CAMERA_UNITS = 10;
const HEIGHT = CAMERA_UNITS;

export default function PixelatedPanel({ onLoad }: PixelatedPanelProps) {
  const meshRef = useRef<Mesh>(null);
  const shaderRef = useRef<ShaderMaterial>(null);
  const [geometry, setGeometry] = useState<ShapeGeometry>();

  // mesh.position.set(x, y, z - 75);

  const uniforms = useMemo(() => {
    return {
      uDataTexture: { value: getColorTexture() },
      uMouseWorldPosition: { value: new Vector3(9999, 9999, 9999) },
      uTime: { value: 0 },
    };
  }, []);

  useLayoutEffect(() => {
    const windowHeight = getWindowHeight();
    const docHeight = getDocumentHeight();
    const docWidth = getDocumentWidth();

    // Create geometry

    const rectWidth = docWidth > 768 ? 0.8 * CAMERA_UNITS : CAMERA_UNITS;
    const roundedRectShape = roundedRect(0, 0, rectWidth, HEIGHT, 0.5);
    setGeometry(new ShapeGeometry(roundedRectShape));

    const proportion = docHeight / windowHeight;
    // console.log(proportion);
    meshRef.current?.scale.set(1, proportion, 1);
    meshRef.current?.position.set(
      -rectWidth / 2,
      -HEIGHT / 2 - HEIGHT * (proportion - 1),
      4
    );

    function onScroll() {
      const scrollPosition =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (
              document.documentElement ||
              document.body.parentNode ||
              document.body
            ).scrollTop;
      // console.log({ scrollPosition });
      const scrollCanvasDiff = (scrollPosition / windowHeight) * CAMERA_UNITS;
      // console.log({ scrollCanvasDiff });
      meshRef.current?.position.set(
        -rectWidth / 2,
        -HEIGHT / 2 - HEIGHT * (proportion - 1) + scrollCanvasDiff,
        4
      );
      // console.log(-4.5 - 9.5 * (proportion - 1) + scrollCanvasDiff);
      // console.log(document.body);
    }
    // console.log({ windowHeight, docHeight });

    function updateMousePosition(x: number, y: number) {
      const finalX = x / docWidth;
      const finalY = y / docHeight;

      const vector = new Vector3(
        finalX * 10 - (10 - rectWidth) / 2,
        -finalY * 10 + 10,
        0
      );
      uniforms.uMouseWorldPosition.value = vector;
    }

    function onMouseMove(ev: MouseEvent) {
      updateMousePosition(ev.pageX, ev.pageY);
    }

    function onTouchEnd(ev: TouchEvent) {
      const touch = ev.touches[0];
      if (touch) updateMousePosition(touch.pageX, touch.pageY);
    }

    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef} geometry={geometry} onAfterRender={onLoad}>
      {/* <meshStandardMaterial color={"#333333"} /> */}
      <shaderMaterial
        ref={shaderRef}
        side={DoubleSide}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

import type { Mesh, ShaderMaterial } from "three";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { DoubleSide, ShapeGeometry, Vector3 } from "three";
import vertex from "../../../glsl/vertex.vert";
import fragment from "../../../glsl/fragment.frag";
import { useFrame } from "@react-three/fiber";
import {
  deviceHasMouse,
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

  const uniforms = useMemo(() => {
    return {
      uDataTexture: { value: getColorTexture() },
      uMouseWorldPosition: { value: new Vector3(0, 0, 0) },
      uTime: { value: 0 },
    };
  }, []);

  useLayoutEffect(() => {
    const windowHeight = getWindowHeight();
    const docHeight = getDocumentHeight();
    const docWidth = getDocumentWidth();
    const isMd = docWidth > 768;

    // Create geometry

    const rectWidth = isMd ? 0.8 * CAMERA_UNITS : CAMERA_UNITS;
    const roundedRectShape = roundedRect(
      0,
      0,
      rectWidth,
      HEIGHT,
      isMd ? 0.3 : 0
    );
    setGeometry(new ShapeGeometry(roundedRectShape));

    const proportion = docHeight / windowHeight;
    meshRef.current?.scale.set(1, proportion, 1);
    meshRef.current?.position.set(
      -rectWidth / 2,
      -HEIGHT / 2 - HEIGHT * (proportion - 1),
      4
    );

    const hasMouse = deviceHasMouse();

    function onScroll() {
      const scrollPosition =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (
              document.documentElement ||
              document.body.parentNode ||
              document.body
            ).scrollTop;

      if (!hasMouse) updateMousePosition(docWidth - scrollPosition, -10);

      const scrollCanvasDiff = (scrollPosition / windowHeight) * CAMERA_UNITS;
      meshRef.current?.position.set(
        -rectWidth / 2,
        -HEIGHT / 2 - HEIGHT * (proportion - 1) + scrollCanvasDiff,
        4
      );
    }

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

    updateMousePosition(docWidth, -10);

    function onMouseMove(ev: PointerEvent) {
      if (ev.pointerType === "mouse") updateMousePosition(ev.pageX, ev.pageY);
    }

    // function onTouchStart(ev: TouchEvent) {
    //   const touch = ev.touches[0];
    //   if (touch) updateMousePosition(touch.pageX, touch.pageY);
    // }

    window.addEventListener("scroll", onScroll);
    window.addEventListener("pointermove", onMouseMove);
    // window.addEventListener("touchstart", onTouchStart);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMouseMove);
      // window.removeEventListener("touchstart", onTouchStart);
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

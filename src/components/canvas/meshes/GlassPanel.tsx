import type { Mesh } from "three";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { ExtrudeGeometry } from "three";
import {
  getDocumentHeight,
  getDocumentWidth,
  getWindowHeight,
  roundedRect,
} from "../../../utils/tools";

interface GlassPanelProps {
  onLoad: () => void;
}

const CAMERA_UNITS = 10;

export default function GlassPanel({ onLoad }: GlassPanelProps) {
  const meshRef = useRef<Mesh>(null);
  const [geometry, setGeometry] = useState<ExtrudeGeometry>();

  // mesh.position.set(x, y, z - 75);

  useLayoutEffect(() => {
    const windowHeight = getWindowHeight();
    const docHeight = getDocumentHeight();
    const docWidth = getDocumentWidth();
    const isMd = docWidth > 768;

    const bevelSize = isMd ? 0.2 : 0.1;
    // const bevelThickness = isMd ? 0.5 : 0;
    const height = CAMERA_UNITS - bevelSize * 2;

    // Create geometry

    const rectWidth =
      (isMd ? 0.8 * CAMERA_UNITS : CAMERA_UNITS) - bevelSize * 2;
    const roundedRectShape = roundedRect(0, 0, rectWidth, height, 0.0001);

    const extrudeSettings = {
      depth: 0.1,
      bevelEnabled: true,
      bevelSegments: 5,
      bevelSize,
      bevelThickness: 0.5,
      curveSegments: 5,
    };

    // extruded shape

    setGeometry(new ExtrudeGeometry(roundedRectShape, extrudeSettings));

    const proportion = docHeight / windowHeight;
    // console.log(proportion);
    meshRef.current?.scale.set(1, proportion, 1);
    meshRef.current?.position.set(
      -rectWidth / 2,
      -height / 2 - (height + bevelSize) * (proportion - 1),
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
        -height / 2 -
          (height + bevelSize) * (proportion - 1) +
          scrollCanvasDiff,
        4
      );
      // console.log(-4.5 - 9.5 * (proportion - 1) + scrollCanvasDiff);
      // console.log(document.body);
    }
    // console.log({ windowHeight, docHeight });

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const config = useMemo(
    () => ({
      meshPhysicalMaterial: false,
      transmissionSampler: false,
      backside: false,
      samples: 10,
      resolution: 2048,
      transmission: 1,
      roughness: 0.0,
      thickness: 3.5,
      // thickness: 10,
      ior: 1.5,
      chromaticAberration: 0.06,
      // chromaticAberration: 0.3,
      anisotropy: 0.1,
      distortion: 0.0,
      distortionScale: 0.3,
      temporalDistortion: 0.5,
      clearcoat: 1,
      attenuationDistance: 0.5,
      attenuationColor: "#ffffff",
      color: "#c9ffa1",
      bg: "#839681",
    }),
    []
  );

  return (
    <mesh ref={meshRef} geometry={geometry} onAfterRender={onLoad}>
      <MeshTransmissionMaterial {...config} />
    </mesh>
  );
}

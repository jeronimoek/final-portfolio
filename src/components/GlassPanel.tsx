import type { Mesh } from "three";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { useLayoutEffect, useMemo, useRef } from "react";
import { ExtrudeGeometry, Shape } from "three";

interface GlassPanelProps {
  onLoad: () => void;
}

const CAMERA_UNITS = 10;
const BEVEL_SIZE = 0.3;
const WIDTH = 0.8 * CAMERA_UNITS - BEVEL_SIZE * 2;
const HEIGHT = CAMERA_UNITS - BEVEL_SIZE * 2;

export default function GlassPanel({ onLoad }: GlassPanelProps) {
  const meshRef = useRef<Mesh>(null);

  const geometry = useMemo(() => {
    const roundedRectShape = new Shape();

    function roundedRect(
      ctx: Shape,
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number
    ) {
      ctx.moveTo(x, y + radius);
      ctx.lineTo(x, y + height - radius);
      ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
      ctx.lineTo(x + width - radius, y + height);
      ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width,
        y + height - radius
      );
      ctx.lineTo(x + width, y + radius);
      ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
      ctx.lineTo(x + radius, y);
      ctx.quadraticCurveTo(x, y, x, y + radius);
    }
    roundedRect(roundedRectShape, 0, 0, WIDTH, HEIGHT, 0.0001);

    const extrudeSettings = {
      depth: 0.1,
      bevelEnabled: true,
      bevelSegments: 10,
      steps: 10,
      bevelSize: BEVEL_SIZE,
      bevelThickness: 0.5,
    };

    // extruded shape

    return new ExtrudeGeometry(roundedRectShape, extrudeSettings);
  }, []);

  // mesh.position.set(x, y, z - 75);

  useLayoutEffect(() => {
    const windowHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight ||
      0;
    const docHeight = Math.max(
      document.body.scrollHeight || 0,
      document.documentElement.scrollHeight || 0,
      document.body.offsetHeight || 0,
      document.documentElement.offsetHeight || 0,
      document.body.clientHeight || 0,
      document.documentElement.clientHeight || 0
    );
    const proportion = docHeight / windowHeight;
    // console.log(proportion);
    meshRef.current?.scale.set(1, proportion, 1);
    meshRef.current?.position.set(
      -WIDTH / 2,
      -HEIGHT / 2 - (HEIGHT + BEVEL_SIZE) * (proportion - 1),
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
        -WIDTH / 2,
        -HEIGHT / 2 -
          (HEIGHT + BEVEL_SIZE) * (proportion - 1) +
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
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={[-WIDTH / 2, -HEIGHT / 2, 4]}
      onAfterRender={onLoad}
    >
      <MeshTransmissionMaterial {...config} />
    </mesh>
  );
}

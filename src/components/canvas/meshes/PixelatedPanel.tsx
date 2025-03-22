import type { Mesh, ShaderMaterial } from "three";
import { useLayoutEffect, useMemo, useRef } from "react";
import {
  DataTexture,
  DoubleSide,
  FloatType,
  RGBAFormat,
  Shape,
  ShapeGeometry,
  Vector3,
} from "three";
import vertex from "../../../glsl/vertex.vert";
import fragment from "../../../glsl/fragment.frag";

interface PixelatedPanelProps {
  onLoad: () => void;
}

const CAMERA_UNITS = 10;
const WIDTH = 0.8 * CAMERA_UNITS;
const HEIGHT = CAMERA_UNITS;

export default function PixelatedPanel({ onLoad }: PixelatedPanelProps) {
  const meshRef = useRef<Mesh>(null);
  const shaderRef = useRef<ShaderMaterial>(null);

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
    roundedRect(roundedRectShape, 0, 0, WIDTH, HEIGHT, 0.5);

    // 2d shape

    return new ShapeGeometry(roundedRectShape);
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
        -WIDTH / 2,
        -HEIGHT / 2 - HEIGHT * (proportion - 1) + scrollCanvasDiff,
        4
      );
      // console.log(-4.5 - 9.5 * (proportion - 1) + scrollCanvasDiff);
      // console.log(document.body);
    }
    // console.log({ windowHeight, docHeight });

    function onMouseMove(ev: MouseEvent) {
      if (!meshRef.current) return;

      const docHeight = Math.max(
        document.body.scrollHeight || 0,
        document.documentElement.scrollHeight || 0,
        document.body.offsetHeight || 0,
        document.documentElement.offsetHeight || 0,
        document.body.clientHeight || 0,
        document.documentElement.clientHeight || 0
      );

      const docWidth = Math.max(
        document.body.scrollWidth || 0,
        document.documentElement.scrollWidth || 0,
        document.body.offsetWidth || 0,
        document.documentElement.offsetWidth || 0,
        document.body.clientWidth || 0,
        document.documentElement.clientWidth || 0
      );

      const x = ev.pageX / docWidth;
      const y = ev.pageY / docHeight;

      const vector = new Vector3(x * 10 - 1, -y * 10 + 10, 0);
      if (shaderRef.current?.uniforms)
        shaderRef.current.uniforms.uMouseWorldPosition.value = vector;
    }

    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const texture = useMemo(() => {
    const colors = [
      // #E0BBE4
      [87.84, 73.33, 89.41],
      // #957DAD
      [58.43, 49.02, 67.84],
      // #D291BC
      [82.35, 56.86, 73.73],
      // #FEC8D8
      [99.61, 78.43, 84.71],
      // #FFDFD3
      [100, 87.45, 82.75],
      // #B3EBF2
      [70.2, 92.16, 94.9],
      // #FF746C
      [100, 45.49, 42.35],
      // #C4EED9
      [76.86, 93.33, 85.1],
    ].map((color) => color.map((value) => value / 1000));
    const triangleCount = colors.length;
    const triangleData = new Float32Array(triangleCount * 4);
    for (let i = 0; i < triangleCount; i++) {
      const triangleIndex = i * 4;
      const [x, y, z] = colors[i];

      triangleData[triangleIndex] = x;
      triangleData[triangleIndex + 1] = y;
      triangleData[triangleIndex + 2] = z;
      triangleData[triangleIndex + 3] = 1;
    }

    const dataTexture = new DataTexture(
      triangleData,
      triangleCount,
      1,
      RGBAFormat,
      FloatType
    );
    dataTexture.needsUpdate = true;

    return dataTexture;
  }, []);

  const uniforms = useMemo(() => {
    return {
      uDataTexture: { value: texture },
      uMouseWorldPosition: { value: new Vector3(0, 0, 0) },
    };
  }, []);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={[-WIDTH / 2, -HEIGHT / 2, 4]}
      onAfterRender={onLoad}
    >
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

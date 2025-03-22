import { DataTexture, FloatType, RGBAFormat } from "three";

const COLORS = [
  // rgb(74 202 0)
  [74, 202, 0],
  // rgb(154 255 95)
  [154, 255, 95],
  // rgb(0 255 157)
  [0, 255, 157],
  // rgb(179 235 242)
  [179, 235, 242],
  // rgb(24 66 0)
  [24, 66, 0],
  // rgb(199 255 108)
  [199, 255, 108],
  // rgb(0 82 50)
  [0, 82, 50],
  // rgb(196 238 217)
  [196, 238, 217],
];

export function getColorTexture() {
  const colors = COLORS.map((color) => color.map((value) => value / 1000));
  const colorCount = colors.length;
  const colorData = new Float32Array(colorCount * 4);
  for (let i = 0; i < colorCount; i++) {
    const colorIndex = i * 4;
    const [x, y, z] = colors[i];

    colorData[colorIndex] = x;
    colorData[colorIndex + 1] = y;
    colorData[colorIndex + 2] = z;
    colorData[colorIndex + 3] = 1;
  }

  const dataTexture = new DataTexture(
    colorData,
    colorCount,
    1,
    RGBAFormat,
    FloatType
  );
  dataTexture.needsUpdate = true;

  return dataTexture;
}

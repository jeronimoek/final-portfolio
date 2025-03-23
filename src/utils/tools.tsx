import { Shape } from "three";

export function getDocumentWidth() {
  return Math.max(
    document.body.scrollWidth || 0,
    document.documentElement.scrollWidth || 0,
    document.body.offsetWidth || 0,
    document.documentElement.offsetWidth || 0,
    document.body.clientWidth || 0,
    document.documentElement.clientWidth || 0
  );
}

export function getDocumentHeight() {
  return Math.max(
    document.body.scrollHeight || 0,
    document.documentElement.scrollHeight || 0,
    document.body.offsetHeight || 0,
    document.documentElement.offsetHeight || 0,
    document.body.clientHeight || 0,
    document.documentElement.clientHeight || 0
  );
}

export function getWindowHeight() {
  return (
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight ||
    0
  );
}

export function roundedRect(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  const shape = new Shape();

  shape.moveTo(x, y + radius);
  shape.lineTo(x, y + height - radius);
  shape.quadraticCurveTo(x, y + height, x + radius, y + height);
  shape.lineTo(x + width - radius, y + height);
  shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  shape.lineTo(x + width, y + radius);
  shape.quadraticCurveTo(x + width, y, x + width - radius, y);
  shape.lineTo(x + radius, y);
  shape.quadraticCurveTo(x, y, x, y + radius);

  return shape;
}

export function deviceHasMouse() {
  return matchMedia("(pointer:fine)").matches;
}

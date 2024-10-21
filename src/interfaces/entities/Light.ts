export interface Light {
  id: number;
  position: Coordinates;
  targetPosition: Coordinates;
  angle: number;
  intensity: number;
  distance: number;
  dayTime: boolean;
}
interface Coordinates {
  x: number;
  y: number;
  z: number;
}

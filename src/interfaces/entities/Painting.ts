export interface Painting {
  path: string;
  width: number;
  height: number;
  position: Coordinates;
  rotateY: number;
  info: Info;
}
interface Coordinates {
  x: number;
  y: number;
  z: number;
}

interface Info {
  name: string;
  author: string;
  price: string;
  description: string;
}

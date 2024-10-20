import type { Box3 } from 'three'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

export interface Model {
  group: string
  path: string
  scale: Coordinates
  position: Coordinates
  rotateX?: number
  rotateY?: number
  rotateZ?: number
  castShadow: boolean
  receiveShadow: boolean
  boundingBox: Box3 | null
  scene: GLTF.scene | null
}
interface Coordinates {
  x: number
  y: number
  z: number
}

import type { Light } from '~/interfaces/entities/Light'
import { config } from '~/utils/data/config'

export const lightData: Light[] = [
  {
    id: 1,
    position: {
      x: -16,
      y: 14,
      z: -18,
    },
    targetPosition: {
      x: -16,
      y: 0,
      z: -18,
    },
    angle: 40,
    intensity: 1000,
    distance: 20,
    dayTime: false,
  },
  {
    id: 2,
    position: {
      x: -1,
      y: 14,
      z: -18,
    },
    targetPosition: {
      x: -1,
      y: 0,
      z: -18,
    },
    angle: 40,
    intensity: 1000,
    distance: 20,
    dayTime: false,
  }, {
    id: 3,
    position: {
      x: 14,
      y: 14,
      z: -18,
    },
    targetPosition: {
      x: 14,
      y: 0,
      z: -18,
    },
    angle: 40,
    intensity: 1000,
    distance: 20,
    dayTime: false,
  }, {
    id: 4,
    position: {
      x: 29,
      y: 14,
      z: -18,
    },
    targetPosition: {
      x: 29,
      y: 0,
      z: -18,
    },
    angle: 40,
    intensity: 1000,
    distance: 20,
    dayTime: false,
  }, {
    id: 5,
    position: {
      x: -16,
      y: 14,
      z: 18,
    },
    targetPosition: {
      x: -16,
      y: 0,
      z: 18,
    },
    angle: 40,
    intensity: 1000,
    distance: 20,
    dayTime: false,
  }, {
    id: 6,
    position: {
      x: -1,
      y: 14,
      z: 18,
    },
    targetPosition: {
      x: -1,
      y: 0,
      z: 18,
    },
    angle: 40,
    intensity: 1000,
    distance: 20,
    dayTime: false,
  }, {
    id: 7,
    position: {
      x: 14,
      y: 14,
      z: 18,
    },
    targetPosition: {
      x: 14,
      y: 0,
      z: 18,
    },
    angle: 40,
    intensity: 1000,
    distance: 20,
    dayTime: false,
  }, {
    id: 8,
    position: {
      x: 29,
      y: 14,
      z: 18,
    },
    targetPosition: {
      x: 29,
      y: 0,
      z: 18,
    },
    angle: 40,
    intensity: 1000,
    distance: 20,
    dayTime: false,
  },
  // lighting outside
  {
    id: 9,
    position: {
      x: (config.floorWidth) + 40,
      y: 100,
      z: 20,
    },
    targetPosition: {
      x: -60,
      y: -3,
      z: 0,
    },
    angle: 30,
    intensity: 60000,
    distance: 200,
    dayTime: true,
  },
]

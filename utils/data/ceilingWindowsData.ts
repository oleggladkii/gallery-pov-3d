import type { CeilingWindow } from '~/interfaces/entities/CeilingWindow'
import { config } from '~/utils/data/config'

export const ceilingWindowsData: CeilingWindow[] = [
  {
    x: config.floorWidth / 2 + 20,
    y: config.floorHeight / 2,
    radius: 6,
  },
  {
    x: config.floorWidth / 2 + 40,
    y: config.floorHeight / 2,
    radius: 6,
  },
  {
    x: config.floorWidth / 2,
    y: config.floorHeight / 2,
    radius: 6,
  },
  {
    x: config.floorWidth / 2 - 20,
    y: config.floorHeight / 2,
    radius: 6,
  },
  {
    x: config.floorWidth / 2 - 40,
    y: config.floorHeight / 2,
    radius: 6,
  },
]

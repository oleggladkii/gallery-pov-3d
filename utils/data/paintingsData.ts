import painting1 from 'assets/images/paintings/painting1.jpeg'
import painting2 from 'assets/images/paintings/painting2.jpeg'
import painting3 from 'assets/images/paintings/painting3.jpeg'
import painting4 from 'assets/images/paintings/painting4.jpeg'
import painting5 from 'assets/images/paintings/painting5.jpeg'
import painting6 from 'assets/images/paintings/painting6.jpeg'
import painting7 from 'assets/images/paintings/painting7.jpeg'
import painting8 from 'assets/images/paintings/painting8.jpeg'
import painting9 from 'assets/images/paintings/painting9.jpg'
import painting10 from 'assets/images/paintings/painting10.jpg'
import type { Painting } from '~/interfaces/entities/Painting'
import { config } from '~/utils/data/config'

export const paintingsData: Painting[] = [{
  path: painting1,
  width: 12,
  height: 7.32,
  position: { x: -12, y: 6, z: -(config.floorHeight / 2) + 1.1 },
  rotateY: 0,
  info: {
    name: 'Starry Night (1889)',
    author: 'Vincent van Gogh',
    price: '$117.2m',
  },
},
{
  path: painting2,
  width: 8,
  height: 8,
  position: { x: 2, y: 6, z: -(config.floorHeight / 2) + 1.1 },
  rotateY: 0,
  info: {
    name: 'Mona Lisa (1503)',
    author: 'Leonardo da Vinci',
    price: '$970m',
  },
}, {
  path: painting3,
  width: 12,
  height: 8.16,
  position: { x: 16, y: 6, z: -(config.floorHeight / 2) + 1.1 },
  rotateY: 0,
  info: {
    name: 'The Wedding at Cana (1562)',
    author: 'Paolo Veronese',
    price: '$100m',
  },
}, {
  path: painting4,
  width: 12,
  height: 7.5,
  position: { x: 32, y: 6, z: -(config.floorHeight / 2) + 1.1 },
  rotateY: 0,
  info: {
    name: 'The Coronation of Napoleon (1807)',
    author: 'Jacques-Louis David',
    price: '$150m',
  },
}, {
  path: painting5,
  width: 12,
  height: 9.3,
  position: { x: -12, y: 6, z: (config.floorHeight / 2) - 1.1 },
  rotateY: Math.PI,
  info: {
    name: 'The Apotheosis of Homer (1827)',
    author: 'Ingres',
    price: '$250m',
  },
}, {
  path: painting6,
  width: 12,
  height: 9.22,
  position: { x: 4, y: 6, z: (config.floorHeight / 2) - 1.1 },
  rotateY: Math.PI,
  info: {
    name: 'The Fortune Teller (1594)',
    author: 'Caravaggio',
    price: '$350m',
  },
}, {
  path: painting7,
  width: 12,
  height: 8.55,
  position: { x: 20, y: 6, z: (config.floorHeight / 2) - 1.1 },
  rotateY: Math.PI,
  info: {
    name: 'Et in Arcadia ego (1665)',
    author: 'Nicolas Poussin',
    price: '$120m',
  },
}, {
  path: painting8,
  width: 12,
  height: 7.87,
  position: { x: 36, y: 6, z: (config.floorHeight / 2) - 1.1 },
  rotateY: Math.PI,
  info: {
    name: 'The Embarkation for Cythera (1717)',
    author: 'Jean-Antoine Watteau',
    price: '$550m',
  },
},
{
  path: painting9,
  width: 12,
  height: 5.34,
  position: { x: -28, y: 6, z: (config.floorHeight / 2) - 1.1 },
  rotateY: Math.PI,
  info: {
    name: 'Guernica (1937)',
    author: 'Pablo Picasso',
    price: '$200m',
  },
},
{
  path: painting10,
  width: 12,
  height: 9.01,
  position: { x: -28, y: 6, z: -(config.floorHeight / 2) + 1.1 },
  rotateY: 0,
  info: {
    name: 'The Persistence of Memory (1931)',
    author: 'Salvador Dalí',
    price: '$1500m',
  },
},
]

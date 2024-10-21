<template lang="pug">
.page
  canvas(id="mountId" width="700" height="500" class="canvas")
  q-card.info-card(:class="{'fadeIn': isDisplayImageInfo, 'fadeOut': !isDisplayImageInfo, 'expanded': isExpandedImageInfo}")
    template(v-if="selectedPainting?.info.price")
      img(:src='selectedPainting?.path')
      q-btn.close(v-if="isExpandedImageInfo" round color="primary" icon="close" @click="onCloseImageInfo")
      q-card-section
        .text-h6 {{ selectedPainting?.info.name }}
        .text-subtitle2 by {{ selectedPainting?.info.author }}
        .text-h6.q-pt-sm(v-if="!isExpandedImageInfo") Current bid {{ selectedPainting?.info.price }}
        .text-subtitle2.text-center.text-primary(v-if="!isExpandedImageInfo") Click to see more info
      q-card-section.q-pt-none(v-if="isExpandedImageInfo")
        .text-subtitle2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe, velit voluptate. Aliquam, commodi consectetur deserunt esse eveniet expedita labore maxime nihil nisi non nulla odit, quasi totam ut velit veritatis voluptatibus. Accusantium atque dignissimos, dolorum ea eius, magnam numquam placeat rem repellendus temporibus, totam vero voluptatum? Alias commodi consequuntur eveniet quidem recusandae? Assumenda earum maxime modi sit unde. Blanditiis consequatur consequuntur, debitis doloribus error explicabo, illum laboriosam laudantium nisi nulla odit provident quia veniam? Aliquid architecto asperiores atque aut cumque, doloremque, ex facilis fuga ipsa molestiae quas quasi quo repellat saepe similique ullam, velit. Facere iure laborum modi nam quam!
        .text-h5.q-py-md Current bid {{ selectedPainting?.info.price }}
        q-btn(color="primary", v-if="isExpandedImageInfo") Place bid

  .overlay(v-if="!controlsLocked && !isExpandedImageInfo" :class="{'overlay-loading': !modelsLoaded}")
    div.absolute-center(v-if="!modelsLoaded")
      q-circular-progress(indeterminate='' rounded='' size='100px' color='primary')
      .text-h6.text-white Loading...
    template(v-else)
      h3.title(@click="hideControls") Click here to start
      q-card.controls.my-card.text-white
        q-card-section
          .text-h5.q-mb-md Controls
          .text-h6 WASD: Movement
          .text-h6 Shift: Acceleration
          .text-h6 L: Toggle Light
          .text-h6 Esc: Exit
</template>

<script setup lang="ts">
import {
  type PerspectiveCamera,
  PlaneGeometry,
  type Scene,
  type WebGLRenderer,
  BoxGeometry,
  Mesh,
  DoubleSide,
  TextureLoader,
  Group,
  MirroredRepeatWrapping,
  Box3,
  Vector3,
  Clock,
  SpotLight,
  SpotLightHelper,
  MeshStandardMaterial,
  MathUtils,
  Shape,
  ExtrudeGeometry,
  LoadingManager,
  BoxHelper,
  CylinderGeometry,
  SphereGeometry,
  MeshBasicMaterial, BackSide,
} from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import skyDayTexture from 'assets/images/textures/day-sky.jpg'
import skyNightTexture from 'assets/images/textures/evening-sky.jpg'
import grassTexture from 'assets/images/textures/grass.jpg'
import floorTexture from 'assets/images/textures/woodfloor1k.jpg'
import ceilingTexture from 'assets/images/textures/rubber.jpg'
import marbleTexture from 'assets/images/textures/marble.jpg'
import wallTexture from 'assets/images/textures/wall.jpg'
import { useThree } from '~/composables/useThree'
import type { Painting } from '~/interfaces/entities/Painting'
import { paintingsData } from '~/utils/data/paintingsData'
import { config } from '~/utils/data/config'
import type { Model } from '~/interfaces/entities/Model'
import { modelsData } from '~/utils/data/modelsData'
import { lightData } from '~/utils/data/lightData'
import type { Light } from '~/interfaces/entities/Light'
import { disposeSpotLight } from '~/utils/disposeUtils'
import { columnsData } from '~/utils/data/columnsData'
import { ceilingWindowsData } from '~/utils/data/ceilingWindowsData'

let _scene: Scene
let _camera: PerspectiveCamera
let _renderer: WebGLRenderer
let _controls: PointerLockControls
let _renderLoopId: number
const { initThree, cleanUpThree, toggleTimeOfDay } = useThree()
const canvas = computed(() => document.getElementById('mountId') as HTMLCanvasElement)

const createSpotlight = (light: Light) => {
  if (light.dayTime !== config.dayTime) {
    return
  }
  const spotlight = new SpotLight(0xffffff, light.intensity)
  spotlight.position.set(light.position.x, light.position.y, light.position.z)
  spotlight.castShadow = true
  spotlight.target.position.copy(new Vector3(light.targetPosition.x, light.targetPosition.y, light.targetPosition.z))
  spotlight.angle = MathUtils.degToRad(light.angle)
  spotlight.penumbra = 0.5
  spotlight.distance = light.distance

  spotlight.shadow.mapSize.width = 1024
  spotlight.shadow.mapSize.height = 1024
  spotlight.shadow.camera.near = 0.5
  spotlight.shadow.camera.far = 50

  spotlights.push(spotlight)
  _scene.add(spotlight)
  _scene.add(spotlight.target)

  // helper for the spotlight
  // const spotlightHelper = new SpotLightHelper(spotlight);
  // _scene.add(spotlightHelper);

  return spotlight
}

let skySphere: Mesh | undefined
const renderSky = () => {
  if (skySphere) {
    _scene.remove(skySphere)
  }
  const skyGeometry = new SphereGeometry(300, 32, 32)
  const texture = config.dayTime ? new TextureLoader().load(skyDayTexture) : new TextureLoader().load(skyNightTexture)
  const skyMaterial = new MeshBasicMaterial({ map: texture, side: BackSide, color: config.dayTime ? 'transparent' : '#555555' })
  skySphere = new Mesh(skyGeometry, skyMaterial)
  _scene.add(skySphere)
  skySphere.position.set(0, -5, 0)
}

const renderFloor = () => {
  const textureFloor = new TextureLoader().load(floorTexture)
  textureFloor.wrapS = MirroredRepeatWrapping
  textureFloor.wrapT = MirroredRepeatWrapping
  textureFloor.repeat.set(4, 4)

  const floorPlane = new Mesh(new PlaneGeometry(config.floorWidth + 1, config.floorHeight + 1), new MeshStandardMaterial({
    map: textureFloor,
    side: DoubleSide,
    roughness: 0.3,
  }))
  floorPlane.rotateX(Math.PI / 2)
  floorPlane.position.set(0, -1, 0)
  floorPlane.receiveShadow = true

  _scene.add(floorPlane)
}

const renderOutdoor = () => {
  const textureOutdoorFloor = new TextureLoader().load(grassTexture)
  textureOutdoorFloor.wrapS = MirroredRepeatWrapping
  textureOutdoorFloor.wrapT = MirroredRepeatWrapping
  textureOutdoorFloor.repeat.set(12, 12)

  const outdoorPlane = new Mesh(new PlaneGeometry(400, 400), new MeshStandardMaterial({
    map: textureOutdoorFloor,
    side: DoubleSide,
  }))
  outdoorPlane.rotateX(MathUtils.degToRad(90))
  outdoorPlane.position.set(240, -1.8, 0)
  outdoorPlane.receiveShadow = true

  _scene.add(outdoorPlane)
}

const renderCeiling = () => {
  const textureCeiling = new TextureLoader().load(ceilingTexture)
  textureCeiling.wrapS = MirroredRepeatWrapping
  textureCeiling.wrapT = MirroredRepeatWrapping
  textureCeiling.repeat.set(32, 32)

  const ceilingShape = new Shape()
  ceilingShape.moveTo(0, 0)
  ceilingShape.lineTo(0, config.floorHeight)
  ceilingShape.lineTo(config.floorWidth, config.floorHeight)
  ceilingShape.lineTo(config.floorWidth, 0)
  ceilingShape.lineTo(0, 0)

  ceilingWindowsData.forEach((w) => {
    const windowShapeOne = new Shape()
    const startAngle = 0
    const endAngle = Math.PI * 2
    windowShapeOne.absarc(w.x, w.y, w.radius, startAngle, endAngle, false)

    ceilingShape.holes.push(windowShapeOne)
  })

  const ceilingGeometry = new ExtrudeGeometry(ceilingShape, {})
  const ceilingMesh = new Mesh(ceilingGeometry, new MeshStandardMaterial({ map: textureCeiling }))

  ceilingMesh.rotateX(Math.PI / 2)
  ceilingMesh.position.set(-(config.floorWidth / 2), 22, -(config.floorHeight / 2))

  ceilingMesh.castShadow = true
  ceilingMesh.receiveShadow = true

  _scene.add(ceilingMesh)
}

const wallsGroup = new Group()
const renderWalls = () => {
  _scene.add(wallsGroup)

  const textureWall = new TextureLoader().load(wallTexture)
  textureWall.wrapS = MirroredRepeatWrapping
  textureWall.wrapT = MirroredRepeatWrapping
  textureWall.repeat.set(6, 4)
  const material = new MeshStandardMaterial({ map: textureWall })

  const frontWall = new Mesh(new BoxGeometry(config.floorWidth, 24, 2), material)
  frontWall.position.set(0, 10, -(config.floorHeight / 2))
  frontWall.castShadow = true
  frontWall.receiveShadow = true

  const backWall = new Mesh(new BoxGeometry(config.floorWidth, 24, 2), material)
  backWall.position.set(0, 10, (config.floorHeight / 2))
  backWall.castShadow = true
  backWall.receiveShadow = true

  const leftWall = new Mesh(new BoxGeometry(config.floorHeight, 24, 2), material)
  leftWall.position.set(-(config.floorWidth / 2), 10, 0)
  leftWall.rotateY(Math.PI / 2)
  leftWall.castShadow = true
  leftWall.receiveShadow = true

  const rightWallShape = new Shape()
  rightWallShape.moveTo(-2, -2)
  rightWallShape.lineTo(64, -2)
  rightWallShape.lineTo(64, 23)
  rightWallShape.lineTo(-2, 23)
  rightWallShape.lineTo(-2, -2)

  const windowShapeOne = new Shape()
  windowShapeOne.moveTo(5, 2)
  windowShapeOne.lineTo(18, 2)
  windowShapeOne.lineTo(18, 18)
  windowShapeOne.lineTo(7, 18)
  windowShapeOne.lineTo(7, 2)

  const windowShapeTwo = new Shape()
  windowShapeTwo.moveTo(40, 2)
  windowShapeTwo.lineTo(53, 2)
  windowShapeTwo.lineTo(53, 18)
  windowShapeTwo.lineTo(42, 18)
  windowShapeTwo.lineTo(42, 2)

  const doorShape = new Shape()
  doorShape.moveTo(27, -2)
  doorShape.lineTo(34, -2)
  doorShape.lineTo(34, 11)
  doorShape.lineTo(27, 11)
  doorShape.lineTo(27, -2)

  rightWallShape.holes.push(windowShapeOne)
  rightWallShape.holes.push(windowShapeTwo)
  rightWallShape.holes.push(doorShape)

  const rightWallGeometry = new ExtrudeGeometry(rightWallShape, {})

  const rightWall = new Mesh(rightWallGeometry, material)
  rightWall.position.set((config.floorWidth / 2), 0, 30)
  rightWall.rotateY(Math.PI / 2)
  rightWall.castShadow = true
  rightWall.receiveShadow = true

  wallsGroup.add(frontWall, backWall, rightWall, leftWall)

  wallsGroup.children.forEach((wall) => {
    wall.BBox = new Box3()
    wall.BBox.setFromObject(wall)
  })
}

const columnsGroup = new Group()
const renderColumns = () => {
  _scene.add(columnsGroup)
  const textureColumn = new TextureLoader().load(marbleTexture)
  textureColumn.wrapS = MirroredRepeatWrapping
  textureColumn.wrapT = MirroredRepeatWrapping
  textureColumn.repeat.set(5, 5)
  const material = new MeshStandardMaterial({ map: textureColumn, roughness: 0.5 })
  const geometry = new CylinderGeometry(2, 2, 24, 32)
  columnsData.forEach((c) => {
    const column = new Mesh(geometry, material)
    column.position.set(c.position.x, c.position.y, c.position.z)
    column.castShadow = true
    column.receiveShadow = true
    _scene.add(column)
    columnsGroup.add(column)
  })
  columnsGroup.children.forEach((c) => {
    c.BBox = new Box3()
    c.BBox.setFromObject(c)
  })
}

const renderImage = (painting: Painting) => {
  const texture = new TextureLoader().load(painting.path)
  const material = new MeshStandardMaterial({ map: texture })
  const geometry = new PlaneGeometry(painting.width, painting.height)
  const image = new Mesh(geometry, material)
  image.position.set(painting.position.x, painting.position.y, painting.position.z)
  if (painting.rotateY) {
    image.rotateY(painting.rotateY)
  }
  image.castShadow = true
  image.receiveShadow = true

  return image
}
const renderImages = () => {
  paintingsData.forEach(painting => _scene.add(renderImage(painting)))
}

let spotlights = [] as SpotLight[]
const renderLights = () => {
  spotlights = []
  lightData.forEach(light => createSpotlight(light))
}

const startControls = () => {
  _controls.lock()
}
const hideControls = () => {
  document.addEventListener('click', startControls)
}
const showControls = () => {
  document.removeEventListener('click', startControls)
}
const setControls = () => {
  _controls = new PointerLockControls(_camera, document.body)
  _controls.addEventListener('lock', onControlsLock)
  _controls.addEventListener('unlock', onControlsUnlock)
}
const controlsLocked = ref(false)
const onControlsLock = () => {
  controlsLocked.value = true
}
const onControlsUnlock = () => {
  controlsLocked.value = false
  showControls()
}

const setupScene = () => {
  const { scene, camera, renderer } = initThree('mountId')
  _scene = scene
  _camera = camera
  _renderer = renderer
  _controls = new PointerLockControls(_camera, document.body)

  renderWalls()
  renderFloor()
  renderOutdoor()
  renderCeiling()
  renderColumns()
  renderImages()
  load3dModels()
  renderLights()
  renderSky()

  setControls()
  _renderLoopId = requestAnimationFrame(renderLoop)
}

const keysPressed = {
  ArrowRight: false,
  KeyD: false,
  ArrowLeft: false,
  KeyA: false,
  ArrowUp: false,
  KeyW: false,
  ArrowDown: false,
  KeyS: false,
  Space: false,
  ShiftLeft: false,
} as { [key: string]: boolean }
const onKeyDown = (event: KeyboardEvent) => {
  if (controlsLocked.value && event.code in keysPressed) {
    keysPressed[event.code] = true
  }
}
const onKeyUp = (event: KeyboardEvent) => {
  if (controlsLocked.value && event.code in keysPressed) {
    keysPressed[event.code] = false
  }
  if (event.code === 'KeyL') {
    toggleDay()
  }
}

const clock = new Clock()
const checkCollision = (): boolean => {
  const boundingBox = new Box3()
  const worldPosition = new Vector3()
  _camera.getWorldPosition(worldPosition)
  boundingBox.setFromCenterAndSize(
    worldPosition,
    new Vector3(1, 1, 1),
  )
  return !!wallsGroup.children.filter(wall => boundingBox.intersectsBox(wall.BBox)).length || !!columnsGroup.children.filter(c => boundingBox.intersectsBox(c.BBox)).length
}
const checkCollisionForModels = (): boolean => {
  return models.some((m) => {
    if (!m.boundingBox || !m.scene) {
      return false
    }
    m.boundingBox.setFromObject(m.scene)
    const boundingBox = new Box3()
    const worldPosition = new Vector3()
    _camera.getWorldPosition(worldPosition)
    boundingBox.setFromCenterAndSize(
      worldPosition,
      new Vector3(1, 10, 1),
    )
    return boundingBox.intersectsBox(m.boundingBox)
  })
}
const updateMovement = (delta: number) => {
  let speed = config.movingSpeed * delta
  const prevPosition = _camera.position.clone()
  if (keysPressed.ShiftLeft) {
    speed = (config.movingSpeed * 2) * delta
  }
  if (keysPressed.ArrowRight || keysPressed.KeyD) {
    _controls.moveRight(speed)
  }
  if (keysPressed.ArrowLeft || keysPressed.KeyA) {
    _controls.moveRight(-speed)
  }
  if (keysPressed.ArrowUp || keysPressed.KeyW) {
    _controls.moveForward(speed)
  }
  if (keysPressed.ArrowDown || keysPressed.KeyS) {
    _controls.moveForward(-speed)
  }
  if (checkCollisionForModels() || checkCollision()) {
    _camera.position.copy(prevPosition)
  }
}

const toggleDay = () => {
  config.dayTime = !config.dayTime
  disposeSpotLight(_scene, spotlights)
  renderLights()
  renderSky()
  toggleTimeOfDay()
}

const isExpandedImageInfo = ref<boolean>(false)
const onExpandImageInfo = () => {
  isExpandedImageInfo.value = true
  document.removeEventListener('click', onExpandImageInfo)
  _controls.unlock()
}
const onCloseImageInfo = () => {
  isExpandedImageInfo.value = false
  _controls.lock()
}

const isDisplayImageInfo = ref(false)
const displayImageInfo = () => {
  if (!isDisplayImageInfo.value) {
    document.addEventListener('click', onExpandImageInfo)
  }
  isDisplayImageInfo.value = true
}
const hideImageInfo = () => {
  if (isDisplayImageInfo.value) {
    document.removeEventListener('click', onExpandImageInfo)
  }
  isDisplayImageInfo.value = false
  isExpandedImageInfo.value = false
}

const selectedPainting = ref<Painting | null>(null)
const renderLoop = () => {
  let isSelectedPainting = false
  paintingsData.forEach((painting) => {
    const distanceAllowed = 8
    const distanceToPainting = _camera.position.distanceTo(painting.position)
    if (distanceToPainting < distanceAllowed) {
      selectedPainting.value = painting
      isSelectedPainting = true
    }
  })
  isSelectedPainting ? displayImageInfo() : hideImageInfo()
  updateMovement(clock.getDelta())
  _renderer.render(_scene, _camera)
  _renderLoopId = requestAnimationFrame(renderLoop)
}

const render3dModel = (model: Model, gltfScene: GLTF) => {
  model.scene = gltfScene
  gltfScene.castShadow = model.castShadow
  gltfScene.receiveShadow = model.receiveShadow
  gltfScene.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = model.castShadow
      node.receiveShadow = model.receiveShadow
    }
  })
  gltfScene.scale.set(model.scale.x, model.scale.y, model.scale.z)
  gltfScene.position.set(model.position.x, model.position.y, model.position.z)
  if (model.rotateX) {
    gltfScene.rotateX(MathUtils.degToRad(model.rotateX))
  }
  if (model.rotateY) {
    gltfScene.rotateY(MathUtils.degToRad(model.rotateY))
  }
  if (model.rotateZ) {
    gltfScene.rotateZ(MathUtils.degToRad(model.rotateZ))
  }
  model.boundingBox = new Box3().setFromObject(gltfScene)
  models.push(model)
  _scene.add(gltfScene)

  // helper
  // const boxHelper = new BoxHelper(gltfScene, 0xffff00);
  // _scene.add(boxHelper);
}

const models = [] as Model[]
const groupedModels: Model[][] = Object.values(modelsData.reduce((acc: { [group: string]: Model[] }, item: Model) => {
  if (!acc[item.group]) {
    acc[item.group] = []
  }
  acc[item.group].push(item)
  return acc
}, {} as { [key: string]: Model[] }))
const loader = new GLTFLoader()

const modelsLoaded = ref<boolean>(false)
const loadingManager = new LoadingManager()
loadingManager.onLoad = function () {
  modelsLoaded.value = true
}

const dracoLoader = new DRACOLoader(loadingManager)
dracoLoader.setDecoderPath('/assets/libs/draco/')
dracoLoader.preload()
loader.setDRACOLoader(dracoLoader)

const load3dModels = () => {
  groupedModels.forEach((modelsArray) => {
    loader.load(modelsArray[0].path, (gltf) => {
      modelsArray.forEach((m) => {
        render3dModel(m, gltf.scene.clone())
      })
    })
  })
}

onMounted(() => {
  if (canvas.value) {
    setupScene()
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)
  }
})
onBeforeUnmount(() => {
  cancelAnimationFrame(_renderLoopId)
  cleanUpThree(_scene, _renderer)
  disposeSpotLight(_scene, spotlights)
  document.removeEventListener('click', startControls)
  _controls.removeEventListener('lock', onControlsLock)
  _controls.removeEventListener('unlock', onControlsUnlock)
  document.removeEventListener('keydown', onKeyDown)
  document.removeEventListener('keyup', onKeyUp)
})
</script>

<style lang="scss" scoped>
.page {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.overlay,
.canvas {
  width: 100vw;
  height: 100vh;
  position: absolute;
  inset: 0;
  margin: auto;
}

.overlay {
  background-color: rgb(0, 0, 0, .6);
  z-index: 2;
  &.overlay-loading {
    background-color: #000000;
  }
}

.title {
  position: absolute;
  text-align: center;
  color: #fff;
  font-weight: 500;
  height: fit-content;
  margin: 0;
  width: auto;
  left: 0;
  right: 0;
  top: 40%;
  cursor: pointer;
  text-shadow:
      -1px -1px 0 #000,
      1px -1px 0 #000,
      -1px  1px 0 #000,
      1px  1px 0 #000;
}

.info-card {
  position: fixed;
  right: 10px;
  width: 350px;
  transition: .3s ease-in;

  &.fadeIn {
    top: 10px;
    opacity: 0.8;
    animation: cardFadeIn 0.3s ease-in;
  }

  &.fadeOut {
    top: 0;
    opacity: 0;
    animation: cardFadeOut 0.3s ease-out;
  }

  &.expanded {
    width: 50%;
    right: 25%;
    max-height: 90vh;
    top: 5vh;
    overflow: scroll;
    opacity: 1;
    padding: 12px;
    text-align: center;

    img {
      width: 50%;
      margin: 0 auto;
    }

    .close {
      position: absolute;
      top: 12px;
      right: 12px;
    }
  }
}

.controls {
  background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);
  position: absolute;
  right: 16px;
  top: 16px;
  padding: 4px;
  color: white;
  text-shadow:
      -1px -1px 0 #000,
      1px -1px 0 #000,
      -1px  1px 0 #000,
      1px  1px 0 #000;
}

@keyframes cardFadeIn {
  0% {
    top: 0;
    opacity: 0;
  }
  100% {
    top: 10px;
    opacity: 0.8;
  }
}

@keyframes cardFadeOut {
  0% {
    top: 10px;
    opacity: 0.8;
  }
  100% {
    top: 0;
    opacity: 0;
  }
}
</style>

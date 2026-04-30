import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export function createRoom(scene, world) {
  // Dimensions (1 unit = 10cm)
  const rectW = 30 // 300cm
  const rectL = 45 // 450cm
  const sqS = 20   // 200cm
  const wallHeight = 20
  const wallThickness = 0.5

  // Texture Loader
  const textureLoader = new THREE.TextureLoader()

  // Floor Texture
  const floorTexture = textureLoader.load('/models/floor_texture.jpg')
  floorTexture.wrapS = THREE.RepeatWrapping
  floorTexture.wrapT = THREE.RepeatWrapping
  floorTexture.repeat.set(4, 6)

  // Wall Texture
  const wallTexture = textureLoader.load('/models/wall_texture.jpg')
  wallTexture.wrapS = THREE.RepeatWrapping
  wallTexture.wrapT = THREE.RepeatWrapping

  // Materials
  const groundMaterial = new THREE.MeshStandardMaterial({
    map: floorTexture,
    roughness: 0.8,
    metalness: 0.1
  })

  const wallMaterial = new THREE.MeshStandardMaterial({
    map: wallTexture,
    roughness: 0.9,
    metalness: 0.05
  })

  const ceilingMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5deb3,
    roughness: 1
  })

  // Lights
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x666666, 0.9)
  hemiLight.position.set(0, 50, 0)
  scene.add(hemiLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(20, 30, 20)
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.width = 2048
  directionalLight.shadow.mapSize.height = 2048
  directionalLight.shadow.camera.far = 100
  directionalLight.shadow.camera.left = -50
  directionalLight.shadow.camera.right = 50
  directionalLight.shadow.camera.top = 50
  directionalLight.shadow.camera.bottom = -50
  scene.add(directionalLight)

  const pointLight = new THREE.PointLight(0xfff8d5, 0.4, 100)
  pointLight.position.set(0, 15, 0)
  scene.add(pointLight)

  // Floor Meshes - Square aligned with the left side of the rectangle
  const rectFloor = new THREE.Mesh(new THREE.PlaneGeometry(rectW, rectL), groundMaterial)
  rectFloor.rotation.x = -Math.PI / 2
  rectFloor.receiveShadow = true
  scene.add(rectFloor)

  const sqFloor = new THREE.Mesh(new THREE.PlaneGeometry(sqS, sqS), groundMaterial)
  sqFloor.rotation.x = -Math.PI / 2
  // Center is offset to align left: Rect left is -15, Sq left is -15. 
  // Sq center is -15 + sqS/2 = -15 + 10 = -5.
  sqFloor.position.set(-5, 0, rectL / 2 + sqS / 2)
  sqFloor.receiveShadow = true
  scene.add(sqFloor)

  // Physics Ground
  const groundBody = new CANNON.Body({ mass: 0 })
  const rectShape = new CANNON.Box(new CANNON.Vec3(rectW / 2, 0.1, rectL / 2))
  groundBody.addShape(rectShape, new CANNON.Vec3(0, -0.1, 0))
  const sqShape = new CANNON.Box(new CANNON.Vec3(sqS / 2, 0.1, sqS / 2))
  groundBody.addShape(sqShape, new CANNON.Vec3(-5, -0.1, rectL / 2 + sqS / 2))
  world.addBody(groundBody)

  // Walls Groups for visibility logic in App.vue
  const backWall = new THREE.Group()
  const frontWall = new THREE.Group()
  const leftWall = new THREE.Group()
  const rightWall = new THREE.Group()
  scene.add(backWall, frontWall, leftWall, rightWall)

  const createWall = (width, height, depth, x, y, z, group) => {
    const geometry = new THREE.BoxGeometry(width, height, depth)
    const mesh = new THREE.Mesh(geometry, wallMaterial)
    mesh.position.set(x, y, z)
    mesh.receiveShadow = true
    group.add(mesh)

    const shape = new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2))
    const body = new CANNON.Body({ mass: 0 })
    body.addShape(shape)
    body.position.set(x, y, z)
    world.addBody(body)
    return mesh
  }

  // 1. Back Wall (Rectangle back side)
  createWall(rectW, wallHeight, wallThickness, 0, wallHeight / 2, -rectL / 2, backWall)

  // 2. Left Walls (Continuous from rectangle to square)
  createWall(wallThickness, wallHeight, rectL + sqS, -rectW / 2, wallHeight / 2, sqS / 2, leftWall)

  // 3. Right Walls
  // Rectangle right side
  const rectRightWall = new THREE.Group()
  scene.add(rectRightWall)
  createWall(wallThickness, wallHeight, rectL, rectW / 2, wallHeight / 2, 0, rectRightWall)

  // Square right side (offset)
  const sqRightWall = new THREE.Group()
  scene.add(sqRightWall)
  createWall(wallThickness, wallHeight, sqS, 5, wallHeight / 2, rectL / 2 + sqS / 2, sqRightWall)

  // 4. Front Walls
  // Rectangle front side connecting piece
  const rectFrontWall = new THREE.Group()
  scene.add(rectFrontWall)
  const connectWidth = rectW - sqS // 30 - 20 = 10
  createWall(connectWidth, wallHeight, wallThickness, rectW / 2 - connectWidth / 2, wallHeight / 2, rectL / 2, rectFrontWall)

  // Square front side
  const sqFrontWall = new THREE.Group()
  scene.add(sqFrontWall)
  createWall(sqS, wallHeight, wallThickness, -5, wallHeight / 2, rectL / 2 + sqS, sqFrontWall)

  // Ceiling Meshes
  const ceilingRect = new THREE.Mesh(new THREE.PlaneGeometry(rectW, rectL), ceilingMaterial)
  ceilingRect.rotation.x = Math.PI / 2
  ceilingRect.position.y = wallHeight
  ceilingRect.receiveShadow = true
  scene.add(ceilingRect)

  const ceilingSq = new THREE.Mesh(new THREE.PlaneGeometry(sqS, sqS), ceilingMaterial)
  ceilingSq.rotation.x = Math.PI / 2
  ceilingSq.position.set(-5, wallHeight, rectL / 2 + sqS / 2)
  ceilingSq.receiveShadow = true
  scene.add(ceilingSq)

  return {
    backWall,
    leftWall,
    rectRightWall,
    sqRightWall,
    rectFrontWall,
    sqFrontWall
  }
}

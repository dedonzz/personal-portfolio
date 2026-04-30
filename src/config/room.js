import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export function createRoom(scene, world) {
  const wallBoxes = []
  let backWall = null
  let frontWall = null
  let leftWall = null
  let rightWall = null

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

  // Room floor
  const groundSize = 30
  const groundGeometry = new THREE.PlaneGeometry(groundSize, groundSize)
  const groundMaterial = new THREE.MeshLambertMaterial({ color: 0xd2b48c })
  const ground = new THREE.Mesh(groundGeometry, groundMaterial)
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  scene.add(ground)

  // Cannon Ground
  const groundShape = new CANNON.Plane()
  const groundBody = new CANNON.Body({ mass: 0 })
  groundBody.addShape(groundShape)
  groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
  world.addBody(groundBody)

  const gridHelper = new THREE.GridHelper(groundSize, 30, 0xffffff, 0xffffff)
  gridHelper.material.opacity = 0.2
  gridHelper.material.transparent = true
  scene.add(gridHelper)

  // Room walls - enclosed room
  const wallHeight = 20
  const roomSize = 30
  const wallThickness = 0.5
  const wallMaterial = new THREE.MeshPhongMaterial({ color: 0xd4a574 })

  const createWall = (width, height, depth, x, y, z) => {
    const geometry = new THREE.BoxGeometry(width, height, depth)
    const mesh = new THREE.Mesh(geometry, wallMaterial)
    mesh.position.set(x, y, z)
    mesh.receiveShadow = true
    scene.add(mesh)

    // Cannon wall
    const shape = new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2))
    const body = new CANNON.Body({ mass: 0 })
    body.addShape(shape)
    body.position.set(x, y, z)
    world.addBody(body)

    return mesh
  }

  // Back wall
  backWall = createWall(roomSize, wallHeight, wallThickness, 0, wallHeight / 2, -roomSize / 2)
  // Front wall
  frontWall = createWall(roomSize, wallHeight, wallThickness, 0, wallHeight / 2, roomSize / 2)
  // Left wall
  leftWall = createWall(wallThickness, wallHeight, roomSize, -roomSize / 2, wallHeight / 2, 0)
  // Right wall
  rightWall = createWall(wallThickness, wallHeight, roomSize, roomSize / 2, wallHeight / 2, 0)

  // Ceiling
  const ceilingGeometry = new THREE.PlaneGeometry(30, 30)
  const ceilingMaterial = new THREE.MeshPhongMaterial({ color: 0xf5deb3 })
  const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial)
  ceiling.rotation.x = Math.PI / 2
  ceiling.position.y = wallHeight
  ceiling.receiveShadow = true
  scene.add(ceiling)

  return {
    backWall,
    frontWall,
    leftWall,
    rightWall
  }
}

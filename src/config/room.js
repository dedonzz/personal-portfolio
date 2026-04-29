import * as THREE from 'three'

export function createRoom(scene) {
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

  // Ground plane
  const groundGeometry = new THREE.PlaneGeometry(30, 30)
  const groundMaterial = new THREE.MeshLambertMaterial({ color: 0xd2b48c })
  const ground = new THREE.Mesh(groundGeometry, groundMaterial)
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  scene.add(ground)

  const gridHelper = new THREE.GridHelper(30, 20, 0xffffff, 0xffffff)
  gridHelper.material.opacity = 0.2
  gridHelper.material.transparent = true
  scene.add(gridHelper)

  // Room walls - enclosed room
  const wallHeight = 20
  const roomSize = 30
  const wallThickness = 0.1
  const wallMaterial = new THREE.MeshPhongMaterial({ color: 0xd4a574 })

  const createWallCollider = (mesh) => {
    wallBoxes.push(new THREE.Box3().setFromObject(mesh))
  }

  // Back wall
  const backWallGeometry = new THREE.BoxGeometry(roomSize, wallHeight, wallThickness)
  backWall = new THREE.Mesh(backWallGeometry, wallMaterial)
  backWall.position.set(0, wallHeight / 2, -roomSize / 2)
  backWall.receiveShadow = true
  scene.add(backWall)
  createWallCollider(backWall)

  // Front wall
  frontWall = new THREE.Mesh(backWallGeometry, wallMaterial)
  frontWall.position.set(0, wallHeight / 2, roomSize / 2)
  frontWall.receiveShadow = true
  scene.add(frontWall)
  createWallCollider(frontWall)

  // Left wall
  const sideWallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, roomSize)
  leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial)
  leftWall.position.set(-roomSize / 2, wallHeight / 2, 0)
  leftWall.receiveShadow = true
  scene.add(leftWall)
  createWallCollider(leftWall)

  // Right wall
  rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial)
  rightWall.position.set(roomSize / 2, wallHeight / 2, 0)
  rightWall.receiveShadow = true
  scene.add(rightWall)
  createWallCollider(rightWall)

  // Ceiling
  const ceilingGeometry = new THREE.PlaneGeometry(30, 30)
  const ceilingMaterial = new THREE.MeshPhongMaterial({ color: 0xf5deb3 })
  const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial)
  ceiling.rotation.x = Math.PI / 2
  ceiling.position.y = wallHeight
  ceiling.receiveShadow = true
  scene.add(ceiling)

  // Ceiling light fixtures
  const lightFixture = new THREE.SphereGeometry(0.5, 8, 8)
  const lightMaterial = new THREE.MeshPhongMaterial({ color: 0xffff99, emissive: 0xffff99 })
  for (let i = -15; i <= 15; i += 15) {
    for (let j = -15; j <= 15; j += 15) {
      const fixture = new THREE.Mesh(lightFixture, lightMaterial)
      fixture.position.set(i, wallHeight - 0.5, j)
      scene.add(fixture)
    }
  }

  return {
    wallBoxes,
    backWall,
    frontWall,
    leftWall,
    rightWall
  }
}

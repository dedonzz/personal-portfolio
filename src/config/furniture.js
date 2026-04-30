import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export function createFurniture(scene, world) {
  const furnitureItems = []

  const addFurnitureItem = (width, height, depth, x, y, z, color, name, description, link = '') => {
    const geometry = new THREE.BoxGeometry(width, height, depth)
    const material = new THREE.MeshPhongMaterial({ color, shininess: 20 })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(x, y, z)
    mesh.castShadow = true
    mesh.receiveShadow = true
    scene.add(mesh)

    // Cannon body
    const shape = new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2))
    const body = new CANNON.Body({ mass: 0 })
    body.addShape(shape)
    body.position.set(x, y, z)
    world.addBody(body)

    furnitureItems.push({ mesh, body, name, description, link })
  }

  const addPushableCone = (x, y, z, color, name, description) => {
    const coneGroup = new THREE.Group()

    // Main cone body
    const coneGeometry = new THREE.ConeGeometry(0.3, 0.7, 16)
    const coneMaterial = new THREE.MeshPhongMaterial({ color: 0xffa500, shininess: 30 })
    const coneMesh = new THREE.Mesh(coneGeometry, coneMaterial)
    coneMesh.castShadow = true
    coneMesh.receiveShadow = true
    coneGroup.add(coneMesh)

    // White stripe at the base
    const stripeGeometry = new THREE.CylinderGeometry(0.31, 0.31, 0.05, 16)
    const stripeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 30 })
    const stripeMesh = new THREE.Mesh(stripeGeometry, stripeMaterial)
    stripeMesh.position.y = -0.325
    stripeMesh.castShadow = true
    stripeMesh.receiveShadow = true
    coneGroup.add(stripeMesh)

    coneGroup.position.set(x, y + 0.35, z)
    scene.add(coneGroup)

    const coneShape = new CANNON.Cylinder(0.3, 0.1, 0.7, 16)
    const coneBody = new CANNON.Body({ mass: 5, material: new CANNON.Material({ friction: 0.4, restitution: 0.1 }) })
    coneBody.addShape(coneShape)
    coneBody.position.set(x, y + 0.35, z)
    coneBody.linearDamping = 0.4
    coneBody.angularDamping = 0.4
    world.addBody(coneBody)

    furnitureItems.push({ mesh: coneGroup, body: coneBody, name, description, link: '' })
  }

  // Furniture Item 1 - Box
  addFurnitureItem(6, 1.5, 3, -10, 0.75, -5, 0x8b5a2b, 'Furniture 1', 'A rectangular box for decoration.')

  // Furniture Item 2 - Box
  addFurnitureItem(5, 2, 2, 10, 1, -8, 0xa0522d, 'Furniture 2', 'Another rectangular box for the space.')

  // Furniture Item 3 - Box (McQueen Exhibit)
  addFurnitureItem(3, 2.5, 1.5, 8, 1.25, 10, 0xffd700, 'McQueen Exhibit', 'Discover Lightning McQueen, the legendary racecar from Radiator Springs.', 'https://en.wikipedia.org/wiki/Cars_(film)')

  addPushableCone(-5, 0.25, 8, 0xffa500, 'Traffic Cone', 'A realistic traffic cone the main vehicle can bump and push around.')

  return {
    furnitureItems
  }
}

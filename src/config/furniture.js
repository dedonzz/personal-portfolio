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

    furnitureItems.push({ mesh, name, description, link })
  }

  // Furniture Item 1 - Box
  addFurnitureItem(6, 1.5, 3, -10, 0.75, -5, 0x8b5a2b, 'Furniture 1', 'A rectangular box for decoration.')

  // Furniture Item 2 - Box
  addFurnitureItem(5, 2, 2, 10, 1, -8, 0xa0522d, 'Furniture 2', 'Another rectangular box for the space.')

  // Furniture Item 3 - Box (McQueen Exhibit)
  addFurnitureItem(3, 2.5, 1.5, 8, 1.25, 10, 0xffd700, 'McQueen Exhibit', 'Discover Lightning McQueen, the legendary racecar from Radiator Springs.', 'https://en.wikipedia.org/wiki/Cars_(film)')

  return {
    furnitureItems
  }
}

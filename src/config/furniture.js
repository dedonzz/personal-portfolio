import * as THREE from 'three'

export function createFurniture(scene) {
  const furnitureItems = []

  const addFurnitureItem = (mesh, name, description, link = '') => {
    const box = new THREE.Box3().setFromObject(mesh)
    furnitureItems.push({ mesh, box, name, description, link })
  }

  // Furniture Item 1 - Box
  const box1Material = new THREE.MeshPhongMaterial({ color: 0x8b5a2b, shininess: 20 })
  const box1 = new THREE.Mesh(new THREE.BoxGeometry(6, 1.5, 3), box1Material)
  box1.position.set(-10, 0.75, -5)
  box1.castShadow = true
  box1.receiveShadow = true
  scene.add(box1)
  addFurnitureItem(box1, 'Furniture 1', 'A rectangular box for decoration.')

  // Furniture Item 2 - Box
  const box2Material = new THREE.MeshPhongMaterial({ color: 0xa0522d, shininess: 10 })
  const box2 = new THREE.Mesh(new THREE.BoxGeometry(5, 2, 2), box2Material)
  box2.position.set(10, 1, -8)
  box2.castShadow = true
  box2.receiveShadow = true
  scene.add(box2)
  addFurnitureItem(box2, 'Furniture 2', 'Another rectangular box for the space.')

  // Furniture Item 3 - Box (McQueen Exhibit)
  const box3Material = new THREE.MeshPhongMaterial({ color: 0xffd700, shininess: 30 })
  const box3 = new THREE.Mesh(new THREE.BoxGeometry(3, 2.5, 1.5), box3Material)
  box3.position.set(8, 1.25, 10)
  box3.castShadow = true
  box3.receiveShadow = true
  scene.add(box3)
  addFurnitureItem(box3, 'McQueen Exhibit', 'Discover Lightning McQueen, the legendary racecar from Radiator Springs.', 'https://en.wikipedia.org/wiki/Cars_(film)')

  return {
    furnitureItems,
    updateFurnitureBoxes: () => {
      furnitureItems.forEach((item) => item.box.setFromObject(item.mesh))
    }
  }
}

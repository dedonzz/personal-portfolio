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
    const coneGeometry = new THREE.ConeGeometry(0.3, 0.7, 6)
    const coneMaterial = new THREE.MeshPhongMaterial({ color: 0xffa500, shininess: 30 })
    const coneMesh = new THREE.Mesh(coneGeometry, coneMaterial)
    coneMesh.castShadow = true
    coneMesh.receiveShadow = true
    coneGroup.add(coneMesh)

    // White stripe at the base
    const stripeGeometry = new THREE.CylinderGeometry(0.31, 0.31, 0.05, 6)
    const stripeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 30 })
    const stripeMesh = new THREE.Mesh(stripeGeometry, stripeMaterial)
    stripeMesh.position.y = -0.325
    stripeMesh.castShadow = true
    stripeMesh.receiveShadow = true
    coneGroup.add(stripeMesh)

    coneGroup.position.set(x, y + 0.35, z)
    scene.add(coneGroup)

    const coneShape = new CANNON.Cylinder(0.3, 0.1, 0.7, 6)
    const coneBody = new CANNON.Body({ mass: 5, material: new CANNON.Material({ friction: 0.4, restitution: 0.1 }) })
    coneBody.addShape(coneShape)
    coneBody.position.set(x, y + 0.35, z)
    coneBody.linearDamping = 0.4
    coneBody.angularDamping = 0.4
    world.addBody(coneBody)

    furnitureItems.push({ mesh: coneGroup, body: coneBody, name, description, link: '' })
  }


  // Furniture (w, h, l, x-axis, z-axis, y-axis, color)
  // Bed - 100cm x 20cm x 200cm
  addFurnitureItem(10, 2, 20, -10, 1, -12, 0x8b5a2b, 'About Me', 'Consultant in Deloitte’s Engineering, AI & Data team. Providing consulting services in software development, data engineering, analytics, and project management, with hands-on experience in both front-end and back-end development, system analysis, and leading tech projects. Google Cloud Certified Professional Data Engineer.\n\nI am passionate about solving complex problems through data-driven approaches. I am also a marathon enthusiast.')

  // Desk - 50cm x 50cm x 100cm
  addFurnitureItem(5, 5, 10, 12.5, 2.5, -8, 0x0077ff, 'Work Experiences', '1. <a href="https://en.wikipedia.org/wiki/Taeyang" target="_blank" rel="noopener">OMG</a>\n\n2. <a href="https://en.wikipedia.org/wiki/T.O.P" target="_blank" rel="noopener">DAMN</a>\n\n3. <a href="https://en.wikipedia.org/wiki/G-Dragon" target="_blank" rel="noopener">LYCK</a>')

  // Wardrobe - 30cm x 25cm x 15cm
  addFurnitureItem(3, 2.5, 1.5, 8, 1.25, 10, 0xffd700, 'McQueen Exhibit', 'Discover Lightning McQueen, the legendary racecar from Radiator Springs.', 'https://en.wikipedia.org/wiki/Cars_(film)')


  // 6 Cones before the ramp (slalom)
  for (let i = 0; i < 6; i++) {
    const row = Math.floor(i / 2)
    const col = i % 2
    addPushableCone(-2 + col * 4, 0.25, -12 + row * 3, 0xffa500, `Cone ${i + 1}`, 'Part of the jump challenge.')
  }

  return {
    furnitureItems
  }
}

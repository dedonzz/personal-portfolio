import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const gltfLoader = new GLTFLoader()

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

  const addFurnitureModel = (src, x, y, z, scale, name, description, link = '', rotationY = 0, hitbox = null) => {
    const rotationRad = THREE.MathUtils.degToRad(rotationY)
    const group = new THREE.Group()
    group.position.set(x, y, z)
    group.rotation.y = rotationRad
    scene.add(group)

    const placeholder = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x888888, opacity: 0.4, transparent: true })
    )
    placeholder.visible = false
    group.add(placeholder)

    const createBody = (size, offsetY) => {
      const body = new CANNON.Body({ mass: 0 })
      body.addShape(new CANNON.Box(new CANNON.Vec3(size.x / 2, size.y / 2, size.z / 2)))
      body.position.set(x, y + offsetY, z)
      body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), rotationRad)
      world.addBody(body)
      return body
    }

    const defaultSize = new THREE.Vector3(1.4 * scale, 1.4 * scale, 1.4 * scale)
    const defaultOffsetY = defaultSize.y / 2
    let body = hitbox && hitbox.size
      ? createBody(new THREE.Vector3(hitbox.size.x, hitbox.size.y, hitbox.size.z), hitbox.offsetY ?? hitbox.size.y / 2)
      : createBody(defaultSize, defaultOffsetY)

    const item = { mesh: group, body, name, description, link }
    furnitureItems.push(item)

    gltfLoader.load(
      src,
      (gltf) => {
        group.remove(placeholder)
        const model = gltf.scene
        model.scale.setScalar(scale)

        const bbox = new THREE.Box3().setFromObject(model)
        const size = new THREE.Vector3()
        const center = new THREE.Vector3()
        bbox.getSize(size)
        bbox.getCenter(center)
        model.position.set(-center.x, -bbox.min.y, -center.z)

        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
            const material = child.material
            if (material) {
              const applyProps = (mat) => {
                mat.side = THREE.DoubleSide
                mat.transparent = false
                mat.opacity = 1
                mat.depthWrite = true
                mat.depthTest = true
                mat.needsUpdate = true
              }
              if (Array.isArray(material)) {
                material.forEach(applyProps)
              } else {
                applyProps(material)
              }
            }
          }
        })

        if (!hitbox || !hitbox.size) {
          if (body) {
            world.removeBody(body)
          }

          const actualBody = new CANNON.Body({ mass: 0 })
          actualBody.addShape(new CANNON.Box(new CANNON.Vec3(size.x / 2, size.y / 2, size.z / 2)))
          actualBody.position.set(x, y + size.y / 2, z)
          actualBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), rotationRad)
          world.addBody(actualBody)
          item.body = actualBody
        }

        group.add(model)
      },
      undefined,
      (error) => {
        console.error('Failed to load furniture model:', src, error)
      }
    )
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

    furnitureItems.push({ mesh: coneGroup, body: coneBody, name: '', description: '', link: '' })
  }


  // Bed - replaced by GLB asset
  addFurnitureModel('/models/bed.glb', -8, -1.5, -14.5, 7, 'About Me', 'Consultant in Deloitte’s Engineering, AI & Data team. Providing consulting services in software development, data engineering, analytics, and project management, with hands-on experience in both front-end and back-end development, system analysis, and leading tech projects. Google Cloud Certified Professional Data Engineer.\n\nI am passionate about solving complex problems through data-driven approaches. I am also a marathon enthusiast.', '', -90, { size: { x: 15, y: 2.5, z: 9 }, offsetY: 1.25 })

  // Desk - replaced by GLB asset
  addFurnitureModel('/models/desk.glb', 12.5, -5, -10.5, 7, 'Work Experiences', '1. <a href="https://en.wikipedia.org/wiki/Taeyang" target="_blank" rel="noopener">OMG</a>\n\n2. <a href="https://en.wikipedia.org/wiki/T.O.P" target="_blank" rel="noopener">DAMN</a>\n\n3. <a href="https://en.wikipedia.org/wiki/G-Dragon" target="_blank" rel="noopener">LYCK</a>')

  // Wardrobe - replaced by GLB asset near the right wall beside the desk
  addFurnitureModel('/models/wardrobe.glb', 13, -8, 1, 7, 'McQueen Exhibit', 'Discover Lightning McQueen, the legendary racecar from Radiator Springs.', 'https://en.wikipedia.org/wiki/Cars_(film)', 180)


  // 6 Cones before the ramp (slalom)
  for (let i = 0; i < 8; i++) {
    const row = Math.floor(i / 2)
    const col = i % 2
    addPushableCone(-8 + col * 4, 0.25, 10 + row * 3, 0xffa500, `Cone ${i + 1}`, 'Part of the jump challenge.')
  }

  return {
    furnitureItems
  }
}

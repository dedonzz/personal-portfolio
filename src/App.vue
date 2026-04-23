<template>
  <div id="app">
    <div ref="container" class="canvas-container"></div>
    <div class="ui-overlay">
      <div class="controls-info">
        <p><strong>Desktop:</strong> W/S to accelerate/brake | A/D to steer | SPACE to jump</p>
        <p><strong>Mobile:</strong> Drag to steer and accelerate</p>
      </div>
      <div class="info-panel" :class="{ visible: showInfo }">
        <h2>{{ infoTitle }}</h2>
        <p>{{ infoDescription }}</p>
        <p v-if="infoLink" class="info-link">
          <a :href="infoLink" target="_blank" rel="noopener">Read more on Wikipedia</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default {
  setup() {
    const container = ref(null)
    const showInfo = ref(false)
    const infoTitle = ref('')
    const infoDescription = ref('')
    const infoLink = ref('')
    let scene, camera, renderer
    let car = null
    const furnitureItems = []
    const wallBoxes = []
    
    // Physics
    const gravity = 0.02
    let isJumping = false
    let velocityY = 0
    const jumpForce = 0.3
    
    // Movement
    const keys = {
      w: false,
      a: false,
      s: false,
      d: false,
      space: false
    }
    
    // Mobile touch controls
    let touchStartX = 0
    let touchStartY = 0
    let isDragging = false
    let touchSteer = 0
    let touchAccelerate = 0
    
    const carState = {
      position: new THREE.Vector3(0, 0, 0),
      velocity: new THREE.Vector3(0, 0, 0),
      rotation: 0,
      speed: 0.3,
      acceleration: 0.015,
      friction: 0.92,
      maxSpeed: 0.5,
      angularVelocity: 0,
      angularFriction: 0.85,
      maxAngularVelocity: 0.08
    }

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase()
      if (key === 'w') keys.w = true
      if (key === 'a') keys.a = true
      if (key === 's') keys.s = true
      if (key === 'd') keys.d = true
      if (key === ' ') {
        keys.space = true
        if (!isJumping && car) {
          velocityY = jumpForce
          isJumping = true
        }
      }
    }

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase()
      if (key === 'w') keys.w = false
      if (key === 'a') keys.a = false
      if (key === 's') keys.s = false
      if (key === 'd') keys.d = false
      if (key === ' ') keys.space = false
    }

    // Mobile touch handlers
    const handleTouchStart = (e) => {
      e.preventDefault()
      const touch = e.touches[0]
      touchStartX = touch.clientX
      touchStartY = touch.clientY
      isDragging = true
    }

    const handleTouchMove = (e) => {
      e.preventDefault()
      if (!isDragging) return
      
      const touch = e.touches[0]
      const deltaX = touch.clientX - touchStartX
      const deltaY = touch.clientY - touchStartY
      
      // Convert touch movement to steering and acceleration
      touchSteer = Math.max(-1, Math.min(1, deltaX / 100)) // Steering based on horizontal drag
      touchAccelerate = Math.max(-1, Math.min(1, -deltaY / 100)) // Acceleration based on vertical drag
    }

    const handleTouchEnd = (e) => {
      e.preventDefault()
      isDragging = false
      touchSteer = 0
      touchAccelerate = 0
    }

    const addFurnitureItem = (mesh, name, description, link = '') => {
      const box = new THREE.Box3().setFromObject(mesh)
      furnitureItems.push({ mesh, box, name, description, link })
    }

    const createFurniture = () => {
      const tableMaterial = new THREE.MeshPhongMaterial({ color: 0x8b5a2b, shininess: 20 })
      const tableTop = new THREE.Mesh(new THREE.BoxGeometry(6, 0.4, 3), tableMaterial)
      tableTop.position.set(-10, 0.8, -5)
      tableTop.castShadow = true
      tableTop.receiveShadow = true
      scene.add(tableTop)

      const tableLegGeometry = new THREE.BoxGeometry(0.25, 1.4, 0.25)
      for (const offsetX of [-2.7, 2.7]) {
        for (const offsetZ of [-1.2, 1.2]) {
          const leg = new THREE.Mesh(tableLegGeometry, tableMaterial)
          leg.position.set(-10 + offsetX, 0.1, -5 + offsetZ)
          leg.castShadow = true
          leg.receiveShadow = true
          scene.add(leg)
        }
      }
      addFurnitureItem(tableTop, 'Coffee Table', 'A small table where Lightning McQueen can rest between races.')

      const sofaMaterial = new THREE.MeshPhongMaterial({ color: 0xa0522d, shininess: 10 })
      const sofaSeat = new THREE.Mesh(new THREE.BoxGeometry(5, 1, 2), sofaMaterial)
      sofaSeat.position.set(10, 0.5, -8)
      sofaSeat.castShadow = true
      sofaSeat.receiveShadow = true
      scene.add(sofaSeat)

      const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(5, 1.2, 0.4), sofaMaterial)
      sofaBack.position.set(10, 1.1, -9)
      sofaBack.castShadow = true
      sofaBack.receiveShadow = true
      scene.add(sofaBack)

      addFurnitureItem(sofaSeat, 'Pit Lounge', 'A cozy lounge area for McQueen to recharge and relax.')

      const standMaterial = new THREE.MeshPhongMaterial({ color: 0x333333, shininess: 30 })
      const standBase = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.2, 16), standMaterial)
      standBase.position.set(8, 0.1, 10)
      standBase.castShadow = true
      standBase.receiveShadow = true
      scene.add(standBase)

      const plaque = new THREE.Mesh(new THREE.BoxGeometry(2, 1.2, 0.2), new THREE.MeshPhongMaterial({ color: 0xffd700 }))
      plaque.position.set(8, 0.8, 10)
      plaque.castShadow = true
      plaque.receiveShadow = true
      scene.add(plaque)

      addFurnitureItem(plaque, 'McQueen Exhibit', 'Discover Lightning McQueen, the legendary racecar from Radiator Springs.', 'https://en.wikipedia.org/wiki/Lightning_McQueen')
    }

    const createWallCollider = (mesh) => {
      wallBoxes.push(new THREE.Box3().setFromObject(mesh))
    }

    const updateFurnitureBoxes = () => {
      furnitureItems.forEach((item) => item.box.setFromObject(item.mesh))
    }

    const hideFurnitureInfo = () => {
      showInfo.value = false
      infoTitle.value = ''
      infoDescription.value = ''
      infoLink.value = ''
    }

    const updateCarMovement = () => {
      if (!car) return

      // Handle both keyboard and touch inputs
      let targetAngularVelocity = 0
      let targetVelocity = 0

      // Keyboard input
      if (keys.d) targetAngularVelocity = -carState.maxAngularVelocity
      if (keys.a) targetAngularVelocity = carState.maxAngularVelocity
      
      // Touch input (overrides keyboard if active)
      if (isDragging) {
        targetAngularVelocity = -touchSteer * carState.maxAngularVelocity
        targetVelocity = touchAccelerate * carState.maxSpeed
      } else {
        // Keyboard acceleration
        if (keys.w) targetVelocity = carState.maxSpeed
        if (keys.s) targetVelocity = -carState.maxSpeed * 0.7
      }
      
      carState.angularVelocity = targetAngularVelocity
      carState.rotation += carState.angularVelocity

      // Forward/Backward movement based on car's rotation
      const forwardDirection = new THREE.Vector3(
        -Math.sin(carState.rotation),
        0,
        -Math.cos(carState.rotation)
      )

      // Smooth acceleration
      const currentSpeed = forwardDirection.dot(carState.velocity)
      const acceleration = Math.sign(targetVelocity - currentSpeed) * carState.acceleration
      const newSpeed = currentSpeed + acceleration
      
      // Apply movement in car's forward direction
      if (Math.abs(newSpeed) > 0.01 || (keys.w || keys.s || isDragging)) {
        const boundedSpeed = Math.max(-carState.maxSpeed * 0.7, Math.min(carState.maxSpeed, newSpeed))
        carState.velocity.copy(forwardDirection.multiplyScalar(boundedSpeed))
      }

      // Apply friction when no input
      if (!keys.w && !keys.s && !isDragging) {
        carState.velocity.multiplyScalar(carState.friction)
      }

      // Apply velocity to position
      const proposedPosition = carState.position.clone().add(carState.velocity)
      const carBox = new THREE.Box3().setFromCenterAndSize(
        proposedPosition.clone().setY(carState.position.y + 0.6),
        new THREE.Vector3(1.8, 1.2, 3)
      )

      let collidedWithFurniture = false
      let collidedWithWall = false
      let nearestFurniture = null
      let nearestDistance = Infinity
      let landedOnFurniture = false
      let landedHeight = 0

      for (const furniture of furnitureItems) {
        const distance = furniture.mesh.position.distanceTo(proposedPosition)
        if (distance < nearestDistance) {
          nearestDistance = distance
          nearestFurniture = furniture
        }

        const furnitureTop = furniture.box.max.y
        const allowFlyover = carState.position.y > furnitureTop + 0.2
        if (!allowFlyover && carBox.intersectsBox(furniture.box)) {
          collidedWithFurniture = true
        }

        if (carState.velocity.y < 0 && carState.position.y > furnitureTop) {
          const horizontalBox = new THREE.Box3().setFromCenterAndSize(
            proposedPosition.clone().setY(0.25),
            new THREE.Vector3(1.8, 0.5, 3)
          )
          if (horizontalBox.intersectsBox(furniture.box) && proposedPosition.y <= furnitureTop + 0.05) {
            landedOnFurniture = true
            landedHeight = furnitureTop
          }
        }
      }

      for (const wallBox of wallBoxes) {
        if (carBox.intersectsBox(wallBox)) {
          collidedWithWall = true
          break
        }
      }

      if (nearestFurniture && nearestDistance <= 4) {
        showInfo.value = true
        infoTitle.value = nearestFurniture.name
        infoDescription.value = nearestFurniture.description
        infoLink.value = nearestFurniture.link
      } else {
        hideFurnitureInfo()
      }

      if (collidedWithFurniture) {
        carState.velocity.set(0, 0, 0)
      } else if (!collidedWithWall) {
        carState.position.copy(proposedPosition)
      } else {
        carState.velocity.multiplyScalar(-0.25)
      }

      if (landedOnFurniture) {
        carState.position.y = landedHeight
        velocityY = 0
        isJumping = false
      }

      // Gravity and jumping
      velocityY -= gravity
      carState.position.y += velocityY

      // Ground collision
      if (carState.position.y <= 0) {
        carState.position.y = 0
        velocityY = 0
        isJumping = false
      }

      // Update car position and rotation
      car.position.copy(carState.position)
      car.rotation.y = carState.rotation
    }

    const updateCamera = () => {
      const cameraOffset = new THREE.Vector3(0, 8, 12)
      cameraOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), carState.rotation)
      camera.position.lerp(carState.position.clone().add(cameraOffset), 0.05)
      camera.lookAt(carState.position.x, carState.position.y + 1, carState.position.z)
    }

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    onMounted(() => {
      // Scene
      scene = new THREE.Scene()
      scene.background = new THREE.Color(0x000000)
      scene.fog = new THREE.Fog(0x000000, 100, 500)

      // Camera
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.set(0, 8, 12)
      camera.lookAt(0, 1, 0)

      // Renderer - fullscreen
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      container.value.appendChild(renderer.domElement)

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
      const groundGeometry = new THREE.PlaneGeometry(50, 50)
      const groundMaterial = new THREE.MeshLambertMaterial({ color: 0xd2b48c })
      const ground = new THREE.Mesh(groundGeometry, groundMaterial)
      ground.rotation.x = -Math.PI / 2
      ground.receiveShadow = true
      scene.add(ground)

      const gridHelper = new THREE.GridHelper(50, 20, 0xffffff, 0xffffff)
      gridHelper.material.opacity = 0.2
      gridHelper.material.transparent = true
      scene.add(gridHelper)

      // Room walls - enclosed room
      const wallHeight = 20
      const roomSize = 50
      const wallThickness = 0.1
      const wallMaterial = new THREE.MeshPhongMaterial({ color: 0xd4a574 })

      // Back wall
      const backWallGeometry = new THREE.BoxGeometry(roomSize, wallHeight, wallThickness)
      const backWall = new THREE.Mesh(backWallGeometry, wallMaterial)
      backWall.position.set(0, wallHeight / 2, -roomSize / 2)
      backWall.receiveShadow = true
      scene.add(backWall)
      createWallCollider(backWall)

      // Front wall
      const frontWall = new THREE.Mesh(backWallGeometry, wallMaterial)
      frontWall.position.set(0, wallHeight / 2, roomSize / 2)
      frontWall.receiveShadow = true
      scene.add(frontWall)
      createWallCollider(frontWall)

      // Left wall
      const sideWallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, roomSize)
      const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial)
      leftWall.position.set(-roomSize / 2, wallHeight / 2, 0)
      leftWall.receiveShadow = true
      scene.add(leftWall)
      createWallCollider(leftWall)

      // Right wall
      const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial)
      rightWall.position.set(roomSize / 2, wallHeight / 2, 0)
      rightWall.receiveShadow = true
      scene.add(rightWall)
      createWallCollider(rightWall)

      // Ceiling
      const ceilingGeometry = new THREE.PlaneGeometry(roomSize, roomSize)
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

      // Create car group root for proper model alignment
      car = new THREE.Group()
      const placeholderGeometry = new THREE.BoxGeometry(1.5, 1, 2.5)
      const placeholderMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 })
      const placeholder = new THREE.Mesh(placeholderGeometry, placeholderMaterial)
      placeholder.position.set(0, 0.5, 0)
      placeholder.castShadow = true
      placeholder.receiveShadow = true
      car.add(placeholder)
      car.position.copy(carState.position)
      car.castShadow = true
      scene.add(car)

      createFurniture()
      updateFurnitureBoxes()

      // Load Lightning McQueen model
      loadModel()

      // Event listeners
      window.addEventListener('keydown', handleKeyDown)
      window.addEventListener('keyup', handleKeyUp)
      window.addEventListener('resize', onWindowResize)
      
      // Mobile touch events
      window.addEventListener('touchstart', handleTouchStart, { passive: false })
      window.addEventListener('touchmove', handleTouchMove, { passive: false })
      window.addEventListener('touchend', handleTouchEnd, { passive: false })

      // Animate
      const animate = () => {
        requestAnimationFrame(animate)
        updateCarMovement()
        updateCamera()
        renderer.render(scene, camera)
      }
      animate()
    })

    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('resize', onWindowResize)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    })

    const loadModel = () => {
      const loader = new GLTFLoader()
      loader.load(
        '/models/lighting_mcqueen.glb',
        (gltf) => {
          // Remove placeholder car visuals from the car group
          if (car && car.type === 'Group') {
            while (car.children.length > 0) {
              car.remove(car.children[0])
            }
          } else if (car) {
            scene.remove(car)
          }

          // Create a wrapper group for the loaded model
          const loadedCar = new THREE.Group()
          const model = gltf.scene
          model.scale.setScalar(0.5)
          model.rotation.y = Math.PI // Flip the model front/back

          const box = new THREE.Box3().setFromObject(model)
          const center = new THREE.Vector3()
          box.getCenter(center)
          model.position.x -= center.x
          model.position.z -= center.z
          model.position.y -= box.min.y

          loadedCar.add(model)
          loadedCar.position.copy(carState.position)
          loadedCar.rotation.y = carState.rotation
          loadedCar.traverse((node) => {
            if (node.isMesh) {
              node.castShadow = true
              node.receiveShadow = true
            }
          })

          car = loadedCar
          scene.add(car)
        },
        (progress) => {
          console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%')
        },
        (error) => {
          console.error('Error loading Lightning McQueen model:', error)
        }
      )
    }

    return {
      container,
      showInfo,
      infoTitle,
      infoDescription
    }
  }
}
</script>

<style scoped>
#app {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.canvas-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.ui-overlay {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 100;
  pointer-events: none;
}

.controls-info {
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 15px;
  border-radius: 8px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  max-width: 300px;
  margin-bottom: 16px;
}

.info-panel {
  width: 320px;
  max-width: 90vw;
  background-color: rgba(255, 255, 255, 0.95);
  color: #111;
  padding: 18px;
  border-radius: 12px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.25);
  transform: translateX(20px);
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
}

.info-panel.visible {
  opacity: 1;
  transform: translateX(0);
}

.info-panel h2 {
  margin: 0 0 10px 0;
  font-size: 18px;
}

.info-panel p {
  margin: 0;
  line-height: 1.5;
}

.controls-info p {
  margin: 0 0 8px 0;
  font-weight: bold;
}

@media (max-width: 768px) {
  .controls-info {
    font-size: 12px;
    padding: 10px;
    max-width: 250px;
  }

  .info-panel {
    width: 280px;
    padding: 14px;
  }
}
</style>
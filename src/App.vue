<template>
  <div id="app">
    <div ref="container" class="canvas-container"></div>
    <div class="ui-overlay">
      <div class="controls-info">
        <p><strong>Controls:</strong> W/↑ Gas | Space Brake | A/← Left | D/→ Right | R Reset</p>
        <p><strong>Camera Mode:</strong> 2.5D Fixed Angle</p>
        <p v-if="loading">Loading assets...</p>
      </div>
      <div class="vehicle-stats">
        <p>Speed: <span class="stat-value">{{ (vehicleSpeed * 3.6).toFixed(1) }}</span> km/h</p>
        <p>Steer: <span class="stat-value">{{ vehicleSteer.toFixed(2) }}</span></p>
      </div>
      <div class="info-panel" :class="{ visible: showInfo }">
        <h2><a v-if="infoLink" :href="infoLink" target="_blank" rel="noopener">{{ infoTitle }}</a><span v-else>{{ infoTitle }}</span></h2>
        <p v-html="infoDescription"></p>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { createRoom } from './config/room.js'
import { createFurniture } from './config/furniture.js'
import { Vehicle } from './config/vehicle.js'

export default {
  setup() {
    const container = ref(null)
    const showInfo = ref(false)
    const loading = ref(true)
    const infoTitle = ref('')
    const infoDescription = ref('')
    const infoLink = ref('')
    const vehicleSpeed = ref(0)
    const vehicleSteer = ref(0)
    
    let scene, camera, renderer, world, controls
    let vehicle = null
    let furnitureItems = []
    let roomData = null
    
    const keys = { w: false, a: false, s: false, d: false, r: false, space: false }

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase()
      if (key === 'w' || key === 'arrowup') keys.w = true
      if (key === 'a' || key === 'arrowleft') keys.a = true
      if (key === 's' || key === 'arrowdown') keys.s = true
      if (key === 'd' || key === 'arrowright') keys.d = true
      if (key === 'r') keys.r = true
      if (key === ' ' || key === 'spacebar') keys.space = true
    }

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase()
      if (key === 'w' || key === 'arrowup') keys.w = false
      if (key === 'a' || key === 'arrowleft') keys.a = false
      if (key === 's' || key === 'arrowdown') keys.s = false
      if (key === 'd' || key === 'arrowright') keys.d = false
      if (key === 'r') keys.r = false
      if (key === ' ' || key === 'spacebar') keys.space = false
    }

    const updateFurnitureInfo = (vehiclePos) => {
      let nearestFurniture = null
      let nearestDistance = Infinity
      
      for (const item of furnitureItems) {
        // Calculate distance from the nearest point on the furniture box to the vehicle
        const box = new THREE.Box3().setFromObject(item.mesh)
        const distance = box.distanceToPoint(vehiclePos)
        
        if (distance < nearestDistance) {
          nearestDistance = distance
          nearestFurniture = item
        }
      }
      
      if (nearestFurniture && nearestDistance <= 2 && (nearestFurniture.name || nearestFurniture.description)) { // 2 units = 20cm from the edge
        showInfo.value = true
        infoTitle.value = nearestFurniture.name
        infoDescription.value = nearestFurniture.description
        infoLink.value = nearestFurniture.link
      } else {
        showInfo.value = false
      }
    }

    const raycaster = new THREE.Raycaster()
    const occludedFurniture = new Set()
    const occlusionOpacity = 0.4

    const setFurnitureOpacity = (object, opacity) => {
      object.traverse((child) => {
        if (child.isMesh && child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material]
          materials.forEach((material) => {
            material.transparent = opacity < 1
            material.opacity = opacity
            material.needsUpdate = true
          })
        }
      })
    }

    const updateFurnitureOcclusion = () => {
      if (!vehicle || !camera) return
      const rayDirection = vehicle.position.clone().sub(camera.position)
      const cameraDistance = rayDirection.length()
      if (cameraDistance === 0) return

      raycaster.set(camera.position, rayDirection.normalize())
      const newlyOccluded = new Set()

      furnitureItems.forEach((item) => {
        const intersections = raycaster.intersectObject(item.mesh, true)
        if (intersections.length > 0 && intersections[0].distance < cameraDistance - 0.1) {
          newlyOccluded.add(item)
        }
      })

      occludedFurniture.forEach((item) => {
        if (!newlyOccluded.has(item)) {
          setFurnitureOpacity(item.mesh, 1)
          occludedFurniture.delete(item)
        }
      })

      newlyOccluded.forEach((item) => {
        if (!occludedFurniture.has(item)) {
          setFurnitureOpacity(item.mesh, occlusionOpacity)
          occludedFurniture.add(item)
        }
      })
    }

    const updateCamera = () => {
      if (vehicle && vehicle.position) {
        // 2.5D Isometric Style Offset
        const cameraOffset = new THREE.Vector3(14, 12, 14)
        const desiredPosition = vehicle.position.clone().add(cameraOffset)

        camera.position.lerp(desiredPosition, 0.12)
        camera.lookAt(vehicle.position)

        // Keep OrbitControls target in sync in case controls logic is updated
        controls.target.copy(vehicle.position)

        updateFurnitureOcclusion()

        if (roomData && vehicle) {
          const carX = vehicle.position.x
          const carZ = vehicle.position.z
          const camX = camera.position.x
          const camZ = camera.position.z

          const isBetween = (a, b, target) => (a - target) * (b - target) <= 0

          roomData.backWall.visible = !isBetween(camZ, carZ, -22.5)
          roomData.leftWall.visible = !isBetween(camX, carX, -15)
          roomData.rectRightWall.visible = !isBetween(camX, carX, 15)
          roomData.sqRightWall.visible = !isBetween(camX, carX, 5)
          roomData.rectFrontWall.visible = !isBetween(camZ, carZ, 22.5)
          roomData.sqFrontWall.visible = !isBetween(camZ, carZ, 42.5)
        }
      }
    }

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    onMounted(async () => {
      // Scene
      scene = new THREE.Scene()
      scene.background = new THREE.Color(0x1a1a1a)
      scene.fog = new THREE.Fog(0x1a1a1a, 60, 200)

      // Physics World
      world = new CANNON.World()
      world.gravity.set(0, -9.82, 0)
      world.broadphase = new CANNON.SAPBroadphase(world)

      // Camera
      camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.set(20, 20, 20)

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      container.value.appendChild(renderer.domElement)
      
      // Controls
      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.target.set(0, 0, 0)
      controls.enabled = false // Disable by default for "Fixed 2.5D" experience

      // Create room and furniture with physics
      roomData = createRoom(scene, world)
      const furnitureData = createFurniture(scene, world)
      furnitureItems = furnitureData.furnitureItems

      // Create vehicle
      vehicle = new Vehicle(scene, world)
      await vehicle.init()
      loading.value = false

      // Event listeners
      window.addEventListener('keydown', handleKeyDown)
      window.addEventListener('keyup', handleKeyUp)
      window.addEventListener('resize', onWindowResize)
      
      // Animation loop
      const timeStep = 1 / 60
      let lastTime = performance.now()

      const animate = () => {
        requestAnimationFrame(animate)
        const currentTime = performance.now()
        const deltaTime = (currentTime - lastTime) / 1000
        lastTime = currentTime

        world.step(timeStep, deltaTime)
        
        if (vehicle) {
          vehicle.updateControls(keys)
          vehicleSpeed.value = vehicle.speed
          vehicleSteer.value = vehicle.steeringAngle
          updateFurnitureInfo(vehicle.position)
          updateCamera()
        }

        furnitureItems.forEach((item) => {
          if (item.body) {
            item.mesh.position.copy(item.body.position)
            item.mesh.quaternion.copy(item.body.quaternion)
          }
        })

        controls.update()
        renderer.render(scene, camera)
      }
      animate()
    })

    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('resize', onWindowResize)
    })

    return {
      container,
      showInfo,
      loading,
      infoTitle,
      infoDescription,
      infoLink,
      vehicleSpeed,
      vehicleSteer
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
  font-family: 'Poppins', sans-serif;
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
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  max-width: 350px;
  margin-bottom: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.controls-info p {
  margin: 0 0 8px 0;
}

.vehicle-stats {
  background-color: rgba(0, 0, 0, 0.7);
  color: #00ffcc;
  padding: 12px;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  max-width: 200px;
  margin-bottom: 10px;
  border: 1px solid #00ffcc;
  backdrop-filter: blur(10px);
}

.stat-value {
  color: #ffffff;
  font-weight: bold;
}

.info-panel {
  width: 320px;
  max-width: 90vw;
  background-color: rgba(255, 255, 255, 0.9);
  color: #111;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.3);
  transform: translateX(-20px);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  pointer-events: auto;
  backdrop-filter: blur(10px);
}

.info-panel.visible {
  opacity: 1;
  transform: translateX(0);
}

.info-panel p {
  white-space: pre-wrap;
  line-height: 1.5;
  margin: 10px 0 0 0;
  font-size: 15px;
}

.info-panel p a {
  color: #0077ff;
  text-decoration: underline;
  pointer-events: auto;
  font-weight: bold;
}

.info-panel p a:hover {
  color: #0055cc;
}
</style>
<template>
  <div id="app">
    <div ref="container" class="canvas-container"></div>
    <div class="ui-overlay">
      <div class="controls-info">
        <p><strong>Controls:</strong> W/↑ Gas | S/↓ Brake | A/← Left | D/→ Right | R Reset</p>
        <p><strong>Vehicle Physics Engine:</strong> RV-Engine Based</p>
      </div>
      <div class="vehicle-stats">
        <p>Speed: <span class="stat-value">{{ vehicleSpeed.toFixed(2) }}</span> m/s</p>
        <p>Steer: <span class="stat-value">{{ vehicleSteer.toFixed(2) }}</span></p>
      </div>
      <div class="info-panel" :class="{ visible: showInfo }">
        <h2><a v-if="infoLink" :href="infoLink" target="_blank" rel="noopener">{{ infoTitle }}</a><span v-else>{{ infoTitle }}</span></h2>
        <p>{{ infoDescription }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { createRoom } from './config/room.js'
import { createFurniture } from './config/furniture.js'
import { vehicleConfig, createVehicleState, updateVehiclePhysics, createVehicleMesh } from './config/vehicle.js'

export default {
  setup() {
    const container = ref(null)
    const showInfo = ref(false)
    const infoTitle = ref('')
    const infoDescription = ref('')
    const infoLink = ref('')
    const vehicleSpeed = ref(0)
    const vehicleSteer = ref(0)
    
    let scene, camera, renderer
    let vehicleState = null
    let vehicleMesh = null
    let wheels = []
    let furnitureData = null
    let roomData = null
    let furnitureItems = []
    let wallBoxes = []
    let backWall = null
    let frontWall = null
    let leftWall = null
    let rightWall = null
    
    // Input handling
    const keys = {
      w: false,
      a: false,
      s: false,
      d: false,
      r: false
    }

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase()
      if (key === 'w' || key === 'arrowup') keys.w = true
      if (key === 'a' || key === 'arrowleft') keys.a = true
      if (key === 's' || key === 'arrowdown') keys.s = true
      if (key === 'd' || key === 'arrowright') keys.d = true
      if (key === 'r') keys.r = true
    }

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase()
      if (key === 'w' || key === 'arrowup') keys.w = false
      if (key === 'a' || key === 'arrowleft') keys.a = false
      if (key === 's' || key === 'arrowdown') keys.s = false
      if (key === 'd' || key === 'arrowright') keys.d = false
      if (key === 'r') keys.r = false
    }

    const hideFurnitureInfo = () => {
      showInfo.value = false
      infoTitle.value = ''
      infoDescription.value = ''
      infoLink.value = ''
    }

    const updateFurnitureInfo = (vehiclePos) => {
      let nearestFurniture = null
      let nearestDistance = Infinity

      for (const furniture of furnitureItems) {
        const distance = furniture.mesh.position.distanceTo(vehiclePos)
        if (distance < nearestDistance) {
          nearestDistance = distance
          nearestFurniture = furniture
        }
      }

      if (nearestFurniture && nearestDistance <= 8) {
        showInfo.value = true
        infoTitle.value = nearestFurniture.name
        infoDescription.value = nearestFurniture.description
        infoLink.value = nearestFurniture.link
      } else {
        hideFurnitureInfo()
      }
    }

    const updateVehicle = () => {
      if (!vehicleState) return

      // Gather input
      vehicleState.throttle = keys.w ? 1 : 0
      vehicleState.brake = keys.s ? 1 : 0
      
      // Steering with smooth response
      let steeringInput = 0
      if (keys.a) steeringInput = 1
      if (keys.d) steeringInput = -1
      
      vehicleState.steering = steeringInput

      // Reset position
      if (keys.r) {
        vehicleState.position.set(0, 0.35, 0)
        vehicleState.velocity.set(0, 0, 0)
        vehicleState.rotation = 0
        vehicleState.angularVelocity = 0
        vehicleState.throttle = 0
        vehicleState.brake = 0
        vehicleState.steering = 0
      }

      // Update physics
      updateVehiclePhysics(vehicleState, 0.016, vehicleConfig)

      // Update vehicle mesh
      if (vehicleMesh && vehicleMesh.mesh) {
        vehicleMesh.mesh.position.copy(vehicleState.position)
        vehicleMesh.mesh.rotation.y = vehicleState.rotation
        
        // Update wheel rotations
        wheels.forEach((wheel, index) => {
          if (wheel.group) {
            // Steer front wheels
            if (wheel.isFront) {
              wheel.group.rotation.y = vehicleState.steeringAngle
            }
            
            // Rotate tires
            if (wheel.group.children[0]) {
              wheel.rotationX += vehicleState.wheelRotation[index]
              wheel.group.children[0].rotation.x = wheel.rotationX
            }
          }
        })
      }

      // Update stats
      vehicleSpeed.value = vehicleState.speed
      vehicleSteer.value = vehicleState.steeringAngle

      // Update furniture info
      updateFurnitureInfo(vehicleState.position)

      // Collision with furniture (simplified)
      for (const furniture of furnitureItems) {
        const distance = vehicleState.position.distanceTo(furniture.mesh.position)
        if (distance < 2) {
          // Bounce back
          const direction = vehicleState.position.clone().sub(furniture.mesh.position).normalize()
          vehicleState.velocity.copy(direction.multiplyScalar(5))
        }
      }

      // Boundary check
      if (Math.abs(vehicleState.position.x) > 15) {
        vehicleState.position.x = vehicleState.position.x > 0 ? 14.8 : -14.8
        vehicleState.velocity.x *= -0.5
      }
      if (Math.abs(vehicleState.position.z) > 15) {
        vehicleState.position.z = vehicleState.position.z > 0 ? 14.8 : -14.8
        vehicleState.velocity.z *= -0.5
      }
    }

    const updateCamera = () => {
      if (vehicleState) {
        // Third-person camera following vehicle
        const cameraDistance = 8
        const cameraHeight = 6
        const cameraOffset = new THREE.Vector3(
          Math.sin(vehicleState.rotation) * cameraDistance,
          cameraHeight,
          Math.cos(vehicleState.rotation) * cameraDistance
        )
        
        const targetCameraPos = vehicleState.position.clone().add(cameraOffset)
        camera.position.lerp(targetCameraPos, 0.1)
        camera.lookAt(vehicleState.position.x, vehicleState.position.y + 1, vehicleState.position.z)
        
        // Hide walls based on camera position
        backWall.visible = camera.position.z >= -15
        frontWall.visible = camera.position.z <= 15
        leftWall.visible = camera.position.x >= -15
        rightWall.visible = camera.position.x <= 15
      }
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

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      container.value.appendChild(renderer.domElement)

      // Create room
      roomData = createRoom(scene)
      wallBoxes = roomData.wallBoxes
      backWall = roomData.backWall
      frontWall = roomData.frontWall
      leftWall = roomData.leftWall
      rightWall = roomData.rightWall

      // Create furniture
      furnitureData = createFurniture(scene)
      furnitureItems = furnitureData.furnitureItems
      furnitureData.updateFurnitureBoxes()

      // Create vehicle
      vehicleState = createVehicleState()
      const vehicleData = createVehicleMesh(scene, vehicleState, vehicleConfig)
      vehicleMesh = vehicleData
      wheels = vehicleData.wheels

      // Event listeners
      window.addEventListener('keydown', handleKeyDown)
      window.addEventListener('keyup', handleKeyUp)
      window.addEventListener('resize', onWindowResize)

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate)
        updateVehicle()
        updateCamera()
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
      infoTitle,
      infoDescription,
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
  max-width: 350px;
  margin-bottom: 10px;
}

.controls-info p {
  margin: 0 0 8px 0;
  font-weight: bold;
}

.vehicle-stats {
  background-color: rgba(0, 0, 0, 0.7);
  color: #00ff00;
  padding: 12px;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  max-width: 200px;
  margin-bottom: 10px;
  border: 1px solid #00ff00;
}

.vehicle-stats p {
  margin: 0 0 4px 0;
}

.stat-value {
  color: #ffff00;
  font-weight: bold;
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

.info-panel h2 a {
  color: #0066cc;
  text-decoration: none;
  cursor: pointer;
}

.info-panel h2 a:hover {
  text-decoration: underline;
}

.info-panel p {
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .controls-info {
    font-size: 12px;
    padding: 10px;
    max-width: 280px;
  }

  .vehicle-stats {
    font-size: 11px;
    padding: 8px;
  }

  .info-panel {
    width: 280px;
    padding: 14px;
  }
}
</style>